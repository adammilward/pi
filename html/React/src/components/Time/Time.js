import React from "react";
import Utility from "./Utility.js";

const INITIAL_STATE = {
  timeTs: 0,
  temp: 0,
  reportDelay: 0,
  leds: {
    on: true,
    forMin: 0,
    alarm: {
      active: true,
      inMins: '10',
      time: '10:11',
      ts: 1234565,
      repeat: true,
      timerMins: 60
    },
  },
  heater: {
    on: false,
    forMin: 0,
    alarm: {
      active: true,
      inMins: '0',
      time: '10:10',
      ts: 0,
      repeat: false,
      timerMins: 0
    },
  },
  water: {
    on: false,
    forMin: 0,
    alarm: {
      active: false,
      inMins: '0',
      time: '13:44',
      ts: 0,
      repeat: false,
      timerMins: 0
    }
  }
};

export default class Time extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    props.api.addHandler('time', this.handleTime);
  }

  handleTime = (data) => {
    console.log(data);
      if (data.hasOwnProperty('heater')) {
        this.setState({
          heater: data.heater
        })
      } else if (data.hasOwnProperty('water')) {
        this.setState({
          water: data.water
        })
      } else if (data.hasOwnProperty('leds')) {
        this.setState({
          leds: data.leds
        })
      } else if (data.hasOwnProperty('time')) {
        this.setState({
          timeTs: data.timeTs,
          temp: data.temp,
          reportDelay: data.reportDelay,
        })
      }
  }

  render() {
    let arduinoTime = new Date(this.state.timeTs * 1000)
    let dateTime = arduinoTime.toISOString().replace('T', ' ').substr(0, 19)

    return (
      <div>
        <p>arduino time {dateTime}</p>
        <p>temp {this.state.temp}&deg;C</p>
        <br/>
        <div>
          <Utility
            utility={this.state.leds}
            name="LEDs"
          />
        </div>
        <br/>
        <div>
          <Utility
            utility={this.state.heater}
            name="Heater"
          />
        </div>
        <br/>
        <div>
          <Utility
            utility={this.state.water}
            name="Water"
          />
        </div>
      </div>
    );
  }
}