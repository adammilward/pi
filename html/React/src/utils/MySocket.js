export default class MySocket {

  _websocket = null
  receiveCallback
  aliveTimeout

  // start assuming the websocket is dead
  watchdogCount = 7

  constructor(receiveCallback) {
    this.receiveCallback = receiveCallback
    this.getSocket().then((socket) => {
      console.log('got socket', socket);
    })
      .catch(() => console.log('error socket', this._websocket))

    clearInterval(window.aliveInterval) // was being called twice some how
    window.aliveInterval = setInterval(this.watchdog, 1000)
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
    if (this.watchdogCount > 7) {
      console.log('sending websocket server start request')
      fetch(
        window.config.apiUrl + '/webSocket/startSocket.php',
        {
          method: 'GET',
        })
        .then((response) => {
          console.log('websocket start response: ', response);
        })
    }

    if (this.watchdogCount > 5) {
      console.log('destroying websocket')
      this._websocket = null
      this.send('watchdogCheck', 'watchdogCheck')
    } else if (this.watchdogCount > 4) {
      this.send('watchdogCheck', 'watchdogCheck')
    }


    this.watchdogCount ++
  }

  send(request, type = 'arduinoRequest') {
    console.log('send: ', type, request)
    this.getSocket()
      .then((socket) => {
        socket.send(JSON.stringify({
          type : type,
          payload: request
        }));
      })
      .catch((e) => {
        console.warn('send error:  ', e)
      })
  }

  close() {
    this.getSocket().then((socket) => socket.close())
  }
}