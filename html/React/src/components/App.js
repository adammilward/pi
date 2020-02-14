import React from "react";
import Lights from './Lights';
import Footer from './Footer';
import moment from 'moment';
import Api from '../utils/Api.js'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

export default class App extends React.Component{

  api = new Api();

  constructor(props) {
    super(props);

    /**
     * @type {moment.Moment}
     */
    const time = moment();
    this.state = {
      time: time,
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
  }

  componentDidMount() {
    console.log('componentDitMount');
    //this.interval = setInterval(() => this.setState({time: moment()}), 1000);
    //this.interval = setInterval(console.log(this), 1000);
    //this.whereIsThis();
  }

  render() {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE
    };
    console.log('App::render', this.props, this.state);
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="container" id='container'>
          <p><span>{this.state.time.format('ddd Do MMM HH:mm:ss')}</span>
            <span className="right">Good {this.timeOfDay}</span>
          </p>
          <Lights
            api={this.api}
          />
          <div>
            <Footer/>
          </div>
        </div>
      </AlertProvider>
    );
  }
}