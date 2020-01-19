import React from "react";

export default class Joke extends React.Component{

  constructor() {
    super();
    this.state = {
      answer: 'yes'
    };
  }

  render() {
    return (
      <div>
        {(this.props.question ? <p>q: {this.props.question}</p> : '')}
        <p>a: {this.props.answer}</p>
        <p>Is state important? {this.state.answer}</p>
      </div>
    );
  }
}