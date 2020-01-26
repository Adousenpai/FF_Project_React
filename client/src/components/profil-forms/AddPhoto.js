import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPhoto } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddPhoto = ({ addPhoto, history }) => {
  const [formData, setFormData] = useState({
    photo: '',
    title: '',
    text: ''
  });

  const { photo, title, text } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className='form-section'>
        <Alert />
        <h2>Add Screenshot</h2>
        <p className=''>
          <i className='fas fa-user'></i> Show us and share your best
          Screenshots !
        </p>
        <form
          enctype='multipart/form-data'
          className='auth-form'
          onSubmit={e => {
            e.preventDefault();
            addPhoto(formData, history);
          }}
        >
          <div className='label-form'>
            <input
              type='file'
              placeholder=''
              name='photo'
              value={photo}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='* Title'
              name='title'
              value={title}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='Description...'
              name='text'
              value={text}
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

AddPhoto.propTypes = {
  addPhoto: PropTypes.func.isRequired
};

export default connect(null, { addPhoto })(AddPhoto);
