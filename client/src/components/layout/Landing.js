import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <main id='Landing'>
      <header className='landing-header'>
        <div className='header-text'>
          <h1>MoogleBook</h1>
          <h2>Create the social account of your character.</h2>
          <Link to='/register' className='header-btn'>
            Sign Up
          </Link>
          <img
            src={require('../../img/scroll.png')}
            alt='scroll-icon'
            id='scroll-icon'
          />
        </div>
      </header>
      {/* <section id='gallery'>
        <div className='gallery-texte'>
          <h2>Create the gallery of your best screens</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
            nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Animi, iusto.
          </p>
        </div>
        <img src={require('../../img/header4.png')} alt='gallery' />
      </section> */}
      <section id='communauty'>
        <img src={require('../../img/keiki.png')} alt='' />
        <div className='communauty-texte'>
          <h2>Follow the communauty</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            voluptates libero maiores, cupiditate, sint molestiae.
          </p>
        </div>
      </section>
    </main>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
