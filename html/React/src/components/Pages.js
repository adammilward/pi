import React from "react";
import Lights from './Lights/Lights';
import Status from "./Status/Status";
import Raw from "./Raw/Raw";



export default class Pages extends React.Component {

  offset = -100;
  pages = ['lights', 'status', 'raw']

  constructor(props) {
    super(props);
    console.log('Pages::constroctor', props);
  }

  render() {
    let cons = window.constants;
    let {numPages, windwoWidth} = {...cons};
    return (
      <>
      <div className="container" id='container'
        style={{
          width: cons.containerWidth * cons.numPages,
          right: cons.windowWidth * this.props.page,
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
            {...this.props}
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
        <div className='center'
          style={{
            display: "inline-block",
            //border: '1px solid white',
            position: "relative",
            padding: 0,
            left: ((numPages * 3 - this.props.page * 2) + 'em')
          }}
        >
          <span className={' ' + (this.props.page === 0 ? 'bold' : '')}
            onClick={() => this.props.setPage(0)}>
            lights&nbsp;
          </span>
          <span className={' ' + (this.props.page === 1 ? 'bold' : '')}
                onClick={() => this.props.setPage(1)}>

            status&nbsp;
          </span>
          <span className={' ' + (this.props.page === 2 ? 'bold' : '')}
                onClick={() => this.props.setPage(2)}>
            raw
          </span>
        </div>
      </>
    );
  }
}