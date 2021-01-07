import React from "react";
import VoltageChart from "./VoltageChart";

export default class Status extends React.Component {

  constructor(props) {
    super(props);

    this.state = {liveData: []}

    props.api.addHandler('status', this.handleStatus);
    props.api.send('status report')
  }

  handleStatus = (newData) => {

    if (newData.hasOwnProperty('records')) {
      this.setState({
        records:newData.records
      })
    } else {
      this.setState((prevState) => {
        //console.log('STATUS handle data, data: ', newData)

        // we may need to sort the data
        let data = [newData].concat(prevState.liveData);
        if (data.length > 60) {
          data.pop()
        }
        return {liveData: data}
      })
    }
  }

  render() {
    return (
        <VoltageChart
          liveData={this.state.liveData}
          records={this.state.records}
        />
    );
  }
}