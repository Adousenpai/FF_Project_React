import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    extension: '',
    title: '',
    company: ''
  });

  const { extension, title, company } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className='form-section'>
        <Alert />
        <h2>Add Raid Experience</h2>
        <p className=''>
          <i className='fas fa-user'></i> Inform people about your raid history.
        </p>
        <form
          className='auth-form'
          onSubmit={e => {
            e.preventDefault();
            addExperience(formData, history);
          }}
        >
          <div className='label-form'>
            <input
              type='text'
              placeholder='* Extension'
              name='extension'
              value={extension}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='* Raid Floor'
              name='title'
              value={title}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='FFlogs Link'
              name='company'
              value={company}
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);
