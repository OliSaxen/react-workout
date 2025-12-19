import React, { Component } from 'react';

import logo from '../../logo.svg';

export class Header extends Component {
  render() {
    return (
      <div>
        <nav className='nav'>
          <ul className='nav-links'>
            <li>
              <a className='nav-link' href='/users'>Users</a>
            </li>
            <li>
              <a className='nav-link' href='/events'>Events</a>
            </li>
          </ul>
        </nav>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>React Workout</p>
        </header>
      </div>
    );
  }
}
export default Header;
