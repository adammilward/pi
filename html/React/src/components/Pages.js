import React from "react";
import Lights from './Lights/Lights';
import Status from "./Status/Status";

const pages = 2;
const containerWidth = pages * 100 + "%";
const pageWidth = 'calc(' + 100 / pages + '% - 20px)';

export default class Pages extends React.Component {

  offset = -100;

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className="container" id='container'
        style={{
          width: containerWidth,
          left: this.offset,
        }}
      >
        <div
          id='lights'
          className='page padded'
          style={{
            width: pageWidth,
          }}
        >
          <Lights
            {...this.props}
          />
        </div>
        <div
          id='status'
          className='page padded'
          style={{
            width: pageWidth,
          }}
        >
          <Status
            {...this.props}
          />
        </div>
      </div>
    );
  }
}