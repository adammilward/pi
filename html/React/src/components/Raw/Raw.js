import React from "react";

export default class Raw extends React.Component {

  messagesEndRef = React.createRef()
  messageList = ''

  constructor(props) {
    //console.log('Raw.constroctor.props: ', props);
    super(props)

    this.props.api.addHandler('raw', this.handleRaw)
    this.props.api.addSentHandler(this.handleSent)
    this.props.api.addDefaultHandler(this.handleDefault)
    this.state = {
      response : '',
      request: 'report',
      messageList: ''
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

  handleRaw = (message) => {
    if (typeof message !== "string") {
      console.warn('raw message is not a string ', message)
    } else {
      this.setState((prevState) => {
        return {
          messageList: prevState.messageList +
            '\n-------- raw ----------\n'
            + message
        }
      })
    }
  }

  handleSent = (message) => {
    if (typeof message !== "string") {
      console.warn('sent message is not a string ', message)
    } else {
      this.setState((prevState) => {
        return {
          messageList: prevState.messageList +
            '\n++++++++ sent ++++++++\n'
            + message
        }
      })
    }
  }

  handleDefault = (type, message) => {
    console.log('unrecognised message: ', message)
    this.setState((prevState) => {
      return {
        messageList: prevState.messageList +
          '\n!!! unrecognised - "' + type + '" !!!\n'
          + 'type: ' + typeof message + '\n'
          + message
      }
    })
  }

  render() {
    //console.log('Raw.render, props ', this.props);

    return(
      <div style={{
        height: window.constants.pageHeight,
        overflowY: "scroll"
      }}>
        <input type='text'
               value={this.state.request}
               onChange={this.onChange} />
        <input type='submit' value='submit' onClick={this.submit}/>
        <div>
          <pre>
            {this.state.messageList}
          </pre>
        </div>
        <input type='text'
               value={this.state.request}
               onChange={this.onChange} />
        <input ref={this.messagesEndRef}
          type='submit' value='submit' onClick={this.submit}/>
      </div>
    )

  }
}