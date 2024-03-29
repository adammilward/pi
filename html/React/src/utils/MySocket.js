export default class MySocket {

  _websocket = null
  receiveCallback
  aliveTimeout

  // start assuming the websocket is dead
  watchdogCount = 4

  host

  constructor(receiveCallback) {
    //this.host = window.config.websocket.host || "thx1138";
    this.host = window.location.hostname
    console.log(this.host);
    console.log(window.config);
    if (this.host === 'localhost' || this.host === window.config.websocket.host) {
      this.host = window.config.websocket.host
    }
    console.log(this.host);
    
    this.receiveCallback = receiveCallback
    this.getSocket().then((socket) => {
      //console.log('got socket', socket);
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
          this._websocket = this.buildSocket();
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
    console.log('buildSocket', window.location)

    let _this = this;

    let url = "ws://"
      + this.host
      //+ "90.249.235.57"
      + ":"
      + window.config.websocket.port
      + "/";
    let websocket = new WebSocket(
      url
    )

    console.log(url)

    websocket.onOpen = function () {
      console.log('websocket Opened, this', this)
    };

    websocket.onClose = function () {
      console.log('MySocket._websocket.onClose', this)
      // todo this doesn't work
      _this._websocket = null;
      console.log('websocket closed, this', this)
    }

    websocket.onmessage = this.onmessage

    return websocket;
  }

  onmessage = (message) => {
    console.log('onmessage', message)
    this.watchdogCount = 0
    this.receiveCallback(message)
  }

  watchdog = () => {
    if (this.watchdogCount > 10) {
      console.log('destroying websocket')
      if (this._websocket !== null) {
        this._websocket.close();
        this._websocket = null
      }
    }

    if (this.watchdogCount > 7) {
      console.log('sending websocket server start request')
      fetch(
        "http://" + this.host + "/websocket/startSocket.php",
        // not working becuse hostname thx1138 is not recognised
        //window.config.apiUrl + '/websocket/startSocket.php',
        {
          method: 'GET',
        })
        .then((response) => {
          console.log('websocket start response: ', response);
        })
    }

    if (this.watchdogCount > 5) {
      this.send('watchdogCheck', 'watchdogCheck')
    }

    this.watchdogCount ++
  }

  send(request, type = 'arduinoRequest') {
    console.log("send", request, type);
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
    console.lwarn("close why are we cloasing?")
    this.getSocket().then((socket) => socket.close())
  }
}
