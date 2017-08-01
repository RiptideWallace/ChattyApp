import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      // This where the title of the app and users online is displayed
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
         <span className='user-count'>{this.props.count} Users Online </span>
      </nav>
    )
  }
}

export default Navbar;
