import React from "react";

const ON = 'ON';
const OFF = 'OFF';

export default class Utility extends React.Component {

  alarm(alarm) {
    let time = new Date(alarm.ts * 1000)
    let repeat = alarm.repeat ? 'daily' : 'once'

    let timer = alarm.timerMins + ' minute';
    timer += (alarm.timerMins === 1) ? '' : 's';

    if (alarm.active) {
      return (
        <div className='bold'>
          alarm active -
          in: {alarm.inMins} min {alarm.inMins === 1 && 's'} <br/>
          at: {alarm.time} -&nbsp;
          <span style={{fontSize: "small"}}>
            {time.toISOString()
              .replace('T', ' ')
              .substr(0, 19)}
          </span><br/>
          repeat: {repeat}<br/>
          timer: {timer}
        </div>
      )
    } else {
      return (
        <div>
          alarm off <br/>
          at: {alarm.time} -&nbsp;
          <span style={{fontSize: "small"}}>
             {time.toISOString()
               .replace('T', ' ')
               .substr(0, 19)}
          </span><br/>
          repeat: {repeat}<br/>
          timer: {timer}
        </div>
      )
    }
  }

  render() {
    let {alarm, on, forMin} = this.props.utility

    let titleClass = on ? 'bold': '';
    let forMinStr = 'ON for: ' + forMin + ' minute';
    forMinStr += (forMin === 1) ? '' : 's';

    let alarmClass = alarm.active ? 'bold': '';
    let activeStr = alarm.active ? 'alarm active': 'alarm off';

    return (
      <div>
        <div
            className={titleClass}
          >
          {this.props.name} : {this.props.utility.on && forMinStr}
          {! this.props.utility.on && 'off'}
        </div>
        <br/>
        <div style={{paddingLeft: 20}}>
          {this.alarm(alarm)}
        </div>


      </div>
    )
  }
}