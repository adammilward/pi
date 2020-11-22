export default class Api {

  isBusy = false;
  errorCallBack;
  queue = [];
  _websocket = null;


  constructor(messageReceive, errorCallBack) {
    this.messageReceive = messageReceive;
    this.errorCallBack = errorCallBack;
    this.apiUrl = window.config.apiUrl;
    this.websocket();

  }

  receive = (event, a, b) => {
    console.log('websocket.receive: ', event, a, b)
    let data = event.data;
    console.log('data', data);

    switch (data.type) {
      case 'response':
        this.requests[data.requestId].resolve(data);
        break;
      case 'statusReport':
        this.statusReport(data);
        break;
    }
  }

  statusReport() {
    console.warn('status report function needs to replace this')
  }

  websocket() {
    if (this._websocket && this._websocket.hasOwnProperty('onmessage')) {
      return this._websocket
    }
    try {
      this._websocket =  new WebSocket(
        "ws://"
        + window.config.webSocket.host
        + ":"
        + window.config.webSocket.port
        + "/"
      )

      this._websocket.onOpen = function () {
        console.log('websocket Opend, this', this)
      };

      this._websocket.onClose = function () {
        console.log('websocket closed, this', this)
      }

      console.log(this._websocket);
      this._websocket.onmessage = this.receive
      return this._websocket;
    } catch (e) {
      console.warn('websocekt failed', e);
      this._websocket = null;
    }
    return this._websocket;
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