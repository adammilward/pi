import React from "react";

import moment from 'moment';
import Api from '../utils/Api.js'
import Alert from "./Alert";
import SwipeContainer from "./SwipeContainer";

const numPages = 3;
const windowWidth = window.innerWidth;
const padding = 20;

window.constants = {
  numPages: numPages,
  windowWidth: windowWidth,
  windowInnerWidth: windowWidth - padding,
  padding: padding,
  containerWidth: windowWidth * numPages,
  pageHeight: window.innerHeight - 88
}

export default class App extends React.Component{

  api;
  interval = {};

  static alertTypes = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error'
  };

  constructor(props) {
    super(props);

    /**
     * @type {moment.Moment}
     */
    const time = moment();

    this.state = {
      time: time,
      mode: 'status',
      users: 0,
      lastMessage: {type: '', payload: ''}
    };

    const hours = time.format('H');
    this.timeOfDay = 'day';
    if (hours < 12) {
      this.timeOfDay = 'morning';
    } else if (hours >= 12 && hours < 17) {
      this.timeOfDay = 'afternoon';
    } else {
      this.timeOfDay = 'night';
    }

    this.displayErrors = this.displayErrors.bind(this);

    this.api = new Api(this.displayErrors)

    window.addEventListener('resize', () => window.location.reload())
  }

  receiveMessage = (message) => {
    console.log('App.receiveMesage', message)
    if (message.type === 'users') {
      this.setState({users: message.payload.count})
    }
    this.setState({
      lastMessage: message
    });
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.setState({time: moment()}), 1000);
  }

  dataReceive = (data) => {
    console.log('dataReceive ', data)
  }

  displayErrors(type, errorsArray) {
    errorsArray.forEach((message) => {
      if (typeof message !== 'string') {
        message = '';
      }
      this.setState({alert: {message: message, type: type}});
    });
  }



  render() {
    let s = 's'
    return (
      <div style={{
        width: window.constants.windowWidth,
        overflow: "hidden",
      }}>
        <p className='padded'>

          <span>
            {this.state.time.format('ddd Do MMM HH:mm:ss')}
          </span>
          <span className="right">
            Good {this.timeOfDay}
          </span>
          <span className="right">
            {this.state.users} user{this.state.users !== 1 && s}
          </span>
        </p>
        <SwipeContainer
          api={this.api}
          windowConstants={this.pr}
          lastMessage={this.state.lastMessage}
        />
        {this.state.alert && <Alert alert={this.state.alert}/>}
      </div>
    );
  }
}