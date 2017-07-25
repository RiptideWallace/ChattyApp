import React, {Component} from 'react';

import Navbar from './Navbar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Hello"
        },
        {
          id: 2,
          username: "Steve",
          content: "Hi there"
        }
      ]
    };
  }
  componentDidMount(){

  }

  render() {
    return (
      <div>
        <Navbar/>
        <MessageList messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
