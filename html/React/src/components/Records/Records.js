import React from "react";
import RecordsChart from "./RecordsChart";

export default class Records extends React.Component {

  constructor(props) {
    super(props);

    this.state = {records: false}

    props.api.addHandler('records', this.handleRecords);
  }

  handleRecords = (data) => {
    //console.log('handleRecords', data)
    if (data.hasOwnProperty('records')) {
      this.setState({
        records: data.records
      })
    }
  }

  render() {
    return (
      <RecordsChart
        records={this.state.records}
      />
    );
  }
}