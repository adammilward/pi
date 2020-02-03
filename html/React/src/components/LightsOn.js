import React from "react";
import Slider from './Slider'
import LightsFade from './LightsFade'

export default class LightsOn extends React.Component{

  constructor(props) {
    super(props);
    this.state = props;
  }

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

  slid = (value, name) =>  {
    //console.log('Lights slid, value name', value, name);
    //console.log(this);
/*    this.setState((state, props) => {
      console.log('Lights::slid setState, state, props', state, props);
      return state ;
    })*/
  };

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
          value={this.state.power.r}
          color={'#f00'}
          getColor={function (power) {
            return 'rgb(' + Math.round(power * 2.55) + ', 0, 0)';
          }}
          slid={this.slid}
        />
        <Slider
          name={'g'}
          value={this.state.power.g}
          color={'#0f0'}
          getColor={function (power) {
            return 'rgb(0, ' + Math.round(power * 2.55) + ', 0)';
          }}
          slid={this.slid}
        />
        <Slider
          name={'b'}
          value={this.state.power.b}
          color={'#00f'}
          getColor={function (power) {
            return 'rgb(0, 0, ' + Math.round(power * 2.55) + ')';
          }}
          slid={this.slid}
        />
        <LightsFade
          fadeOn={this.state.fadeOn}
          fadeMode={this.state.fadeMode}
          bottomSlid={this.bottomSlid}
        />
      </div>
    );
  }
}