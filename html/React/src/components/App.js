import React from "react";
import Lights from './Lights';
import Footer from './Footer';
import moment from 'moment';

export default class App extends React.Component{

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
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.setState({ time: moment() }), 1000);
    this.interval = setInterval(this.getData, 1000);
    //this.interval = setInterval(console.log(this), 1000);
    //this.whereIsThis();
  }

  getData = () => {
    console.log('getData', this);
    //let url = "van_data.php";
    let url = "http://thx1138-dev/van_data.php";
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };

  whereIsThis() {
    console.log('it is here', this)
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true
  }

  componentWillUnmount() {
    //tare down or clean up code, eg remove event listeners
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