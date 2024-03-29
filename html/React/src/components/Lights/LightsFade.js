import React from 'react';
import Slider from "./Slider";
import LightsOn from "./LightsOn";

const MAX_POW = 8;

export default class LightsFade extends React.Component{

  wasDragged = false;

  radio = (mode) => {
    this.props.sendRequest(
      'lights ' + mode,
      null,
      1
    );
  };

  toggle = (fade) => {
    let requestMode = this.slideModes[this.props.lightMode[1]].value;
    if (Boolean(this.props.delay)) {
      this.props.sendRequest(
        'lights static',
        null,
        1
      );
    } else {
      this.props.sendRequest(
        'lights ' + requestMode,
        null,
        1
      );
    }
  };

  slideModes = [
    {name: 'LIN', value: 'lin'},
    {name: 'SIN', value: 'sin'},
    {name: 'EXP', value: 'exp'},
    {name: 'S+E', value: 'sinexp'},
  ];

  fadeButtons() {
    return this.slideModes.map((mode, index) => {
      let checked = (index === this.props.lightMode[1]);
      return (
        <label key={mode.name}>
          {mode.name} <br/>
          <input name='fadeMode'
                 key={mode.value}
                 onChange={() => this.radio(mode.value)}
                 checked={checked}
                 type="radio"
          />
        </label>
      )
    })
  }

  actionDragged = (value, name) => {
    this.props.sendRequest('lights ' + name + ' ' + (Math.pow(2, value).toFixed() - 1 ));
  };

  render() {
    return (
      <div>
        <div className="lights-fade">
          Fade
          <label className="switch float">
            <input
              type="checkbox"
              checked={Boolean(this.props.delay)}
              onChange={this.toggle}
            />
            <span className="switch-slider round right" />
          </label>
        </div>
        {Boolean(this.props.delay) &&
          <div className="fade-settings right">
            <div className="fade-mode">
              {this.fadeButtons()}
            </div>


            <div className="fade-sliders" >
              Delay &nbsp; &nbsp; &nbsp; &nbsp;
              <Slider
                key={'delay' + this.props.count}
                name={'delay'}
                value={this.props.delay}
                color={'#333'}
                getColor={() => 'rgb(100, 100, 100)'}
                allowedmin={0}
                allowedmax={MAX_POW}
                rangemax={MAX_POW}
                sendRequest={this.props.sendRequest}
                actionDragged={this.actionDragged}
                dragHold={this.props.dragHold}
              />
              Upper &nbsp; &nbsp; &nbsp; &nbsp;
              <Slider
                key={'u' + this.props.count}
                name={'u'}
                value={this.props.u}
                color={'#999'}
                getColor={() => 'rgb(250, 250, 250)'}
                allowedmax={MAX_POW}
                rangemax={MAX_POW}
                allowedmin={0}
                sendRequest={this.props.sendRequest}
                actionDragged={this.actionDragged}
                dragHold={this.props.dragHold}
              />
              Lower &nbsp; &nbsp; &nbsp; &nbsp;
              <Slider
                key={'l' + this.props.count}
                name={'l'}
                value={this.props.l}
                color={'#aaa'}
                getColor={() => 'rgb(50, 50, 50)'}
                allowedmax={MAX_POW}
                rangemax={MAX_POW}
                allowedmin={0}
                sendRequest={this.props.sendRequest}
                actionDragged={this.actionDragged}
                dragHold={this.props.dragHold}
              />
            </div>
        </div>
        }
      </div>
    );
  }
}