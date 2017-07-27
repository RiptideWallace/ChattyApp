import React, {Component} from 'react';

class ChatBar extends Component {
   constructor() {
    super();

    this.onKeyPress = this.onKeyPress.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  onKeyPress(input){
    if (input.key === 'Enter') {
      console.log('Enter pressed');
      this.props.newMessage({name: this.props.currentUser.name, content: input.target.value});
      input.target.value = "";
    }
  }

  changeUser(input) {
    if (input.key === 'Enter') {
      console.log('User changed');
      this.props.newUser(input.target.value);
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Type in your name and hit ENTER" onKeyPress={this.changeUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onKeyPress}/>
      </footer>
    )
  }
}
export default ChatBar;