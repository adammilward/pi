import React from "react";

import moment from 'moment';
import Api from '../utils/Api.js'
import Alert from "./Alert";
import SwipeContainer from "./SwipeContainer";
//import SwipeContainer from "./SwipeContainer"

export default class App extends React.Component{

  api;
  interval = {};

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

    this.api = new Api(this.displayErrors)
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.setState({time: moment()}), 1000);
  }

  displayErrors(type, errorsArray) {
    errorsArray.forEach((message) => {
      this.setState({alert: {message: message, type: type}});
    });
  }



  render() {
    return (
      <>
        <p className='padded'>
          <span>{this.state.time.format('ddd Do MMM HH:mm:ss')}</span>
          <span className="right">Good {this.timeOfDay}</span>
        </p>
        <SwipeContainer
          api={this.api}
        />
        <div className='padded'>
          footer
        </div>
        {this.state.alert && <Alert alert={this.state.alert}/>}
      </>

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