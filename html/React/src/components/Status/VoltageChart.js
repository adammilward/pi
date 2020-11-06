import React from 'react'
import { Chart } from 'react-charts'

export default function MyChart() {
  let now = new Date(1604685600000);
  console.log(now.getTime());
  const data = React.useMemo(
    () => [
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
    ],
    []
  )
  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: '400px'
      }}
    >
      <Chart data={data} series={series} axes={axes} />
    </div>
  )

  return (
    <div>
      {lineChart}
    </div>
  )
}