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
    this.state = {
      time: time,
      lights: {}
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

    this.sendRequest = this.sendRequest.bind(this);
    this.processResponse = this.processResponse.bind(this)
  }

  componentDidMount() {
    console.log('componentDitMount');
    //this.interval = setInterval(() => this.setState({time: moment()}), 1000);

    this.sendRequest('lights report')
    //this.interval = setInterval(console.log(this), 1000);
    //this.whereIsThis();
  }

  sendRequest(request = 'lights report', callback = this.processResponse) {
    console.log('getData');
    if (!this.api.isBusy) {
      console.log(this.api.getData(request, callback));
    } else {
      this.setState({time: moment()})
    }
  }

  processResponse(success, response) {
    console.log(this, success, response);
    console.log(response.find((data) => data.mode === 'lights'));
    this.setState({
      lights: response.find((data) => data.mode === 'lights'),
    });
  }

  render() {
    console.log('App::render', this.props, this.state);
    return (
      <div className="container" id='container'>
        <p><span>{this.state.time.format('ddd Do MMM HH:mm:ss')}</span>
          <span className="right">Good {this.timeOfDay}</span>
        </p>
        <Lights
          {...this.state.lights}
          sendRequest={this.sendRequest}
        />
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}