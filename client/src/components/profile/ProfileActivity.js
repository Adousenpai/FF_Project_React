import React from 'react';
import PropTypes from 'prop-types';

const ProfileActivity = ({ activity: { main1, main2 } }) => (
  <div className='exp-container'>
    <div className='exp-text'>
      <p>Principal: {main1}</p>
      <p>Secondaire: {main2}</p>
    </div>
  </div>
);

ProfileActivity.propTypes = {
  activity: PropTypes.object.isRequired
};

export default ProfileActivity;
