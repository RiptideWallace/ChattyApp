import React, {Component} from 'react';

import Navbar from './Navbar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList form './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Test Text</h1>
        <Navbar/>
        <MessageList/>
        <ChatBar/>
      </div>
    );
  }
}
export default App;
