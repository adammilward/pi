import React from "react";
import Lights from './Lights/Lights';
import Status from "./Status/Status";
import Raw from "./Raw/Raw";
import Time from "./Time/Time"
import Records from "./Records/Records"

export default class Pages extends React.Component {

  offset = -100;
  pages = ['lights', 'records', 'status', 'time', 'raw']

  constructor(props) {
    super(props);
  }

  render() {
    //console.log('Pages.render, props, lastMessage ', this.props, this.props.lastMessage)
    let cons = window.constants;
    let {numPages, windowWidth} = {...cons};
    return (
      <div
        id={'container'}
        style={{
          overflow: "hidden",
          width: cons.containerWidth,
          position:"relative",
        }}
      >
        <div
          id='lights'
          className='page padded'
          style={{
            width: cons.windowInnerWidth,
          }}
        >
          <Lights
            active={0 === this.props.page}
            api={this.props.api}
          />
        </div>
        <div
          id='status'
          className='page padded'
          style={{
            overflow: "hidden",
            width: cons.windowInnerWidth,
          }}
        >
          <Records
            {...this.props}
            active={1 === this.props.page}
          />
        </div>
        <div
          id='status'
          className='page padded'
          style={{
            overflow: "hidden",
            width: cons.windowInnerWidth,
          }}
        >
          <Status
            {...this.props}
            active={2 === this.props.page}
          />
        </div>
        <div
          id='time'
          className='page padded'
          style={{
            overflow: "hidden",
            width: cons.windowInnerWidth,
          }}
        >
          <Time
            {...this.props}
            active={3 === this.props.page}
          />
        </div>
        <div
          id='raw'
          className='page padded'
          style={{
            overflow: "hidden",
            width: cons.windowInnerWidth,
          }}
        >
          <Raw
            {...this.props}
            active={4 === this.props.page}
          />
        </div>
      </div>
    );
  }
}