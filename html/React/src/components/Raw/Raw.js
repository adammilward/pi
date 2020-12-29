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
    this.scrollToBottom();
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
    this.scrollToBottom();
  }

  handleDefault = (type, message) => {
    console.log('unrecognised message: ', type, message)
    this.setState((prevState) => {
      return {
        messageList: prevState.messageList +
          '\n!!! unrecognised - "' + type + '" !!!\n'
          + 'type: ' + typeof message + '\n'
          + message
      }
    })
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.props.active && this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView('smooth')
    }
  }

  clear = () => {
    this.setState({messageList: ''})
  }

  render() {
    //console.log('Raw.render, props ', this.props);

    return(
      <form style={{
        height: window.constants.pageHeight,
        overflowY: "scroll"
      }}
      onSubmit={(e) => e.preventDefault()}
      >
        <input type='text'
               value={this.state.request}
               onChange={this.onChange} />
        <input type='submit' value='submit' onClick={this.submit}/>
        <input type='button' value='X' className='right' onClick={this.clear} />
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
        <input type='button' value='X' className='right' onClick={this.clear} />
      </form>
    )

  }
}