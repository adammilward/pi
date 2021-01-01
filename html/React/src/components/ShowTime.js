import React from "react";
import moment from "moment";

export default class ShowTime extends React.Component{

  constructor(props) {
    super(props);
    this.state = {date: moment()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: moment()
    });
  }

  render() {
    return (
      <span>
        {this.state.date.format('ddd Do MMM HH:mm:ss')}
      </span>
    );
  }
}