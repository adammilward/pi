import React from "react";

export default class FadeButton extends React.Component {

  constructor(props) {
    super(props);
  }

  radio = () => {
    console.log(this);
    this.props.radio(this.props.value)
  };

  render() {
    return(
      <span>
        {this.props.name}
        <input name='fadeMode'
               onChange={this.radio}
               checked={this.props.checked}
               type="radio"
        />
      </span>
    )

  }
}