export default class Time extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      on: false
      , r: 0
      , g: 0
      , b: 0
      , l: 1
      , u: MAX_POW
      , lightMode: [0, 3]
      , delay: 0
      , fadeDelay: 0
      , reportDelay: 0
      , count: 0
    };

    //this.props.api.addHandler('lights', this.handleData)
    this.sendRequest('lights report');
    this.dragHold = this.dragHold.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }
}