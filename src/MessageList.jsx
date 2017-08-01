import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    // This code does a loop through all the messages and applies the below keys to them
    // If a message is recognized as a notification, the styling of "message system"(italics) is applied
    const messages = this.props.messages.map(message => {
      if(message.type === 'incomingNotification') {
        return (<div className="message system" key={message.id}>{message.content}</div>)
      } else {
        return (<Message
          key={ message.id }
          color={message.color}
          username ={ message.username }
          content={ message.content } />)
        }
    });

    return (
      <main className="messages">
        { messages }
      </main>
    )
  }
}
export default MessageList;
