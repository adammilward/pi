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
    super(props);



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

    this.props.api.addHandler('lights', this.handleData)
    this.sendRequest('lights report');
    this.dragHold = this.dragHold.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest(request = 'lights report') {
    this.props.api.send(request);
  }

  toggle = () => {
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

  handleData = (data) => {
    clearTimeout(this.requestTime);

    // postpone update if dragging;
    if (this.isDragged) {
      clearTimeout(this.processHold)
      this.processHold = setTimeout(() => this.processLightsData(data), 10);
      return;
    }


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