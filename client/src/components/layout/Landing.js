import React from 'react';

export const Landing = () => {
  return (
    <main id='Landing'>
      <header className='landing-header'>
        <div className='header-text'>
          <h1>MoogleBook</h1>
          <h2>Create the social account of your character.</h2>
          <a href='/' className='header-btn'>
            Sign Up
          </a>
        </div>
      </header>
      <section id='gallery'>
        <div className='gallery-texte'>
          <h2>Create your gallery of screenshots</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
            nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Animi, iusto.
          </p>
        </div>
        <img src={require('../../img/header4.png')} alt='gallery' />
      </section>
      <section id='communauty'>
        <img src={require('../../img/keiki.png')} alt='' />
        <div className='communauty-texte'>
          <h2>Follow the communauty</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            voluptates libero maiores, cupiditate, sint molestiae, asperiores
            accusantium similique aliquid sunt esse reprehenderit. Consequatur,
            totam doloribus.
          </p>
        </div>
      </section>
      <footer>
        <h2>MoogleBook</h2>
      </footer>
    </main>
  );
};

export default Landing;
