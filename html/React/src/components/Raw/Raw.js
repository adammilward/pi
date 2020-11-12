import React from "react";

export default class Raw extends React.Component {

  constructor(props) {
    super(props)
    this.state = {response : ''};
  }


  render() {
    return(
      <div>
        <input type='text' defaultValue='report'/>
        <input type='submit' value='submit' onClick={this.submit}/>
        <div>
          {this.state.response}
        </div>
      </div>
    )

  }
}