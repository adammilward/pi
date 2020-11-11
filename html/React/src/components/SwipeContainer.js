import React from "react";
import ReactSwipeEvents from 'react-swipe-events'
import Pages from "./Pages";

export default class SwipeContainer extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
  }



  render() {
    return (
      <ReactSwipeEvents>
        <Pages
          {...this.props}
        />
      </ReactSwipeEvents>
    )
  }
}