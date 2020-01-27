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
    <section className='communauty-page'>
      <div className='char-card'>
        <img
          className='avatar-card'
          src={require(`../../../../uploads/${avatar}`)}
          alt=''
        />
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
            {activity.length > 0 ? (
              <Fragment>
                {activity.map(activity => (
                  <Fragment>
                    <p>{activity.main1}</p>
                    <p>{activity.main2}</p>
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              <h4></h4>
            )}
          </div>
        </div>
        {/* <ul>
        {activity.map((act, index) => (
          <li key={index} className='text-primary'>
            {act}
          </li>
        ))}
      </ul> */}
      </div>
    </section>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
