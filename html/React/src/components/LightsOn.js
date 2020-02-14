import React from "react";
import Slider from './Slider'
import LightsFade from './LightsFade'

export default class LightsOn extends React.Component{

  func = function () {
  };

  bottomSlid = (value, name) => {
  };

  render() {
    return (
      <div className="lights" id='lights'>
        <Slider
          key={'r' + this.props.r}
          name={'r'}
          value={this.props.r}
          color={'#f00'}
          getColor={function (power) {
            return 'rgb(' + Math.round(power * 2.55) + ', 0, 0)';
          }}
          slid={this.slid}
          sendRequest={this.props.sendRequest}
        />
        <Slider
          key={'g' + this.props.g}
          name={'g'}
          value={this.props.g}
          color={'#0f0'}
          getColor={function (power) {
            return 'rgb(0, ' + Math.round(power * 2.55) + ', 0)';
          }}n
          slid={this.slid}
          sendRequest={this.props.sendRequest}
        />
        <Slider
          key={'b' + this.props.b}
          name={'b'}
          value={this.props.b}
          color={'#00f'}
          getColor={function (power) {
            return 'rgb(0, 0, ' + Math.round(power * 2.55) + ')';
          }}
          slid={this.slid}
          sendRequest={this.props.sendRequest}
        />
        <LightsFade
          {...this.props}
          bottomSlid={this.bottomSlid}
        />
      </div>
    );
  }
}