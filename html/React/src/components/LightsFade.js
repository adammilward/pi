import React from 'react';
import Slider from "./Slider";

export default class LightsFade extends React.Component{

  radio = (mode) => {
    console.log('radio');
    this.props.sendRequest(
      'lights ' + mode,
    );
  };

  toggle = (fade) => {
    console.log('LightsOn::toggle, this', this);
    let requestMode = this.slideModes[this.props.lightMode[1]].value;
    if (Boolean(this.props.delay)) {
      this.props.sendRequest(
        'lights static',
      );
    } else {
      this.props.sendRequest(
        'lights ' + requestMode
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
    console.log('slide mode isL ', this.props.lightMode[1]);
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

  delaySlid = (value) => {
    console.log('delaySlid', value);
  };

  topSlid = (value) => {
    console.log('topSlid', value);
  };

  bottomSlid = (value) => {
    console.log('bottomSlid', value);
  };

  displayValue = (value) => {
    console.log('displayValue', value);
    return Math.pow(2, value/100*12).toFixed(0);
  };

  render() {
    console.log('lightsFade::render, props', this.props);
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
                key={'delay'}
                name={'delay'}
                value={this.props.delay}
                color={'#333'}
                getColor={() => 'rgb(100, 100, 100)'}
                allowedmin={1}
                rangemax={10000}
                //displayValue={this.displayValue}
                slid={this.delaySlid}
                sendRequest={this.props.sendRequest}
              />
              Range &nbsp; &nbsp; &nbsp; &nbsp;
              <Slider
                key={'u'}
                name={'u'}
                value={this.props.u}
                color={'#999'}
                getColor={() => 'rgb(250, 250, 250)'}
                allowedmax={100}
                allowedmin={20}
                slid={this.topSlid}
                sendRequest={this.props.sendRequest}
              />
              Bottom &nbsp; &nbsp; &nbsp; &nbsp;
              <Slider
                key={'l'}
                name={'l'}
                value={this.props.l}
                color={'#aaa'}
                getColor={() => 'rgb(50, 50, 50)'}
                allowedmax={80}
                allowedmin={0}
                slid={this.bottomSlid}
                sendRequest={this.props.sendRequest}
              />
            </div>
        </div>
        }
      </div>
    );
  }
}