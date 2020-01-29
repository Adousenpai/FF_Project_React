import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    guilde,
    serveur,
    discordusername,
    activity
  }
}) => {
  return (
    <div className='char-card'>
      <img className='avatar-card' src={avatar} alt='' />
      <div className='char-text-container'>
        <div className='char-info'>
          <h2>{name}</h2>
          <p>{guilde}</p>
          <p className='my-1'>{serveur}</p>
          <Link to={`/profile/${_id}`} id='card-btn'>
            View Profile
          </Link>
        </div>
        <div className='char-interest'>
          <div className='discord'>
            <img src={require('../../img/discord.png')} alt='discord' />
            <p className='profil-p'>#{discordusername}</p>
          </div>{' '}
          {activity.length > 0 ? (
            <Fragment>
              {activity.map(activity => (
                <Fragment>
                  <div className='activity-profil'>
                    <img
                      src={require(`../../img/${activity.main1}.png`)}
                      alt=''
                    />
                    <p>{activity.main1}</p>
                  </div>

                  <div className='activity-profil'>
                    <img
                      src={require(`../../img/${activity.main2}.png`)}
                      alt=''
                    />
                    <p>{activity.main2}</p>
                  </div>
                </Fragment>
              ))}
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
