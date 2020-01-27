import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getProfiles } from '../../actions/profile';

const Avatar = ({
  profile: {
    user: { _id, name, avatar },
    createProfile,
    history
  }
}) => {
  const [formData, setFormData] = useState({
    avatar: ''
  });

  const userAvatar = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <form className='auth-form' onSubmit={e => onSubmit(e)}>
        <div className='label-form'>
          <input
            type='file'
            name='avatar'
            value={userAvatar}
            onChange={e => onChange(e)}
          />
        </div>
      </form>
    </Fragment>
  );
};

Avatar.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(null, { createProfile })(Avatar);
