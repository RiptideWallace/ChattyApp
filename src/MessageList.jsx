import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    const messages = this.props.messages.map(message => {
        if(message.type === 'incomingNotification') {
          return (<div className="message system">
            {message.content}
          </div>)
        } else {
          console.log(message)
          return (<Message
            key={ message.id }
            timestamp={message.timestamp}
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