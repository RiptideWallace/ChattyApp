import React, {Component} from 'react';

class ChatBar extends Component {
   constructor() {
    super();

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }

  onKeyPress(ent){
    if (ent.key === 'Enter') {
      console.log('Enter pressed');
      this.props.onNewMessage({name: this.props.currentUser.name, content: ent.target.value});
      ent.target.value = "";
    }
  }

  onUserChange(ent) {
    if (ent.key === 'Enter') {
      console.log('User changed');
      this.props.onNewUser(ent.target.value);
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} onKeyPress={this.onUserChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onKeyPress}/>
      </footer>
    )
  }
}
export default ChatBar;