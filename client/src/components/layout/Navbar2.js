import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <nav id='nav-bar'>
      <a href='/' className='logo-nav'>
        <img src={require('../../img/Logo.png')} alt='logo' />
      </a>
      <ul className='nav-list'>
        <li className='nav-link'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-link'>
          <Link to='/communauty'>Communauty</Link>
        </li>
        <li className='nav-link'>
          <Link to='/post'>Post</Link>
        </li>
        <li className='nav-link'>
          <Link to='/login' onClick={logout}>
            <i className='fas fa-sign-out-alt'></i> Logout
          </Link>
        </li>
        <li className='nav-link' id='register-btn'>
          <Link to='/register'>
            <i className='fas fa-id-badge'> </i> Dashboard
          </Link>
        </li>
      </ul>
      <div className='hamburger'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
    </nav>
  );

  const guestLinks = (
    <nav id='nav-bar'>
      <a href='/' className='logo-nav'>
        <img src={require('../../img/Logo.png')} alt='logo' />
      </a>
      <ul className='nav-list'>
        <li className='nav-link'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-link'>
          <Link to='/communauty'>Communauty</Link>
        </li>
        <li className='nav-link'>
          <Link to='/post'>Post</Link>
        </li>
        <li className='nav-link'>
          <Link to='/login'>
            <i className='fas fa-sign-in-alt'></i> Login
          </Link>
        </li>
        <li className='nav-link' id='register-btn'>
          <Link to='/register'>
            <i className='fas fa-user-plus'></i> Sign Up
          </Link>
        </li>
      </ul>
      <div className='hamburger'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
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
