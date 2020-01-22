import React from 'react';
import Slider from "./Slider";

export default class LightsFade extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      fadeOn: this.props.fadeOn,
      fadeMode: this.props.fadeMode,
      delay: 16,
      top: 100,
      bottom: 0,
    };
  }

  radio = (mode) => {
    console.log('radio');
    console.log('mode, thing, this', mode, this);
    this.setState({fadeMode: mode})
  };

  toggle = (fade) => {
    this.setState({fadeOn: !this.state.fadeOn})
  };

  fadeModes = [
    {name: 'LIN', value: 'lin'},
    {name: 'SIN', value: 'sin'},
    {name: 'EXP', value: 'exp'},
    {name: 'S+E', value: 'sinexp'},
  ];

  fadeButtons(props) {
    return this.fadeModes.map((mode) => {
      return (
        <label>
          {mode.name} <br/>
          <input name='fadeMode'
                 key={mode.value}
                 onChange={() => this.radio(mode.value)}
                 checked={this.state.fadeMode === mode.value}
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
    console.log(this);
    return (
      <div>
        <div className="lights-fade">
          Fade
          <label className="switch float">
            <input
              type="checkbox"
              checked={this.state.fadeOn}
              onChange={this.toggle}
            />
            <span className="switch-slider round right" />
          </label>
        </div>
        {this.state.fadeOn &&
        <div className="fade-settings right">
          <div className="fade-mode">

            {this.fadeButtons()}

          </div>


          <div className="fade-sliders" >
            Delay &nbsp; &nbsp; &nbsp; &nbsp;
            <Slider
              name={'delay'}
              value={this.state.delay}
              color={'#333'}
              getColor={() => 'rgb(100, 100, 100)'}
              min={16}
              displayValue={this.displayValue}
              slid={this.delaySlid}
            />
            Range&nbsp; &nbsp; &nbsp; &nbsp;
            <Slider
              name={'top'}
              value={this.state.top}
              color={'#999'}
              getColor={() => 'rgb(250, 250, 250)'}
              max={100}
              min={20}
              slid={this.topSlid}
            />
            Bottom&nbsp; &nbsp; &nbsp; &nbsp;
            <Slider
              name={'bottom'}
              value={this.state.bottom}
              color={'#aaa'}
              getColor={() => 'rgb(50, 50, 50)'}
              max={80}
              min={0}
              slid={this.bottomSlid}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}