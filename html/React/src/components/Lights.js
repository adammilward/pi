import React from "react";
import LightsOn from "./LightsOn";
import Alert from "./Alert";
import {useAlert} from "react-alert";

export default class Lights extends React.Component{

  timer;
  pendingOff = false;

  constructor(props) {
    super(props);
    this.state = {
      on: false
      , r: 0
      , g: 0
      , b: 0
      , l: 1
      , u: 100
      , lightMode: [0, 3]
      , delay: 0
      , fadeDelay: 0
      , reportDelay: 0
    };
    this.sendRequest('lights report');

    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest(request = 'lights report', callback = this.receiveResponse) {
    if (!this.props.api.isBusy) {
      this.props.api.getData(request, this.receiveResponse);
    } else {
      console.log('is busy');
    }
  }

  receiveResponse = (success, response) => {
    this.processResponse(response.find((data) => data.mode === 'lights'));
  };

  toggle = (fade) => {
    this.pendingOff = (this.state.on);
    this.sendRequest(
      this.state.on ? 'lights off' : 'lights on',
      () => this.receiveResponse
    );
  };

  processResponse(data) {
    if (typeof data !== "object") {
      return;
    }

    if (data.err) {
      //alert.show(data.errMsg);
      this.setState({errMsg: data.err});
      return;
    }

    clearTimeout(this.timer);

    let newState = {
      r: data.r < 0 ? 0 : data.r > 100 ? 100 : data.r,
      g: data.g < 0 ? 0 : data.g > 100 ? 100 : data.g,
      b: data.b < 0 ? 0 : data.b > 100 ? 100 : data.b,
      l: data.l < 0 ? 0 : data.l > 100 ? 100 : data.l,
      u: data.u < 0 ? 0 : data.u > 100 ? 100 : data.u,
      lightMode: data.lightMode,
      delay: data.delay,
      fadeDelay: data.fadeDelay,
      reportDelay: data.reportDelay,
    };

    this.setState({
      ...newState,
      on: Boolean(newState.r || newState.g || newState.b),
    });

    if (newState.fadeDelay || newState.delay) {
      //console.log('f, s ',newState.fadeDelay, newState.delay);
      let time = (newState.fadeDelay > newState.delay) ? newState.fadeDelay : newState.delay;
      //console.log(time);
      this.timer = setTimeout(() => this.sendRequest(), time * 50)
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
            sendRequest={this.sendRequest}
          />
        }
        {this.state.errMsg && <Alert errMsg={this.state.errMsg}/>}
      </div>
    );
  }
}