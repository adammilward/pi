import React from 'react';
import {Range, getTrackBackground} from "react-range";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

class Slider extends React.Component {

  constructor(props) {
    super(props);
    console.log('Lights props', props);

    this.state = {
      values: [this.props.value]
    };
  }

  componentDidMount() {
    // use this function to do an api call get the initial state
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // use this to run something when the component is updated
  }

  slid(value) {
    if ('undefined' !== this.props.max && value > this.props.max) {
      value = this.props.max;
    }
    if (this.props.min && value < this.props.min) {
      value = this.props.min;
    }
    console.log(value);
    this.props.slid(value, this.props.name);
    this.setState({values: [value]});
  }

  render() {
    console.log(MIN);
    //console.log('slider render state', this.state, this.props);
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
          max={MAX}
          onChange={values => this.slid(values[0], this.props.name)}
          renderTrack={({props, children}) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
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
                    max: MAX
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
          {this.props.displayValue ?
            this.props.displayValue(this.state.values[0]) :
            this.state.values[0].toFixed(1)
          }
        </output>
      </div>
    );
  }
}

export default Slider