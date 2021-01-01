import React from "react";
import VoltageChart from "./VoltageChart";

export default class Status extends React.Component {

  constructor(props) {
    super(props);

    this.state = {data: []}

    props.api.addHandler('status', this.handleStatus);
    props.api.send('status report')
  }

  handleStatus = (newData) => {
    this.setState((prevState) => {
      //console.log('STATUS handle data, data: ', newData)
      if (prevState.data.length > 2) {
        console.log(
          prevState.data[0].timestamp,
          prevState.data[0].timestamp - newData.timestamp
        )
      }
      return {data: [newData].concat(prevState.data)}
    })
  }

  render() {
    return (
        <VoltageChart
          data={this.state.data}
        />
    );
  }
}