import React from "react";

export default class Raw extends React.Component {

  constructor(props) {
    console.log('Raw.constroctor.props: ', props);
    super(props)
    this.state = {
      response : '',
      request: 'report'
    };
  }

  submit = (event, a, b) => {
    this.props.api.send(this.state.request);
  }

  onChange = (e) => {
    this.setState({
      request: e.target.value
    })
  }

  render() {
    return(
      <div>
        <input type='text'
               value={this.state.request}
               onChange={this.onChange} />
        <input type='submit' value='submit' onClick={this.submit}/>
        <div>
          {this.state.response}
        </div>
      </div>
    )

  }
}