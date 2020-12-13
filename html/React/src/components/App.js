import React from "react";

import moment from 'moment';
import Api from '../utils/Api.js'
import Alert from "./Alert";
import SwipeContainer from "./SwipeContainer";
//import SwipeContainer from "./SwipeContainer"

const numPages = 3;
const windowWidth = window.outerWidth;
const padding = 20;
const containerWidth = windowWidth * numPages;

window.constants = {
  numPages: numPages,
  windowWidth: windowWidth,
  padding: padding,
  containerWidth: windowWidth * numPages,
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

    let messageHandlers = {
      'lights': this.receiveLights,
      'status': this.receiveStatus,
    }
    // todo decide how data is going to be sent to where it is needed
    this.api = new Api(messageHandlers, this.displayErrors)

    window.addEventListener('resize', () => window.location.reload())
  }


  componentDidMount() {
    //this.interval = setInterval(() => this.setState({time: moment()}), 1000);
  }

  dataReceive = (data) => {
    console.log('dataReceive ', data)
  }

  displayErrors(type, errorsArray) {
    console.log('displayErrors, type, errorsArray:', type, errorsArray)
    console.warn('displayErrors, type, errorsArray:', type, errorsArray)
    errorsArray.forEach((message) => {
      if (typeof message !== 'string') {
        message = '';
      }
      console.log('errorsArray.forEach, message:', message)
      console.warn('errorsArray.forEach, message:', message)
      this.setState({alert: {message: message, type: type}});
    });
  }



  render() {
    return (
      <div style={{
        width: window.constants.windowWidth,
        overflow: "hidden",
      }}>
        <p className='padded'>
          <span>{this.state.time.format('ddd Do MMM HH:mm:ss')}</span>
          <span className="right">Good {this.timeOfDay}</span>
        </p>
        <SwipeContainer
          api={this.api}
        />
        {this.state.alert && <Alert alert={this.state.alert}/>}
      </div>

    /*      <>
            <div className="container" id='container'>
              <p><span>{this.state.time.format('ddd Do MMM HH:mm:ss')}</span>
                <span className="right">Good {this.timeOfDay}</span>
              </p>
              {this.renderMode()}
            </div>
            {this.state.alert && <Alert alert={this.state.alert}/>}
          </>*/
    );
  }
}