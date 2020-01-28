import React from 'react';
import PropTypes from 'prop-types';

const ProfileExperience = ({ experience: { extension, title, company } }) => (
  <div className='exp-container'>
    <div className='exp-text'>
      <h3 className='text-dark'>{extension}</h3>
      <p>{title}</p>
      <a href={company}>Link</a>
    </div>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
