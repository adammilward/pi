import React from "react";
import Lights from './Lights/Lights';
import Status from "./Status/Status";
import Raw from "./Raw/Raw";

const numPages = 3;
const windowWidth = window.innerWidth;
const padding = 20;
const containerWidth = windowWidth * numPages;

export default class Pages extends React.Component {

  offset = -100;
  pages = ['lights', 'status', 'raw']


  constructor(props) {
    super(props);
    console.log('Pages::constroctor', props);
  }

  render() {
    return (
      <>
      <div className="container" id='container'
        style={{
          width: containerWidth * numPages,
          right: windowWidth * this.props.page,
        }}
      >
        <div
          id='lights'
          className='page padded'
          style={{
            width: windowWidth - padding,
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
            width: windowWidth - padding,
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
            width: windowWidth - padding,
          }}
        >
          <Raw
            {...this.props}
          />
        </div>
      </div>
        <div className='center padded'
          style={{
            width: (numPages * 4 + 'em'),
            position: "relative",
            left: ((numPages - this.props.page * 4) + 'em')
          }}
        >
          <span className={'padded ' + (this.props.page === 0 ? 'bold' : '')}
            onClick={() => this.props.setPage(0)}>
            lights
          </span>
          <span className={'padded ' + (this.props.page === 1 ? 'bold' : '')}
                onClick={() => this.props.setPage(1)}>

            status
          </span>
          <span className={'padded ' + (this.props.page === 2 ? 'bold' : '')}
                onClick={() => this.props.setPage(2)}>
            raw
          </span>
        </div>
      </>
    );
  }
}