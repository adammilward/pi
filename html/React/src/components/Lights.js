import React from "react";
import LightsOn from "./LightsOn";

export default class Lights extends React.Component{

  on = false;
  data = {
    mode: "lights"
    , r: 0
    , g: 0
    , b: 0
    , l: 1
    , u: 100
    , lightMode: [0, 2]
    , slideDelay: 0
    , fadeDelay: 0
    , reportDelay: 0
  };

  constructor(props) {
    console.log('Lights.Constructor', props);
    super(props);
  }

  toggle = (fade) => {
    this.props.sendRequest(
      this.on ? 'lights off' : 'lights on',
      this.processResponse
    );
    console.log(this);
  };

  processResponse() {
    console.log('Lights.processResponse');
  }

  sanitiseProps(props) {
    console.log('sanitize porps', props);
    if (undefined === props.mode) {
      return;
    }
    this.data.r = props.r < 0 ? 0 : props.r > 100 ? 100 : props.r;
    this.data.g = props.g < 0 ? 0 : props.g > 100 ? 100 : props.g;
    this.data.r = props.b < 0 ? 0 : props.b > 100 ? 100 : props.b;
    this.on = Boolean(this.data.r || this.data.g || this.data.b);
    console.log(this.on);
  }

  render() {
    console.log('Lights::render', this);
    this.sanitiseProps(this.props);
    return (
      <div>
        <label className="switch float">
          <input
            type="checkbox"
            checked={this.on}
            onChange={this.toggle}
          />
          <span className="switch-slider round right" />
        </label>
        {this.on &&
          <LightsOn
            {...this.props}
          />
        }
      </div>
    );
  }
}