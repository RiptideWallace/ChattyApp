import React, {Component} from 'react';

class ChatBar extends Component {
   constructor() {
    super();

    this.sendMessageOnEnter = this.sendMessageOnEnter.bind(this);
    this.changeUserOnEnter = this.changeUserOnEnter.bind(this);
  }
   // The action that is taken when the Enter key is pressed in the message box
   // Inputs whatever is typed in the message box to the app
  sendMessageOnEnter(input){
    if (input.key === 'Enter') {
      this.props.newMessage({name: this.props.currentUser.name, content: input.target.value});
      input.target.value = "";
    }
  }
   // The action that is taken when a new user is added or if a username is changed
   // When enter is pressed on the user box, the name typed in will be that users new name
  changeUserOnEnter(input) {
    if (input.key === 'Enter') {
      this.props.newUser(input.target.value);
    }
  }
  render() {
    return (
       //Applies the above functions into the app when the input boxes are interacted with
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Type in your name and hit ENTER" onKeyPress={this.changeUserOnEnter} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.sendMessageOnEnter}/>
      </footer>
    )
  }
}
export default ChatBar;
