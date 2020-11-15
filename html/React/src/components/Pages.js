import React from "react";
import Lights from './Lights/Lights';
import Status from "./Status/Status";
import Raw from "./Raw/Raw";

export default class Pages extends React.Component {

  offset = -100;
  pages = ['lights', 'status', 'raw']

  constructor(props) {
    console.log('Pages::constroctor', props);
    super(props);
  }

  render() {
    console.log('pages.rencer', this.props)
    let cons = window.constants;
    let {numPages, windowWidth} = {...cons};
    return (
      <div
        style={{
          //border: '1px solid white',
          backgroundColor:'#cc0000',
          width: cons.containerWidth,
          position:"relative",
        }}
      >
        <div
          id='lights'
          className='page padded'
          style={{
            width: cons.windowWidth - cons.padding,
          }}
        >
          <Lights
            api={this.props.api}
          />
        </div>
        <div
          id='status'
          className='page padded'
          style={{
            width: cons.windowWidth - cons.padding,
          }}
        >
          <Status
            {...this.props}
          />
        </div>
        <div
          id='raw'
          className='page padded'
          style={{
            width: cons.windowWidth - cons.padding,
          }}
        >
          <Raw
            {...this.props}
          />
        </div>
      </div>
    );
  }
}