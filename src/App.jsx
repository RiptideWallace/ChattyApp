import React, {Component} from 'react';

import Navbar from './Navbar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }

  componentDidMount(){
    const websocket = new WebSocket ('ws://0.0.0.0:3001');
    this.socket = websocket;
    websocket.onopen = (event) => {
      console.log('Connected to server');
    }
    websocket.onmessage = (event) => {
      console.log('Incoming message', event.data);
      const incomingMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(incomingMessage);
      this.setState({messages: messages});
    }
  }

  onNewMessage(msg) {
    const newMessage = {id: msg.id, username: msg.name, content: msg.content};
    this.socket.send(JSON.stringify(newMessage));
  }

  onNewUser(username) {
    this.setState({currentUser: {name: username}});
  }

  render() {
    return (
      <div>
        <Navbar/>
        <MessageList messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser}
                 onNewUser = {this.onNewUser}
                 onNewMessage = {this.onNewMessage}/>
      </div>
    );
  }
}

export default App;
