import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = {
    isOpen: true,
    openNav: 'nav-list',
    iconBurger: 'line',
    hamburger: document.getElementsByClassName('hamburger'),
    navList: document.getElementsByClassName('.nav-list'),
    navLinks: document.getElementsByClassName('.nav-link')
  };

  componentDidMount() {}

  openMenu = () => {
    console.log(this.state.isOpen);
    this.setState({
      isOpen: !this.state.isOpen
    });
    if (this.state.isOpen === true) {
      this.setState({
        openNav: 'nav-list open',
        iconBurger: 'line cross'
      });
    } else {
      this.setState({
        openNav: 'nav-list',
        iconBurger: 'line'
      });
    }
  };

  closeMenu = () => {
    console.log(this.state.isOpen);
    this.setState({
      isOpen: !this.state.isOpen
    });
    if (this.state.isOpen === false) {
      this.setState({
        openNav: 'nav-list',
        iconBurger: 'line'
      });
    }
  };

  render() {
    const { openNav, iconBurger } = this.state;
    return (
      <nav id='nav-bar'>
        <img src={require('../../img/Logo.png')} alt='logo' />

        <ul className={openNav}>
          <li className='nav-link'>
            <Link to='/' onClick={this.closeMenu}>
              Home
            </Link>
          </li>
          <li className='nav-link'>
            <Link to='/communauty' onClick={this.closeMenu}>
              Communauty
            </Link>
          </li>
          <li className='nav-link'>
            <Link to='/post' onClick={this.closeMenu}>
              Post
            </Link>
          </li>
          <li className='nav-link'>
            <Link to='/login' onClick={this.closeMenu}>
              <i className='fas fa-sign-in-alt'></i> Login
            </Link>
          </li>
          <li className='nav-link' id='register-btn'>
            <Link to='/register' onClick={this.closeMenu}>
              <i className='fas fa-user-plus'></i> Sign Up
            </Link>
          </li>
        </ul>
        <div className='hamburger' onClick={this.openMenu}>
          <div className={iconBurger}></div>
          <div className={iconBurger}></div>
          <div className={iconBurger}></div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
