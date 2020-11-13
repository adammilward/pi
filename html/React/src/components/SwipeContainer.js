import React from "react";
import ReactSwipeEvents from 'react-swipe-events'
import Pages from "./Pages";

export default class SwipeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    }
    console.log(props);

    this.onSwiped.bind(this)
  }

  setPage = (page) => {
    console.log(page, this)
    this.setState({page: page});
  }

  onSwiping = (a, b, c, d, e) => {
    console.log('onSwiping', a, b, c, d, e);
  }

  onSwiped = (a, b, c, d, e, f, g, h) => {
    console.log('onSwiped', a, b, c, d, e, f, g, h);
  }

  onSwipedUp = (a, b, c, d, e) => {
    console.log('onSwipedUp', a, b, c, d, e);
  }

  onSwipedDown = (a, b, c, d, e) => {
    console.log('onSwipedDown', a, b, c, d, e);
  }

  onSwipedLeft = (a, b, c, d, e) => {
    console.log('onSwipedLeft', a, b, c, d, e);
  }

  onSwipedRight = (a, b, c, d, e) => {
    console.log('onSwipedRight', a, b, c, d, e);
  }

  render() {
    console.log('SwipoContainer.rendr, state, props',this.state, this.props)
    return (
      <ReactSwipeEvents
        onSwiping = {this.onSwiping}
        onSwiped = {this.onSwiped}
        onSwipedRight = {this.onSwipedRight}
        onSwipedLeft ={this.onSwipedLeft}
        onSwipedDown = {this.onSwipedDown}
        onSwipedUp = {this.onSwipedUp}
      >
        <Pages
          {...this.props}
          page={this.state.page}
          setPage={this.setPage}
        />
      </ReactSwipeEvents>
    )
  }
}