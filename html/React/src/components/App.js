import React from "react";
import Lights from './Lights';
import Footer from './Footer';
import moment from 'moment';
import Api from '../utils/Api.js'

export default class App extends React.Component{

  api = new Api();

  constructor(props) {
    super(props);

    /**
     * @type {moment.Moment}
     */
    const time = moment();
    this.state = {time: time};

    const hours = time.format('H');
    this.timeOfDay = 'day';
    if (hours < 12) {
      this.timeOfDay = 'morning';
    } else if (hours >= 12 && hours < 17) {
      this.timeOfDay = 'afternoon';
    } else {
      this.timeOfDay = 'night';
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    console.log('componentDitMount');
    //this.interval = setInterval(() => this.getData('report'), 1000);
    this.getData('lights on')
    //this.interval = setInterval(console.log(this), 1000);
    //this.whereIsThis();
  }

  getData(request = 'report') {
    console.log('getData');
    if (!this.api.isBusy) {
      console.log(this.api.getData(request));
    }
    this.setState({ time: moment() })
  }

  render() {
    return (
      <div className="container" id='container'>
        <p><span>{this.state.time.format('ddd Do MMM HH:mm:ss')}</span>
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