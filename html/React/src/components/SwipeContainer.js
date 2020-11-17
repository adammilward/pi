import React from "react";
import Pages from "./Pages";

export default class SwipeContainer extends React.Component {

  scrolling;
  touching = false;

  constructor(props) {
    //console.log('SwipeContainter.constructor', props);
    super(props);
    this.state = {
      page: 0,
    }
  }

  setPage = (page) => {
    this.scrollTo(
      document.getElementById('container'),
      page
    )
  }

  handleScroll= (e) => {
    window.clearTimeout(this.scrolling);
    this.scrolling = true;
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      this.scrolling = false;
      this.scrollToNearest();
    }, 80)
  }

  scrollToNearest = () => {
    if (! this.touching && !this.scrolling) {
      let container = document.getElementById('container');
      let x = container.scrollLeft;
      let newPage = 0;
      let {numPages, windowWidth} = {...window.constants}

      while (newPage < (numPages - 1)) {
        if (x < (windowWidth * (newPage + 0.5))) {
          this.scrollTo(container, newPage);
          return;
        }
        newPage++;
      }
      this.scrollTo(container, newPage);
    }
  }

  scrollTo = (container, page) => {
    //console.log('scrollTo', container, page, x)
    let x = page * window.constants.windowWidth;
    if (page !== this.state.page) {
      this.setState({page: page})
      container.scrollTo(x, 0)
    } else {
      container.scrollTo(x, container.scrollTop)
    }
  }


  touchStart = (e) => {
    this.touching = true;
  }

  touchEnd = (e) => {
    this.touching = false;
    this.scrollToNearest();
  }

  render() {
    //console.log('SwipeContainter.render', this.props, this.state);
    let cons = window.constants;
    let {numPages, windowWidth} = {...cons};
    return (
      <>
        <div className="container" id='container'
             style={{
               //backgroundColor:'#cc0000',
               width: cons.windowWidth,
               height: window.outerHeight - 63,
               overflow: "scroll",
               scrollBehavior:"smooth",
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
               display: "inline-block",
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
    )
  }
}