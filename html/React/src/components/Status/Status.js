import React from "react";
import VoltageChart from "./VoltageChart";

export default class Status extends React.Component {

  constructor(props) {
    super(props);


  }


  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '300px'
        }}
      >
        <VoltageChart />

      </div>
    );

  }
}