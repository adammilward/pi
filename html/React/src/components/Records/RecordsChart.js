import React from 'react'
import { Chart } from 'react-charts'

const SERIES = {
  a0One: {
    label: 'V solar 1min',
    data: []
  },
  a1One: {
    label: 'V consumer 1min',
    data: []
  },
  tempOne: {
    label: 'temp 1min',
    data: []
  },
  a0Five: {
    label: 'V solar 5mins',
    data: []
  },
  a1Five: {
    label: 'V consumer 5mins',
    data: []
  },
  tempFive: {
    label: 'temp 5mins',
    data: []
  },
  a0Thirty: {
    label: 'V solar 30mins',
    data: []
  },
  a1Thirty: {
    label: 'V consumer 30mins',
    data: []
  },
  tempThirty: {
    label: 'temp 30mins',
    data: []
  },
}

const AXIS = [
  {primary: true, type: 'time', position: 'bottom'},
  {type: 'linear', position: 'left'}
];

const numSignals = 3;

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
      SERIES.a1One,
      SERIES.tempOne,

      SERIES.a0Five,
      SERIES.a1Five,
      SERIES.tempFive,

      SERIES.a0Thirty,
      SERIES.a1Thirty,
      SERIES.tempThirty,

    ]
  }

  updateChart(data) {
    console.log('updateChart records: ', data)
    let series = {}
    let one = [[],[],[]];
    let five = [[],[],[]];
    let thirty = [[],[],[]];

    this.latestTs = data.oneMin.timestamp

    let oneTs = data.oneMin.timestamp * 1000
    let fiveTs = data.fiveMins.timestamp * 1000
    let thirtyTs = data.thirtyMins.timestamp * 1000

    for (let i = 0; i < data.oneMin.values[0].length; i ++) {

      for(let s = 0; s < numSignals; s ++) {
        if (data.oneMin.values[s][i])
          one[s] = one[s].concat([[new Date(oneTs), data.oneMin.values[s][i]]]);
      }

      for(let s = 0; s < numSignals; s ++) {
        if (data.fiveMins.values[s][i])
          five[s] = five[s].concat([[new Date(fiveTs), data.fiveMins.values[s][i]]]);
      }

      for(let s = 0; s < numSignals; s ++) {
        if (data.thirtyMins.values[s][i])
          thirty[s] = thirty[s].concat([[new Date(thirtyTs), data.thirtyMins.values[s][i]]]);
      }

      oneTs -= oneMin;
      fiveTs -= fiveMin;
      thirtyTs -= thirtyMin;
    }


    this.charts.data[0].data = one[0];
    this.charts.data[1].data = one[1];
    this.charts.data[2].data = one[2];

    this.charts.data[3].data = five[0];
    this.charts.data[4].data = five[1];
    this.charts.data[5].data = five[2];

    this.charts.data[6].data = thirty[0];
    this.charts.data[7].data = thirty[1];
    this.charts.data[8].data = thirty[2];

    console.log(this.charts);
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

        /*instruct the charts to raw the first two times*/
        style={{
          height: window.constants.pageHeight,
          overflowY: "scroll"
        }}
      >
        {this.charts.data[0].label} & {this.charts.data[1].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[0], this.charts.data[1]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>
        {this.charts.data[2].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[2]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>

        {this.charts.data[4].label} & {this.charts.data[5].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[4], this.charts.data[5]]}
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

        {this.charts.data[6].label} & {this.charts.data[7].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[6], this.charts.data[7]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>
        {this.charts.data[8].label}
        <div style={style}>
          <Chart
            data={[this.charts.data[8]]}
            series={this.charts.series}
            axes={this.charts.axes}
          />
        </div>

      </div>
    )
  }
}