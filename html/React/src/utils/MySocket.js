export default class MySocket {

  _websocket = null
  receiveCallback
  aliveTimeout
  watchdogCount = 0

  constructor(receiveCallback) {
    this.receiveCallback = receiveCallback
    this.getSocket().then((socket) => {
      console.log('got socket', socket);
    })
      .catch(() => console.log('error socket', this._websocket))
    console.log('can you see this', this._websocket);

    console.log('setAliveInterval');
    clearInterval(window.aliveInterval) // was being called twice some how
    window.aliveInterval = setInterval(this.watchdog, 1000)
  }

  getSocket() {
    console.log(1)
    return new Promise((resolve, reject) => {
      console.log(2)
      if (this._websocket !== null) {
        console.log(3)
        resolve(this._websocket)
      } else {
        console.log(4)
        try {
          console.log(5)
          this.buildSocket();
          resolve(this._websocket);
        } catch (e) {
          console.log(6)
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

    this._websocket.onmessage = this.onmessage
  }

  onmessage = (message) => {
    this.watchdogCount = 0
    this.receiveCallback(message)
  }

  watchdog = () => {
    console.log('watchdog', this.watchdogCount)

    if (this.watchdogCount > 5) {
      console.log('destroy watchodog')
      this._websocket = null
      this.send('watchdogCheck', 'watchdogCheck')
    } else if (this.watchdogCount > 4) {
      this.send('watchdogCheck', 'watchdogCheck')
    }

    this.watchdogCount ++
  }

  send(request, type = 'arduinoRequest') {
    console.log('send,', request)
    this.getSocket()
      .then((socket) => {
        console.log('a');
        socket.send(JSON.stringify({
          type : type,
          payload: request
        }));
        console.log('b');
      })
      .catch((e) => {
        console.warn('send error:  ', e)
      })
    console.log('c');
  }

  close() {
    this.getSocket().then((socket) => socket.close())
  }
}