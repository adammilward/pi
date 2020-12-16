import React from "react";
import LightsOn from "./LightsOn";
import Alert from "../Alert";

const MAX_POW = 255;

export default class Lights extends React.Component{

  requestTime;
  processHold;
  pendingOff = false;
  isDragged = false;

  constructor(props) {
    console.log('Lights.constructor', props)
    super(props);

    if (props.lastMessage
      && props.lastMessage.type
      && props.lastMessage.type === 'lights'
    ) {
      this.processLightsData(props.message.payload);
    } else {
      this.state = {
        on: false
        , r: 0
        , g: 0
        , b: 0
        , l: 1
        , u: MAX_POW
        , lightMode: [0, 3]
        , delay: 0
        , fadeDelay: 0
        , reportDelay: 0
        , count: 0
      };
    }
    this.sendRequest('lights report');

    this.dragHold = this.dragHold.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest(
    request = 'lights report',
    callback = this.receiveResponse,
    priority = 0
  ) {
    if (typeof 'callback' !== 'function') {
      callback = this.receiveResponse
    }
    this.props.api.getData(request, callback, priority);
  }


  receiveResponse = (success, response) => {
    response.forEach((data) =>{
      if (Array.isArray(data)) {
        this.receiveResponse(success, data)
      } else if ('object' === typeof data) {
        if ('lights' === data.mode) {
          this.processLightsData(data);
        } else if (data.info) {
          //this.setState({alert: {message: data.info, type: 'info'}});
        } else if (data.err) {
          this.setState({alert: {message: data.err, type: 'error'}});
        }
      }
    });
  };

  toggle = (fade) => {
    this.pendingOff = (this.state.on);
    this.sendRequest(
      this.state.on ? 'lights off' : 'lights on',
      this.receiveResponse,
      1
    );
  };

  dragHold(isDragged) {
    this.isDragged = isDragged;
  }

  processLightsData(data) {
    clearTimeout(this.requestTime);
    if (typeof data !== "object") {
      return;
    }

    // postpone update if dragging;
    if (this.isDragged) {
      //this.processHold = setTimeout(() => this.processLightsData(data), 10);
      return;
    }

    console.log('recieved: ', data);

    let newState = {
      r: data.r < 0 ? 0 : data.r > MAX_POW ? MAX_POW : data.r,
      g: data.g < 0 ? 0 : data.g > MAX_POW ? MAX_POW : data.g,
      b: data.b < 0 ? 0 : data.b > MAX_POW ? MAX_POW : data.b,
      l: Math.log2(1 + (data.l < 0 ? 0 : data.l > MAX_POW ? MAX_POW : data.l)),
      u: Math.log2(1 + (data.u < 0 ? 0 : data.u > MAX_POW ? MAX_POW : data.u)),
      lightMode: data.lightMode,
      delay: Math.log2(data.delay + 1),
      fadeDelay: data.fadeDelay,
      reportDelay: data.reportDelay,
      count: this.state.count + 1
    };

    console.log('lights setState: ', newState);

    this.setState({
      ...newState,
      on: Boolean(newState.r || newState.g || newState.b),
    });

    clearTimeout(this.requestTime);
    if (newState.fadeDelay || newState.delay) {
      let time = (newState.fadeDelay > newState.delay) ?
        newState.fadeDelay / 20
        : newState.delay * 500;
      this.requestTime = setTimeout(() => this.sendRequest(), time)
    } else {
      this.requestTime = setTimeout(() => this.sendRequest(), 1000 * 100)
    }
  }

  render() {
    return (
      <div>
        <label className="switch float">
          <input
            type="checkbox"
            checked={(this.state.on && !this.pendingOff)}
            onChange={this.toggle}
          />
          <span className="switch-slider round right" />
        </label>
        {this.state.on &&
          <LightsOn
            {...this.state}
            {...this.props}
            sendRequest={this.sendRequest}
            dragHold={this.dragHold}
          />
        }
        {this.state.alert && <Alert alert={this.state.alert}/>}
      </div>
    );
  }
}