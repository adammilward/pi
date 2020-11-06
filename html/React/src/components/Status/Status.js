import React from "react";
import { Chart } from 'react-charts'

export default class Status extends React.Component {

  constructor(props) {
    super(props);

    this.state.data = React.useMemo(
      () => [
        {
          label: 'Series 1',
          data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
        },
        {
          label: 'Series 2',
          data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
        }
      ],
      []
    )

    this.state.axes = React.useMemo(
      () => [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
      ],
      []
    )


  }


  render() {
    return(
      <div
        style={{
          width: '100%',
          height: '300px'
        }}
      >
        <Chart data={this.data} axes={this.state.axes} />
      </div>
    )

  }
}