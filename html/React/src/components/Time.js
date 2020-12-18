import React from "react";

const INITIAL_STATE = {
  timeTs: 0,
  temp: 0,
  reportDelay: 0,
  heater: {
    on: false,
    forMin: 0,
    alarm: {
      active: false,
      inMins: '',
      time: '',
      ts: 0,
      repeat: false,
      timerMins: 0
    },
    water: {
      active: false,
      inMins: '',
      time: '',
      ts: 0,
      repeat: false,
      timerMins: 0
    },
    leds: {
      active: false,
      inMins: '',
      time: '',
      ts: 0,
      repeat: false,
      timerMins: 0
    },
  }
}

export default class Time extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    props.api.addHandler(this.handleTime);

    let alarm = {
      'type': 'time', 'payload': {
        'timeTs': 1234556,
        'temp': 45
      }
    };



    this.sendRequest('timeReport report');
  }

  handleTime = (data) => {
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

  alarm = {
    'type': 'time', 'payload': {
      'heater': {
        'on': true,
        'forMin': 12,
        'alarm': {
          'active': true,
          'inMins': '23:45',
          'time': '23:45',
          'ts': 1234,
          'repeat': true,
          'timerMins': 567
        }
      }
    }
  }

  outputAlarm(utilityType) {
    let utility = this.state[utilityType];
    return (
      {utilityType}
    )
  }

  render() {
    let arduinoTime = new Date(this.state.timeTs * 1000)
    let dateTime = arduinoTime.toISOString().replace('T', '&nbs;&nbs;&nbs;&nbs;')

    return (
      <div>
        <p>arduino time {dateTime}</p>
        <p>temp {this.state.temp}&deg;C</p>
        <ul>
          <li>
            {this.outputAlarm(this.state.leds)}
          </li>
        </ul>
      </div>
    );
  }
}