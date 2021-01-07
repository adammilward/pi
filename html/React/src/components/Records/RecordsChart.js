import React from 'react'
import { Chart } from 'react-charts'

const SERIES = {
  tempOne: {
    label: 'temp one min',
    data: []
  },
  a0One: {
    label: 'V solar one min',
    data: []
  },
  tempFive: {
    label: 'temp thirty mins',
    data: []
  },
  a0Five: {
    label: 'V solar five mins',
    data: []
  },
  tempThirty: {
    label: 'temp thirty mins',
    data: []
  },
  a0Thirty: {
    label: 'V solar thirty mins',
    data: []
  },
}

const AXIS = [
  {primary: true, type: 'time', position: 'bottom'},
  {type: 'linear', position: 'left'}
];

const oneMin = 60 * 1000
const fiveMin = oneMin * 5;
const thirtyMin = oneMin * 30

export default class RecordsChart extends React.Component {

  constructor(props) {
    super(props);

    const series = {
      showPoints: true,
    };

    this.charts = {
      data: [],
      series: series,
      axes: AXIS
    }

    this.charts.data = [
      SERIES.a0One,
      SERIES.tempOne,
      SERIES.a0Five,
      SERIES.tempFive,
      SERIES.a0Thirty,
      SERIES.tempThirty,
    ]
  }

  updateChart(data) {
    //console.log('updateChart records: ', data)
    let series = {}
    let tempOne = [];
    let a0One = [];
    let tempFive = [];
    let a0Five = [];
    let tempThirty = [];
    let a0Thirty = [];

    this.latestTs = data.oneMin.timestamp

    let oneTs = data.oneMin.timestamp * 1000
    let fiveTs = data.fiveMins.timestamp * 1000
    let thirtyTs = data.thirtyMins.timestamp * 1000

    for (let i = 0; i < data.oneMin.vA0.length; i ++) {

      if (data.oneMin.temp[i])
        tempOne = tempOne.concat([[new Date(oneTs), data.oneMin.temp[i]]]);
      if (data.oneMin.vA0[i])
        a0One = a0One.concat([[new Date(oneTs), data.oneMin.vA0[i]]]);

      if (data.fiveMins.temp[i])
        tempFive = tempFive.concat([[new Date(fiveTs), data.fiveMins.temp[i]]]);
      if (data.fiveMins.vA0[i])
        a0Five = a0Five.concat([[new Date(fiveTs), data.fiveMins.vA0[i]]]);

      if (data.thirtyMins.temp[i])
        tempThirty = tempThirty.concat([[new Date(thirtyTs), data.thirtyMins.temp[i]]]);
      if (data.thirtyMins.vA0[i])
        a0Thirty = a0Thirty.concat([[new Date(thirtyTs), data.thirtyMins.vA0[i]]]);

      oneTs -= oneMin;
      fiveTs -= fiveMin;
      thirtyTs -= thirtyMin;
    }


    this.charts.data[0].data = a0One;
    this.charts.data[1].data = tempOne;
    this.charts.data[2].data = a0Five;
    this.charts.data[3].data = tempFive;
    this.charts.data[4].data = a0Thirty;
    this.charts.data[5].data = tempThirty;
  }

  render() {
    //console.log(this.props.records);
    if (typeof this.props.records === 'object') {
      this.updateChart(this.props.records);
    }

    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    let style = {
      backgroundColor: '#ffffff',
      height: '200px',
      width: '100%',
      marginBottom: 10
    };

    return (
      <div
        key={this.latestTs}
        /*instruct the charts to raw the first two times*/
        style={{
          height: window.constants.pageHeight,
          overflowY: "scroll"
        }}
      >
        {this.charts.data[0].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[0]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>
        {this.charts.data[1].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[1]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>
        {this.charts.data[2].label} - A2
        <div style={style}>
          <Chart
            data={[this.charts.data[2]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>
        {this.charts.data[3].label} - A3
        <div style={style}>
          <Chart
            data={[this.charts.data[3]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>
        {this.charts.data[4].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[4]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>
        {this.charts.data[5].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[5]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>
      </div>
    )
  }
}