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
  }

  setPage = (page) => {
    console.log(page, this)
    this.setState({page: page});
  }


  render() {
    console.log('SwipoContainer.rendr, state, props',this.state, this.props)
    return (
      <ReactSwipeEvents>
        <Pages
          {...this.props}
          page={this.state.page}
          setPage={this.setPage}
        />
      </ReactSwipeEvents>
    )
  }
}