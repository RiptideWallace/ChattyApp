import React, {Component} from 'react';

import Navbar from './Navbar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Message/>
        <MessageList/>
        <ChatBar/>
      </div>
    );
  }
}
export default App;
