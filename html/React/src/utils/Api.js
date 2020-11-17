export default class Api {

  isBusy = false;
  errorCallBack;
  queue = [];
  webSocket = new WebSocket(
     "ws://"
    + window.config.webSocket.host
    + ":"
    + window.config.webSocket.port
    + "/"
  )

  constructor(messageReceive, errorCallBack) {
    this.messageReceive = messageReceive;
    this.errorCallBack = errorCallBack;
    this.apiUrl = window.config.apiUrl;
    this.webSocket.onmessage = this.receive
  }

  receive = (data, a, b) => {
    console.log('websocket.receive: ', data, a, b)
    this.messageReceive(data);
  }

  processQueue() {
    if (this.queue.length) {
      let next = this.queue.pop();
      this.getData(next.message, next.callBack, next.priority);
    }
  }

  /**
   * @param {string} message
   * @param {funciton} callBack
   * @param {int} priority - 0 it is discarded, 1 it is placed at back of queue
   */
  getData = (message, callBack, priority = 0) => {
    if (this.isBusy) {
      if (priority) {
        this.queue.push({message: message, callBack: callBack, priority});
      }
      return;
    }

    this.isBusy = true;
    let request = fetch(
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
  };
}