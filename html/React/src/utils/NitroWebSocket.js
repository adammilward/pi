/**
 * Nitro web socket class
 * attempts to make a connection when instantiated,
 * attempts to reconnect after 1, 2, 4, 8, 16... seconds if connection dies
 * attempts to reconnect on send,
 *
 * Sends messages and returns a promise,
 * which resolves to the response on success or error on falure
 *
 * Can store 'connectors' which consist of a callback funcion and connectorId
 * these receive push messages, which are identified by their connectorId
 *
 */
export default class NitroWebSocket {


  /**
   * functions which will be handed data from incoming messages
   * @type {{callback}}
   */
  connectorCallbacks = {};

  requestPromises = {};

  minTimeout = 1;
  timeout = this.minTimeout;
  maxTimeout = 1000;

  /**
   * Initialises the websocket
   */
  constructor() {
    this.check()
      .then((ws) => {
        this.ws = ws;
      })
      .catch((err) => {
        console.log('failed to connect!');
        console.log(err);
      });
  }

  /**
   * Sends message and returns a Promise,
   * which resolves to the response
   *
   * @param {{}} msg
   * @return {Promise}
   */
  send(msg) {
    //console.log('NitroWebServer.send', msg);
    return this.check()
      .then((ws) => {
        this.ws = ws;
        return this.getMessagePromise(msg, ws)
      })
      .catch((err) => {
        // todo consider storing messages and sending them once a conneciton is made
        console.log('failed to send!');
        console.log(err);
        return new Promise((resolve, reject) => {
          reject(err)
        })
      });
  }

  /**
   * Generate and Return Promise
   * Store resolve and reject, by requestId
   *
   * @param msg
   * @param ws
   * @returns {Promise<any>}
   */
  getMessagePromise(msg, ws) {
    if (undefined !== msg.requestId) {
      ws.send(JSON.stringify(msg));
      return new Promise((resolve, reject) => {
        this.requestPromises[msg.requestId] = {
          resolve: resolve,
          reject: reject
        }
      })
    } else {
      throw Error('message needs a valid request Id')
    }
  }

  /**
   * provides the resolution or rejection fro the stored
   * message Promises
   * @param msg
   */
  onResponse(msg) {
    console.log('onResponse, msg: ', msg);
    if (undefined !== this.requestPromises[msg.requestId]) {
      if (undefined !== msg.payload) {
        this.requestPromises[msg.requestId].resolve(msg.payload);
      } else if (undefined !== msg.error) {
        this.requestPromises[msg.requestId].reject(msg.payload);
      } else {
        console.warn('invalid response recieved');
        console.warn(msg);
        throw Error('invalid response received')
      }
    }
  }

  /**
   * connectors are call back functions that take a single parameter, the message data object.
   * they are provided with a connectorId
   * incoming push messages from server must have a connectorId to match with
   * their respective callbacks (the connections)
   *
   * @param callback
   * @param connectorId
   */
  addConnector(callback, connectorId) {
    if (typeof callback === 'function' && typeof connectorId === 'string') {
      this.connectorCallbacks[connectorId] = callback;
    } else {
      throw Error('connector call back must be function, with string id')
    }
  }

  /**
   * match push messages with connector callbacks
   * @param msg
   */
  onConnector(msg) {
    if (undefined !== this.connectorCallbacks[msg.requestId]) {
      if (undefined !== msg.payload) {
        this.connectorCallbacks[msg.requestId](msg.payload);
      } else if (undefined !== msg.error) {
        console.warn(`connector '${msg.connectorId}' received error: `);
        console.warn(msg);
      } else {
        console.warn('invalid response received');
        console.warn(msg);
        throw Error('invalid response received')
      }
    }
  }

  /**
   * @param msgEvent
   */
  onMessage = (msgEvent) => {
    //console.log('NitroWebSocket.onMessage recieved: msgEvent: ', msgEvent);
    let msg = {};
    try {
      msg = JSON.parse(msgEvent.data);
    } catch (e) {
      console.log('Json.parse message failed - msg.payload: ', msgEvent.data);
      throw Error(e)
    }

    if (undefined !== msg.connectorId) {
      this.onConnector(msg);
    } else if (undefined !== msg.requestId) {
      this.onResponse(msg);
    } else if (undefined !== msg.error) {
      // todo do we write a to display error messages to user
      console.log('ws error message recieved: ', msg.error);
      console.log(msg)
    } else {
      console.log('invalid message type');
      console.log(msg);
      throw Error('invalid message type')
    }
  };

  /**
   * @function connect
   * This function establishes the connect with the websocket
   * and also ensures constant reconnection if connection closes
   */
  connect = () => {
    let _onMessage = this.onMessage;
    let _that = this;
    let connectInterval;

    return new Promise(function (resolve, reject) {


      let ws = new WebSocket("ws://nitro.test-local:8080");


      // websocket onopen event listener
      ws.onopen = () => {
        _that.timeout = _that.minTimeout;
        clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        resolve(ws);
      };

      ws.onmessage = function(e) {
        _that.onMessage(e);
      };

      // websocket onclose event listener
      ws.onclose = e => {
        _that.timeout *= 2; //increment retry interval

        console.log(
          `Socket is closed. 
          Reconnect will be attempted in
          ${Math.min(_that.maxTimeout, _that.timeout)} second.`,
          e.reason
        );

        connectInterval = setTimeout(
          _that.connect,
          Math.min(_that.maxTimeout * 1000, _that.timeout * 1000)
        );
        //call check function after timeout
      };

      // websocket onerror event listener
      ws.onerror = err => {
        console.error(
          "Socket encountered error: ",
          err.message,
          "Closing socket"
        );
        reject(err);
        ws.close();
      };

    })
  };

  /**
   * utilised by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  check = () => {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
      this.timeout = this.minTimeout;
      return this.connect();
    } else {
      return new Promise((resolve) => resolve(this.ws))
    }//check if websocket instance is closed, if so call `connect` function.
  };
}
