import React from 'react';
import FadeButton from './FadeButton'

export default class Radio extends React.Component{

  constructor(props) {
    super(props);

    const Modes = [
      {name: 'LIN', value: 'lin'},
      {name: 'SIN', value: 'sin'},
      {name: 'EXP', value: 'sin'},
      {name: 'S+E', value: 'sinexp'},
    ];

    this.state = {
      fadeOn: this.props.fadeOn,
      fadeMode: this.props.fadeMode,
    }
  }

  radio = (mode) => {
    console.log('radio');
    console.log('mode', mode);
    this.setState({fadeMode: mode})
  };

  toggle = (fade) => {
    console.log('toggle, fade', fade);
    console.log(this.state);
    console.log(this.props);
    this.setState({fadeOn: !this.state.fadeOn})
  };

  fadeModes = [
    {name: 'LIN', value: 'lin'},
    {name: 'SIN', value: 'sin'},
    {name: 'EXP', value: 'exp'},
    {name: 'S+E', value: 'sinexp'},
  ];

  fadeButtons() {
    return this.fadeModes.map((mode) => {
      return (
        <FadeButton
          key={mode.value}
          name={mode.name}
          value={mode.value}
          checked={this.state.fadeMode === mode.value}
          radio={this.radio}
        />
      )
    })
  }

  render() {
    console.log(this);
    let wibble = 'woe';
    return (
      <div>
        <div className="lights-fade">Fade
          <label className="switch float">
            <input
              type="checkbox"
              checked={this.state.fadeOn}
              onChange={this.toggle}
            />
            <span className="switch-slider round right" />
          </label>

          {this.state.fadeOn &&
          <span className="fade-mode">
            {this.fadeButtons()}
          </span>
          }
        </div>
      </div>
    );
  }
}