import React from 'react'
import { Chart } from 'react-charts'

const SERIES = {
  timestamp: {
    label: 'timestamp',
    data: []
  },
  temp: {
    label: 'temp',
    data: []
  },
  a0: {
    label: 'solar panels',
    data: []
  },
  a1: {
    label: 'consumer unit',
    data: []
  },
  a2: {
    label: 'a2',
    data: []
  },
  a3: {
    label: 'heater wire',
    data: []
  },
  a4: {
    label: 'heater relay',
    data: []
  }
}

export default class MyChart extends React.Component {

  constructor(props) {
    super(props);

    let now = new Date(1604685600000);

    const data = [
      {
        label: 'Series 1',
        data: [
          [now.getTime(), 12.3],
          [new Date(now.getTime() + 10000), 12.4],
          [new Date(now.getTime() + 20000), 12.7],
          [new Date(now.getTime() + 30000), 12.1],
          [new Date(now.getTime() + 40000), 12.2],
          [new Date(now.getTime() + 50000), 12.2],
          //new Date(now.getTime() + 1000) + 1000, 12.4
        ]
      },
      {
        label: 'Series 2',
        data: [
          [now.getTime(), 13.3],
          [new Date(now.getTime() + 10000), 13.4],
          [new Date(now.getTime() + 20000), 13.7],
          [new Date(now.getTime() + 30000), 13.1],
          [new Date(now.getTime() + 40000), 13.2],
          [new Date(now.getTime() + 50000), 13.2],
        ]
      }
    ];

    const series = {
      showPoints: true,
    };

    const axes = [
      {primary: true, type: 'time', position: 'bottom'},
      {type: 'linear', position: 'left'}
    ];

    this.state = {
      data: data,
      series: series,
      axes: axes
    }

    this.stuff = {
      data: [],
      series: series,
      axes: axes
    }
  }

  updateChart(data) {
    //console.log('updateChart data: ', data)
    let series = {}
    let a0 = [];
    let a1 = [];

    data.map((datum) => {
      let time = new Date(datum.timestamp * 1000)

      a0 = a0.concat([[time, datum['a0']]])
      a1 = a1.concat([[time, datum['a1']]])
    })

    this.stuff.data = [
      SERIES.a0,
      SERIES.a1,
    ]

    this.stuff.data[0].data = a0
    this.stuff.data[1].data = a1

    //console.log('charts: ', this.stuff);
    //console.log('example chart: ', this.state);

    // let series1 = data.map((datum) => {
    //   let time = new Date(datum.timestamp * 1000)
    //   return [time, datum['a1']]
    // })
    //
    // let series2 = data.map((datum) => {
    //   let time = new Date(datum.timestamp * 1000)
    //   return [time, datum['a2']]
    // })
    //
    // let series3 = data.map((datum) => {
    //   let time = new Date(datum.timestamp * 1000)
    //   return [time, datum['a3']]
    // })
    //
    // let series4 = data.map((datum) => {
    //   let time = new Date(datum.timestamp * 1000)
    //   return [time, datum['a4']]
    // })

    //console.log(series0);
    //console.log(series1);
    //this.stuff.charts[2].data = series2;
    //this.stuff.charts[3].data = series3;
    //this.stuff.charts[4].data = series4;

    //console.log(this.stuff.charts);
  }

  render() {
    //console.log(this.props);
    this.updateChart(this.props.data);

    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    return (
      <div
        style={{
          height: window.constants.pageHeight,
          overflowY: "scroll"
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            height: '400px',
            width: '100%'
          }}
        >
          <Chart data={this.stuff.data} series={this.stuff.series} axes={this.stuff.axes}
          key={this.props.data.length}/>
          {this.props.data.length}
        </div>
        <br/>
        <div
          style={{
            backgroundColor: '#ffffff',
            height: '400px',
            width: '100%'
          }}
        >
          <Chart data={this.state.data} series={this.state.series} axes={this.state.axes}/>
        </div>
      </div>
    )
  }
}