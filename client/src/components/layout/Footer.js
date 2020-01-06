import React from 'react';

function Footer() {
  return (
    <footer>
      <a href='#top'>
        <i className='fas fa-arrow-circle-up'></i>
      </a>
      <div className='info'>
        <img
          src={require('../../img/Logo.png')}
          alt='logo'
          className='footer-logo'
        />
        <ul className='footer-logo-list'>
          <li>
            <a href='!#'>
              <img src={require('../../img/pegi.png')} alt='logo_pegi' />
            </a>
          </li>
          <li>
            <a href='!#'>
              <img src={require('../../img/play.svg')} alt='logo_pegi' />
            </a>
          </li>
          <li>
            <a href='!#'>
              <img
                src={require('../../img/ps4.svg')}
                alt='logo_pegi'
                id='ps4'
              />
            </a>
          </li>
          <li>
            <a href='!#'>
              <img src={require('../../img/pc.png')} alt='logo_pegi' />
            </a>
          </li>
          <li>
            <a href='!#'>
              <img src={require('../../img/steam.png')} alt='logo_pegi' />
            </a>
          </li>
        </ul>
        <ul className='footer-list'>
          <li className='footer-link'>
            <a href='!#'>License</a>
          </li>
          <li className='footer-link'>
            <a href='!#'>Rules & Policies</a>
          </li>
          <li className='footer-link'>
            <a href='!#'>Privacy Policy</a>
          </li>
          <li className='footer-link'>
            <a href='!#'>Cookie Policy</a>
          </li>
        </ul>
        <p>© 2010 - 2019 SQUARE ENIX CO., LTD. All Rights Reserved.</p>
        <p>
          "Playstation" and "PS4" are registered trademarks or trademarks of
          Sony Interactive Entertainment Inc.
        </p>
        <p>
          ©2019 Valve Corporation. Steam and the Steam logo are trademarks
          and/or registered trademarks of Valve Corporation in the U.S. and/or
          other countries.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
