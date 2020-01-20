import React from "react";
import Lights from './Lights';
import Footer from './Footer';
import Moment from 'react-moment';
import moment from 'moment';

export default class App extends React.Component{

  constructor(props) {
    super(props);
    const date = new Date();

    /**
     * @type {Moment}
     */
    this.moment = new moment(date);
    this.timeString = moment.toLocaleString();
    const hours = date.getHours();
console.log(hours);
    this.timeOfDay = 'day';
    if (hours < 12) {
      this.timeOfDay = 'morning';
    } else if (hours >= 12 && hours < 17) {
      this.timeOfDay = 'afternoon';
    } else {
      this.timeOfDay = 'night';
    }
  }

  componentDidMount() {
    //funct is only called once when the component is mounted
    // and not called on reRendering, ie when updating state
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // return true or false
  }

  componentWillUnmount() {
    //tare down or clean up code, eg remove event listeners
  }

  render() {
    return (
      <div className="container" id='container'>
        <p><span>{this.moment.format('ddd Do MMM HH:mm:ss')}</span>
          <span className="right">Good {this.timeOfDay}</span>
        </p>
        <Lights/>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}