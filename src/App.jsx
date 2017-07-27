import React, {Component} from 'react';

import Navbar from './Navbar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      messages: [],
      count: 0
    };

    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  componentDidMount(){
    const websocket = new WebSocket ('ws://0.0.0.0:3001');
    this.socket = websocket;
    websocket.onopen = (event) => {
      console.log('Connected to server');
    }
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      switch(data.type) {
        case 'incomingMessage':
        console.log('Incoming message', data);
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      break;

        case 'incomingNotification':
          console.log('Incoming notification', data);
          const notifications = this.state.messages.concat(data);
          this.setState({messages: notifications});
        break;

        case 'clientCount':
          this.setState({count: data.count});
        break;

      default:
        throw new Error('Unknown event type' + data.type);
      }
    }
  }
  newMessage(msg) {
    const newMessage = {type: 'postMessage', id: msg.id, username: msg.name, content: msg.content};
    this.socket.send(JSON.stringify(newMessage));
  }

  newUser(username) {
    const notification = {type: 'postNotification', content: this.state.currentUser.name + ' has changed their name to ' + username}
    this.socket.send(JSON.stringify(notification));
    this.setState({currentUser: {name: username}});
  }

  render() {
    return (
      <div>
        <Navbar count = {this.state.count}/>
        <MessageList  notification = {this.state.notification}
                      messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser}
                 newUser = {this.newUser}
                 newMessage = {this.newMessage}/>
      </div>
    );
  }
}

export default App;