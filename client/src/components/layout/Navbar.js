import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='nav-bar'>
      <h1>
        <Link to='/'>Mooglebook</Link>
      </h1>
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
          <Link to='/login'>Login</Link>
        </li>
        <li className='nav-link' id='register-btn'>
          <Link to='/register'>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
