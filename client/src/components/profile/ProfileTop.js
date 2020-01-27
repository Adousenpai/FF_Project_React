import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    guilde,
    serveur,
    jobs,
    bio,
    discordusername,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className='top-container'>
      <img
        className='round-img my-1'
        src={require(`../../../../uploads/${avatar}`)}
        alt=''
      />
      <div className='profile-text-container'>
        <div className='profile-text'>
          <h2 className=''>{name}</h2>
          <p className='profil-p'>{guilde}</p>
          <p className='profil-p'>{serveur}</p>
          <p className='profil-p'>{jobs}</p>
          <p className='profil-p'> {bio}</p>
        </div>
        <div className='profile-social-container'>
          <div className='discord'>
            <img src={require('../../img/discord.png')} alt='discord' />
            <p className='profil-p'>#{discordusername}</p>
          </div>
          <div className='profile-social'>
            {social && social.twitter && (
              <a
                href={social.twitter}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-twitter fa-2x' />
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-facebook fa-2x' />
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-youtube fa-2x' />
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-instagram fa-2x' />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
