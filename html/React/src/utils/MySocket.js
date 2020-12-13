export default class MySocket {

  _websocket = null
  receiveCallback

  constructor(receiveCallback) {
    this.receiveCallback = receiveCallback
    this.getSocket().then((socket) => {
      console.log('got socket', socket);
    })
      .catch(() => console.log('error socket', this._websocket))
    console.log('can you see this', this._websocket);
  }

  getSocket() {
    return new Promise((resolve, reject) => {
      if (this._websocket !== null) {
        resolve(this._websocket)
      } else {
        try {
          this.buildSocket();
          resolve(this._websocket);
        } catch (e) {
          console.warn('websocekt failed', e);
          this._websocket = null;
          reject(e)
        }
      }
    })
  }

  buildSocket() {
    console.log('build socket');
    let _this = this;
    this._websocket = new WebSocket(
      "ws://"
      + window.config.webSocket.host
      + ":"
      + window.config.webSocket.port
      + "/"
    )

    this._websocket.onOpen = function () {
      console.log('websocket Opened, this', this)
    };

    this._websocket.onClose = function () {
      // todo this doesn't work
      _this._websocket = null;
      console.log('websocket closed, this', this)
    }

    this._websocket.onmessage = this.receiveCallback
  }

}