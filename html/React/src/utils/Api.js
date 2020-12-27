import MySocket from "./MySocket.js"
import App from "../components/App.js"

// i don't know where else to put this
const recognisedTypes = [
  'raw', 'status', 'lights', 'time', 'users', 'request'
]

export default class Api {

  isBusy = false;
  errorCallBack;
  queue = [];
  websocket = null;

  /**
   * {type: callback}
   * callback takes one parameter
   * @type {{}}
   */
  messageHandlers = {}


  /**
   * @param errorCallBack
   */
  constructor(errorCallBack) {

    this.errorHandler = errorCallBack;
    this.apiUrl = window.config.apiUrl;
    this.websocket = new MySocket(this.receive)
    this.addHandler('watchdogConfirm', function() {})
  }

  send(request) {
    this.sentHandler(request);
    this.websocket.send(request);
  }

  receive = (event) => {
    let data = JSON.parse(event.data);
    console.log('recieved data: ', data)
    let errors = false;

    if (data.type === undefined) {
      errors = true;
      console.warn('message had no type', data)
      //this.errorHandler(App.alertTypes.ERROR, 'message had no type')
      return;
    }

    if (data.payload === undefined) {
      errors = true;
      console.log('message had no payload', data)
      //this.errorHandler(App.alertTypes.ERROR, 'message had no payload')
    }

    if (data.err !== undefined) {
      errors = true;
      console.log('error recieved', data, data.err)
      //this.errorHandler(App.alertTypes.ERROR, data.err)
    }

    if (!errors) {
      this.messageHandler(data.type, data.payload);
    }
  }

  addSentHandler(callBack) {
    this.sentHandler = callBack;
  }

  sentHandler(request) {
    console.log('sent request: ', request)
  }

  messageHandler(type, data) {
    if (this.messageHandlers[type]) {
      this.messageHandlers[type](data);
    } else {
      this.defaultHandler(type, data)
    }
  }

  addHandler(type, handler) {
    this.messageHandlers[type] = handler;
  }

  addDefaultHandler(handler) {
    this.defaultHandler = handler;
  }

  defaultHandler(type, message) {
    console.warn('you should provide a proper handler for this')
    console.log('type "' + type + '" not recognised');
    console.log('payload', message)
  }

  errorHandler(data) {
    console.warn('you should provide a proper handler for this')
    console.log('error with data', data)
  }

  processQueue() {
    if (this.queue.length) {
      let next = this.queue.pop();
      this.getData(next.message, next.callBack, next.priority);
    }
  }

  /**
   * @param {string} message
   * @param {function} callBack
   * @param {int} priority - 0 it is discarded, 1 it is placed at back of queue
   */
  getData = (message, callBack, priority = 0) => {
    return
    if (this.isBusy) {
      if (priority) {
        this.queue.push({message: message, callBack: callBack, priority});
      }
      return;
    }

    try {
      this.isBusy = true;
      fetch(
        this.apiUrl + '?message=' + encodeURI(message),
        {
          method: 'GET',
        })
        .then((res) => {
          return res.text();
        })
        .then(
          (result) => {
            this.isBusy = false;
            this.processQueue();
            let json;
            try {
              json = JSON.parse(result);
              callBack('success', json);
            } catch (err) {
              console.log(callBack);
              console.warn(err);
              console.warn(result);
              this.errorCallBack('error', [err.toString(), result]);
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.isBusy = false;
            this.processQueue();
            console.warn(error);
            this.errorCallBack('error', [error]);
          });
    } catch (e) {
      console.warn('http request failed, e', e);
    }
  };
}