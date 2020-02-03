import React from "react";
import Slider from './Slider'
import LightsFade from './LightsFade'
import LightsOn from "./LightsOn";

export default class Lights extends React.Component{

  constructor(props) {

    super(props);

    this.state = {
      lightsOn: true,
      power: {
        r: 0,
        g: 0,
        b: 0,
      },
      fadeOn: true,
      fadeMode: 'sinexp'
    };
  }

  toggle = (fade) => {
    this.setState({lightsOn: !this.state.lightsOn})
  };

  render(props) {
    return (
      <div>
        <label className="switch float">
          <input
            type="checkbox"
            checked={this.state.lightsOn}
            onChange={this.toggle}
          />
          <span className="switch-slider round right" />
        </label>
        {this.state.lightsOn &&
          <LightsOn
            {...this.state}
          />
        }
      </div>
    );
  }
}