import React from 'react';
import {Range, getTrackBackground} from "react-range";
import Api from '../utils/Api'

const STEP = 0.01;
const MIN = 0;
const MAX = 255;

class Slider extends React.Component {

  isDragged = false;
  api = new Api();

  constructor(props) {
    super(props);
    this.state = {
      values: [this.props.value]
    };
  }

  actionDragged(isDragged, one, two) {
    // send the data when finished dragging
    // when isDragged becomes false, and was dragged is true
    if (! isDragged) {
      if (this.isDragged) {
        this.props.actionDragged(this.state.values[0], this.props.name);
      }
    }
    this.isDragged = isDragged;
    this.props.dragHold(isDragged);
  };

  slid(value) {
    if ('undefined' !== this.props.allowedmax && value > this.props.allowedmax) {
      value = this.props.allowedmax;
    }
    if (this.props.allowedmin && value < this.props.allowedmin) {
      value = this.props.allowedmin;
    }
    this.setState({values: [value]});
  }

  render() {
    //console.log(MIN);
    return (
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "10px"
        }}
      >
        <Range
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={this.props.rangemax || MAX}
          onChange={values => this.slid(values[0], this.props.name)}
          renderTrack={({props, children}) => (
            <div
              style={{
                ...props.style,
                height: "12px",
                display: "flex",
                width: "calc(100% - 5em)"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "4px",
                  width: "100%",
                  borderRadius: "2px",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: [this.props.color, "#999"],
                    min: MIN,
                    max: this.props.rangemax || MAX
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({props, isDragged}) => (
            <div

              {...props}
              onTouchEnd={this.actionDragged(isDragged)}
              style={{
                ...props.style,
                height: "30px",
                width: "20px",
                borderRadius: "2px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA"
              }}
            >
              <div

                style={{
                  height: "50%",
                  width: "40%",
                  backgroundColor: isDragged ? this.props.getColor(this.state.values[0]) : this.props.color
                }}
              />
            </div>
          )}
        />
        <output className="right"
            style={{
              margin: "0px 0px 0px 10px",
              width: '4em',
          }} id="output">
          {
            this.state.values[0].toFixed(1)
          }
        </output>
      </div>
    );
  }
}

export default Slider