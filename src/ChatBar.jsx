import React, {Component} from 'react';

class ChatBar extends Component {
   constructor() {
    super();

    this.sendMessageOnEnter = this.sendMessageOnEnter.bind(this);
    this.changeUserOnEnter = this.changeUserOnEnter.bind(this);
  }

  sendMessageOnEnter(input){
    if (input.key === 'Enter') {
      this.props.newMessage({name: this.props.currentUser.name, content: input.target.value});
      input.target.value = "";
    }
  }

  changeUserOnEnter(input) {
    if (input.key === 'Enter') {
      this.props.newUser(input.target.value);
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Type in your name and hit ENTER" onKeyPress={this.changeUserOnEnter} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.sendMessageOnEnter}/>
      </footer>
    )
  }
}
export default ChatBar;