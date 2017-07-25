import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="messages">

        {this.props.messages.map( (message) =>
          <Message key={message.id} msg={message}/>
        )}

      </main>
    )
  }
}
export default MessageList;