import React from "react";
import Slider from './Slider'
import LightsFade from './LightsFade'

export default class LightsOn extends React.Component{

  componentDidMount() {
    //funct is only called once when the component is mounted
    // and not called on reRendering, ie when updating state
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // return true or false
    return false;
  }

  componentWillUnmount() {
    //tare down or clean up code, eg remove event listeners
  }

  func = function () {
    console.log('func, this', this);
  };

  bottomSlid = (value, name) => {
    console.log('bottomSlid, value', value, name);
  };

  render() {
    return (
      <div className="lights" id='lights'>
        <Slider
          name={'r'}
          value={this.props.r}
          color={'#f00'}
          getColor={function (power) {
            return 'rgb(' + Math.round(power * 2.55) + ', 0, 0)';
          }}
        />
        <Slider
          name={'g'}
          value={this.props.g}
          color={'#0f0'}
          getColor={function (power) {
            return 'rgb(0, ' + Math.round(power * 2.55) + ', 0)';
          }}
          slid={this.slid}
        />
        <Slider
          name={'b'}
          value={this.props.b}
          color={'#00f'}
          getColor={function (power) {
            return 'rgb(0, 0, ' + Math.round(power * 2.55) + ')';
          }}
          slid={this.slid}
        />
        <LightsFade
          fadeOn={this.props.fadeOn}
          fadeMode={this.props.fadeMode}
          bottomSlid={this.bottomSlid}
        />
      </div>
    );
  }
}