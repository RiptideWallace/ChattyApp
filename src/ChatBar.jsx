import React, {Component} from 'react';

class ChatBar extends Component {
   constructor() {
    super();

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(ent){
    if (ent.key === 'Enter') {
      console.log('Enter pressed');
      this.props.onNewMessage({name: this.props.currentUser.name, content: ent.target.value});
      ent.target.value = "";
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onKeyPress}/>
      </footer>
    )
  }
}
export default ChatBar;