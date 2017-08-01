import React, {Component} from 'react';

import Navbar from './Navbar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // Initial app information that will hold who the currentUser is, what messages have been sent 
    // and the amount of users online
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      count: 0,
      color: 'black'
    };

    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  componentDidMount(){
    const websocket = new WebSocket ('ws://0.0.0.0:3001');
    this.socket = websocket;

    websocket.onopen = (event) => {
    }

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        //Recieves an incoming message from the server to be displayed in the app
        case 'incomingMessage':
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages});
        break;
        //Recieves an incoming notification from the server to be displayed in the app
        case 'incomingNotification':
          const notifications = this.state.messages.concat(data);
          this.setState({messages: notifications});
        break;
        // Sets the state of the user count when the connection between the app and the server opens
        case 'clientCount':
          this.setState({count: data.count});
        break;
        // Sets the state of the user color when the connection between the app and the server opens
        case 'setUserColor':
          this.setState({color: data.color});
        break;
      // Errors are thrown if anything goes wrong on the opening of the websocket
      default:
        throw new Error('Unknown event type' + data.type);
      }
    }
  }
  //Sends a new message to the server when it is created and inputed into the app
  newMessage(msg) {
    const newMessage = {type: 'postMessage', id: msg.id, username: msg.name, content: msg.content};
    this.socket.send(JSON.stringify(newMessage));
  }
  //Sends a new user to the server when they are created and inputed into the app
  //Renders the notification that is displayed in the app when a new user is created
  newUser(username) {
    const notification = {type: 'postNotification', content: this.state.currentUser.name + ' has changed their name to ' + username}
    this.socket.send(JSON.stringify(notification));
    this.setState({currentUser: {name: username}});
  }

  render() {
    return (
      //Creates a connection between the App page and all the other pages and every function 
      // that interactes between the two
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
