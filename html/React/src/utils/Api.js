import MySocket from "./MySocket.js"
import App from "../components/App.js"

export default class Api {

  isBusy = false;
  errorCallBack;
  queue = [];
  websocket = null;
  messageHandlers = {}

  /**
   * @param {object} messageHandlers - message handling callbacks
   * @param errorCallBack
   */
  constructor(messageHandlers, errorCallBack) {

    this.messageHandlers = messageHandlers;
    this.errorCallBack = errorCallBack;
    this.apiUrl = window.config.apiUrl;
    this.websocket = new MySocket(this.receive)

  }

  send(request) {
    this.websocket.getSocket()
      .then((socket) => {
        socket.send(JSON.stringify({
          type : 'arduinoRequest',
          payload: request
        }));
      })
      .catch((e) => {
        console.warn('send error:  ', e)
      })
  }

  receive = (event) => {
    console.log('websocket.receive: ', event)
    let data = JSON.parse(event.data);

    console.log('data: ', data);
    console.log(this);

    // todo probably just send data back to App.js who sends it blind to the users
    try {
      if (this.messageHandlers.hasOwnProperty(data.type)) {
        this.messageHandlers[data.type](data.payload);
      } else {
        this.errorCallBack(App.alertTypes.INFO, ['unrecognised message type', data.type, data.payload])
      }
    } catch (e) {
      console.warn('message type error');
      console.warn(e);
      this.errorCallBack(App.alertTypes.ERROR, ['message type error', e])
    }
  }

  statusReport() {
    console.warn('status report function needs to replace this')
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