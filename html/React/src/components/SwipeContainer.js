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

  componentDidMount() {
    //console.log('SwipeContainer.compoenentDidMount()')
    this.setPage(0);

    window.removeEventListener('resize', this.resizeHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  resizeHandler = () => {
    clearTimeout(window.resizeTimeout) // was being called twice some how
    window.resizeTimeout = setTimeout(() => {
      if (this.state.page !== window.constants.numPages - 1) {
        window.location.reload();
      }
    }, 200);
  }

  setPage = (page) => {
    //console.log('setPage', page)
    this.scrollTo(
      document.getElementById('viewPort'),
      page
    )
  }

  handleScroll = (e) => {
    //console.log('handleScroll')
    window.clearTimeout(this.scrolling);
    this.scrolling = true;
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      this.scrolling = false;
      this.scrollToNearest();
    }, 500) // increase time out if dodgey scrolling occurs
  }

  scrollToNearest = () => {
    //console.log('swipeContainer.scrollToNarest')
    if (!this.touching && !this.scrolling) {
      let viewPort = document.getElementById('viewPort');
      let x = viewPort.scrollLeft;
      let newPage = 0;
      let {numPages, windowWidth} = {...window.constants}

      while (newPage < (numPages - 1)) {
        if (x < (windowWidth * (newPage + 0.5))) {
          this.scrollTo(viewPort, newPage);
          return;
        }
        newPage++;
      }
      this.scrollTo(viewPort, newPage);
    }
  }

  scrollTo = (viewPort, page) => {
    //console.log('swipeContainer.scrollTo', viewPort, page)
    // todo request a page report here
    let x = page * window.constants.windowWidth;
    //console.log('SwipeContainer.scrollTo', viewPort, page, x)
    if (page !== this.state.page) {
      this.setState({
        page: page
      })
      this.requestPageData(page);
      viewPort.scrollTo(x, 0)
    } else {
      viewPort.scrollTo(x, 0)
    }
  }

  requestPageData = (page) => {
    switch(page) {
      case 0:
        this.props.api.send('s report 60');

        this.props.api.send('l report');
        break;
      case 1:
        this.props.api.send('s report 60');
        this.props.api.send('l report 0');

        this.props.api.send('s records');
        break;
      case 2:
        this.props.api.send('l report 0');

        this.props.api.send('s report 2');
        this.props.api.send('s records');
        break;
      case 3:
        this.props.api.send('l report 0');
        this.props.api.send('s report 60');

        this.props.api.send('t report');
        this.props.api.send('t heater');
        this.props.api.send('t water');
        this.props.api.send('t leds');

        break;
      case 4:
        this.props.api.send('s report 0');
        this.props.api.send('l report 0');
        break;
    }
  }

  touchStart = (e) => {
    this.touching = true;
    this.wasTouched = true;
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
        <div className="viewPort" id='viewPort'
             style={{
               //backgroundColor:'#cc0000',
               width: cons.windowWidth,
               height: window.innerHeight - 70,
               overflowX: "scroll",
               overflowY: "hidden",
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
               left: ((-100/numPages * this.state.page / 3 + 30) + '%')
             }}
        >
          <span className={'paginator ' + (this.state.page === 0 ? 'bold' : '')}
                onClick={() => this.setPage(0)}>
            lights&nbsp;
          </span>
          <span className={'paginator ' + (this.state.page === 1 ? 'bold' : '')}
                onClick={() => this.setPage(1)}>

            records&nbsp;
          </span>
          <span className={'paginator ' + (this.state.page === 2 ? 'bold' : '')}
                onClick={() => this.setPage(2)}>

            status&nbsp;
          </span>
          <span className={'paginator ' + (this.state.page === 3 ? 'bold' : '')}
                onClick={() => this.setPage(3)}>

            time&nbsp;
          </span>
          <span className={'paginator ' + (this.state.page === 4 ? 'bold' : '')}
                onClick={() => this.setPage(4)}
          >
            raw
          </span>
        </div>
      </>
    )
  }
}