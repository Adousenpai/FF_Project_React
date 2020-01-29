import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [displayBurger, toggleBurger] = useState(false);

  const authLinks = (
    <nav id='nav-bar'>
      <a href='/' className='logo-nav'>
        <img src={require('../../img/Logo.png')} alt='logo' />
      </a>
      <ul className={displayBurger ? 'nav-list open' : 'nav-list'}>
        <li className='nav-link' onClick={() => toggleBurger(!displayBurger)}>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-link' onClick={() => toggleBurger(!displayBurger)}>
          <Link to='/communauty'>Community</Link>
        </li>
        <li className='nav-link' onClick={() => toggleBurger(!displayBurger)}>
          <Link to='/posts'>Post</Link>
        </li>
        <li className='nav-link' onClick={() => toggleBurger(!displayBurger)}>
          <Link to='/login' onClick={logout}>
            <i className='fas fa-sign-out-alt'></i> Logout
          </Link>
        </li>
        <li
          className='nav-link'
          id='register-btn'
          onClick={() => toggleBurger(!displayBurger)}
        >
          <Link to='/register'>
            <i className='fas fa-id-badge'> </i> Dashboard
          </Link>
        </li>
      </ul>
      <div className='hamburger' onClick={() => toggleBurger(!displayBurger)}>
        <div className={displayBurger ? 'line cross' : 'line'}></div>
        <div className={displayBurger ? 'line cross' : 'line'}></div>
        <div className={displayBurger ? 'line cross' : 'line'}></div>
      </div>
    </nav>
  );

  const guestLinks = (
    <nav id='nav-bar'>
      <a href='/' className='logo-nav'>
        <img src={require('../../img/Logo.png')} alt='logo' />
      </a>
      <ul className={displayBurger ? 'nav-list open' : 'nav-list'}>
        <li className='nav-link' onClick={() => toggleBurger(!displayBurger)}>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-link' onClick={() => toggleBurger(!displayBurger)}>
          <Link to='/communauty'>Community</Link>
        </li>
        <li className='nav-link' onClick={() => toggleBurger(!displayBurger)}>
          <Link to='/posts'>Post</Link>
        </li>
        <li className='nav-link' onClick={() => toggleBurger(!displayBurger)}>
          <Link to='/login'>
            <i className='fas fa-sign-in-alt'></i> Login
          </Link>
        </li>
        <li
          className='nav-link'
          id='register-btn'
          onClick={() => toggleBurger(!displayBurger)}
        >
          <Link to='/register'>
            <i className='fas fa-user-plus'></i> Sign Up
          </Link>
        </li>
      </ul>
      <div className='hamburger' onClick={() => toggleBurger(!displayBurger)}>
        <div className={displayBurger ? 'line cross' : 'line'}></div>
        <div className={displayBurger ? 'line cross' : 'line'}></div>
        <div className={displayBurger ? 'line cross' : 'line'}></div>
      </div>
    </nav>
  );

  return (
    <nav>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
