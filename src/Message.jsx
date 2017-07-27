import React, {Component} from 'react';

class Message extends Component {

  render() {

    return (
     <div className="message">
      <span className="message-time" title={this.props.timestamp.day}>{this.props.timestamp.time}</span>
      <span className="message-username" style={{color: this.props.color}}>{this.props.username}</span>
      <span className="message-content">{this.props.content}</span>
    </div>
    )
  }
}
export default Message;