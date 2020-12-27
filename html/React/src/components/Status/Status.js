import React from "react";
import VoltageChart from "./VoltageChart";

export default class Status extends React.Component {

  constructor(props) {
    super(props);

    props.api.addHandler(this.handleStatus);
    props.api.send('status report')
  }

  handleStatus = (data) => {

  }

  render() {
    return (
        <VoltageChart />
    );

  }
}