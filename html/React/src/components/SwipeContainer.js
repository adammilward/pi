import React from "react";
import ReactSwipeEvents from 'react-swipe-events'
import Pages from "./Pages";

export default class SwipeContainer extends React.Component {

  isScrolling;
  touching = false;

  constructor(props) {
    console.log('SwipeContainter.constructor', props);
    super(props);
    this.state = {
      page: 0,
      right: 0,
      swipeProps: this.swipeProps,
    }
    console.log(props);
  }

  setPage = (page) => {
    console.log('setPage', page);
    console.log(page, this)
    this.setState({
      page: page,
      right: window.constants.windowWidth * page,
    });
  }

  setRight = (deltaR) => {
    //console.log(deltaR);
    let right = this.state.right - deltaR;
    this.setState({
      right: (right > 0 ? right : 0),
    })
  }


  handleScroll= (e) => {
    console.log('scroll', e);
    let container = e.target;
    console.log('scrollHeight', container.scrllHeight);
    console.log('scrollWidth', container.scrollWidth);
    console.log(container.scrollLeft);
    console.log(container.scrollTop);

    window.clearTimeout(this.isScrolling);

    this.scrollTimeoug = setTimeout(() => {
      this.isScrolling = false;
      this.handleScrollFinish(container);
    }, 2000)
    this.isScrolling = true;

    /*this.setState({
      right: element.scrollLeft,
    })*/
  }

  handleScrollFinish = (container) => {
    if (! this.touching && !this.isScrolling) {
      container.scrollLeft = 0;
      container.scrollTop = 0;
    }
  }

  touchStart = (e) => {
    console.log('touchStart', e);
    this.touching = true;
  }

  touchEnd = (e) => {
    this.touching = false;
    this.handleScrollFinish(e.target)
  }

  render() {
    console.log('SwipeContainter.render', this.props, this.state);
    let cons = window.constants;
    let {numPages, windowWidth} = {...cons};
    return (
      /*<ReactSwipeEvents
        //threshold='1000000'
        onSwiping = {this.onSwiping}
        onSwiped = {this.onSwiped}
        onSwipedRight = {this.onSwipedRight}
        onSwipedLeft ={this.onSwipedLeft}
        onSwipedDown = {this.onSwipedDown}
        onSwipedUp = {this.onSwipedUp}
      >*/
      <>
        <div className="container" id='container'
             style={{
               backgroundColor:'#cc0000',
               width: cons.containerWidth,
               height: window.outerHeight - 63,
               overflow: "scroll",
             }}
             onScroll={this.handleScroll}
             onTouchStart={this.touchStart}
             onMouseDown={this.touchStart}
             onTouchEnd={this.touchEnd}
             onMouseUp={this.touchEnd}
        >
          <Pages
            {...this.props}
            swiper={{
              setActive: this.setActive
            }}
            page={this.state.page}
            right={this.state.right}
            setPage={this.setPage}
          />
        </div>
        <div className='center'
             style={{
               backgroundColor:'#00aa00',
               display: "inline-block",
               //border: '1px solid white',
               position: "relative",
               padding: 0,
               left: ((numPages * 2.75 - this.state.page * 2) + 'em')
             }}
        >
              <span className={'paginator ' + (this.state.page === 0 ? 'bold' : '')}
                    onClick={() => this.setPage(0)}>
                lights&nbsp;
              </span>
          <span className={'paginator ' + (this.state.page === 1 ? 'bold' : '')}
                onClick={() => this.setPage(1)}>

                status&nbsp;
              </span>
          <span className={'paginator ' + (this.state.page === 2 ? 'bold' : '')}
                onClick={() => this.setPage(2)}>
                raw
              </span>
        </div>
      </>
      /*</ReactSwipeEvents>*/
    )
  }
}