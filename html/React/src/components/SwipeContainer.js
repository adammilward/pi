import React from "react";
import ReactSwipeEvents from 'react-swipe-events'
import Pages from "./Pages";

export default class SwipeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      right: 0,
    }
    console.log(props);

  }

  setPage = (page) => {
    console.log(page, this)
    this.setState({
      page: page,
      right: window.constants.windowWidth * page,
    });
  }

  setRight = (deltaR) => {
    console.log(deltaR);
    let right = this.state.right - deltaR / 20;
    this.setState({
      right: (right > 0 ? right : 0),
    })
  }

  setUp = () => {

  }

  onSwiping = (a, b, c, d, e) => {
    console.log('onSwiping', a, b, c, d, e);
    this.setRight(d - b);
    this.setUp(d - b);
  }

  onSwiped = (a, b, c, d, e, f, g) => {
    //console.log('onSwiped', a, b, c, d, e, f, g);
  }

  onSwipedUp = (a, b, c) => {
    //console.log('onSwipedUp', a, b, c);
  }

  onSwipedDown = (a, b, c) => {
    //console.log('onSwipedDown', a, b, c);
  }

  onSwipedLeft = (a, b, c) => {
    //console.log('onSwipedLeft', a, b, c);
  }

  onSwipedRight = (a, b, c) => {
    //console.log('onSwipedRight', a, b, c);
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
          right={this.state.right}
          setPage={this.setPage}
        />
      </ReactSwipeEvents>
    )
  }
}