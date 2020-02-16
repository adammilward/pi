import React from "react";
import Slider from './Slider'
import LightsFade from './LightsFade'

const MAX_POW = 100;

export default class LightsOn extends React.Component{

  actionDragged = (value, name) => {
    console.log(value, name);
    this.props.sendRequest(
      this.props.sendRequest('lights ' + name + ' ' + value),
      1
    );
  };

  render() {
    return (
      <div className="lights" id='lights'>
        <Slider
          key={'r' + this.props.count}
          name={'r'}
          value={this.props.r}
          color={'#f00'}
          getColor={function (power) {
            return 'rgb(' + Math.round(power * 2.55) + ', 0, 0)';
          }}
          allowedmax={MAX_POW}
          rangemax={MAX_POW}
          slid={this.slid}
          sendRequest={this.props.sendRequest}
          actionDragged={this.actionDragged}
          dragHold={this.props.dragHold}
        />
        <Slider
          key={'g' + this.props.count}
          name={'g'}
          value={this.props.g}
          color={'#0f0'}
          getColor={function (power) {
            return 'rgb(0, ' + Math.round(power * 2.55) + ', 0)';
          }}
          allowedmax={MAX_POW}
          rangemax={MAX_POW}
          slid={this.slid}
          sendRequest={this.props.sendRequest}
          actionDragged={this.actionDragged}
          dragHold={this.props.dragHold}
        />
        <Slider
          key={'b' + this.props.count}
          name={'b'}
          value={this.props.b}
          color={'#00f'}
          getColor={function (power) {
            return 'rgb(0, 0, ' + Math.round(power * 2.55) + ')';
          }}
          allowedmax={MAX_POW}
          rangemax={MAX_POW}
          slid={this.slid}
          sendRequest={this.props.sendRequest}
          actionDragged={this.actionDragged}
          dragHold={this.props.dragHold}
        />
        <LightsFade
          {...this.props}
          bottomSlid={this.bottomSlid}
        />
      </div>
    );
  }
}