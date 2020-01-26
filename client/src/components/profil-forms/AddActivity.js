import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addActivity } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddActivity = ({ addActivity, history }) => {
  const [formData, setFormData] = useState({
    main1: '',
    main2: ''
  });

  const { main1, main2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className='form-section'>
        <Alert />
        <h2>Add Main Activity</h2>
        <p className=''>
          <i className='fas fa-user'></i> Tell us what is your favorite activity
          in the game.
        </p>
        <form
          className='auth-form'
          onSubmit={e => {
            e.preventDefault();
            addActivity(formData, history);
          }}
        >
          <div className='label-form'>
            <input
              type='text'
              placeholder='* First Activity'
              name='main1'
              value={main1}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='* Second Activity'
              name='main2'
              value={main2}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='btn-profil'>
            <input type='submit' className='btn-social' />
            <Link className='btn-social' to='/dashboard'>
              Go Back
            </Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

AddActivity.propTypes = {
  addActivity: PropTypes.func.isRequired
};

export default connect(null, { addActivity })(AddActivity);
