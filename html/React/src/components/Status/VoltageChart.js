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
    label: '5v power',
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

const AXIS = [
  {primary: true, type: 'time', position: 'bottom'},
  {type: 'linear', position: 'left'}
];

export default class LiveChart extends React.Component {

  constructor(props) {
    super(props);

    const series = {
      showPoints: true,
    };

    this.liveCharts = {
      data: [],
      series: series,
      axes: AXIS
    }

    this.liveCharts.data = [
      SERIES.a0,
      SERIES.a1,
      SERIES.a2,
      SERIES.a3,
      SERIES.a4,
      SERIES.temp,
    ]
  }

  updateChart(data) {
    //console.log('updateChart data: ', data)
    let series = {}
    let temp = [];
    let a0 = [];
    let a1 = [];
    let a2 = [];
    let a3 = [];
    let a4 = [];

    data.map((datum) => {
      let time = new Date(datum.timestamp * 1000)
      a0 = a0.concat([[time, datum['a0']]])
      a1 = a1.concat([[time, datum['a1']]])
      a2 = a2.concat([[time, datum['a2']]])
      a3 = a3.concat([[time, datum['a3']]])
      a4 = a4.concat([[time, datum['a4']]]);
      temp= temp.concat([[time, datum['temp']]])
    })


    console.log(this.latestTs - (data[0] !== undefined ? data.[0].timestamp : 0));
    this.latestTs = (data[0] !== undefined) ? data.[0].timestamp : 0;

    this.liveCharts.data[0].data = a0
    this.liveCharts.data[1].data = a1
    this.liveCharts.data[2].data = a2
    this.liveCharts.data[3].data = a3
    this.liveCharts.data[4].data = a4
    this.liveCharts.data[5].data = temp
  }

  render() {
    //console.log(this.stuff.data);
    this.updateChart(this.props.liveData);

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
        {this.props.liveData.length} data points
        Everything
        <div style={style}>
          <Chart
            key={this.latestTs}
            data={[
              this.liveCharts.data[0],
              this.liveCharts.data[1],
              this.liveCharts.data[2],
              //this.charts.data[3],
              //this.charts.data[4],
              this.liveCharts.data[5]
            ]}
            series={this.liveCharts.series}
            axes={this.liveCharts.axes}
          />
        </div>
        {this.liveCharts.data[0].label} & {this.liveCharts.data[1].label} - A0, A1
        <div style={style}>
          <Chart
            key={this.latestTs}
            data={[this.liveCharts.data[0], this.liveCharts.data[1]]}
            series={this.liveCharts.series}
            axes={this.liveCharts.axes}
          />
        </div>
        {this.liveCharts.data[0].label} - A0
        <div style={style}>
          <Chart
            key={this.latestTs}
            data={[this.liveCharts.data[0]]}
            series={this.liveCharts.series}
            axes={this.liveCharts.axes}
          />
        </div>
        {this.liveCharts.data[1].label} - A1
        <div style={style}>
          <Chart
            key={this.latestTs}
            data={[this.liveCharts.data[1]]}
            series={this.liveCharts.series}
            axes={this.liveCharts.axes}
          />
        </div>
        {this.liveCharts.data[2].label} - A2
        <div style={style}>
          <Chart
            key={this.latestTs}
            data={[this.liveCharts.data[2]]}
            series={this.liveCharts.series}
            axes={this.liveCharts.axes}
          />
        </div>
        {this.liveCharts.data[3].label} & {this.liveCharts.data[4].label} - A3 A4
        <div style={style}>
          <Chart
            key={this.latestTs}
            data={[this.liveCharts.data[3], this.liveCharts.data[4]]}
            series={this.liveCharts.series}
            axes={this.liveCharts.axes}
          />
        </div>
        {this.liveCharts.data[5].label}
        <div style={style}>
          <Chart
            key={this.latestTs}
            data={[this.liveCharts.data[5]]}
            series={this.liveCharts.series}
            axes={this.liveCharts.axes}
          />
        </div>
      </div>
    )
  }
}