import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
         <span className='user-count'>{this.props.count} Users Online </span>
      </nav>
    )
  }
}

export default Navbar;