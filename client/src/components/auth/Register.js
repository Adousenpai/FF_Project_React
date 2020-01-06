import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password does not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <section id='register'>
        <Alert />
        <h2>
          <i className='fas fa-user-plus'></i>Sign up
        </h2>
        <form onSubmit={e => onSubmit(e)} className='auth-form'>
          <div className='label-form'>
            <input
              type='text'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              placeholder='Full name'
            />
          </div>
          <div className='label-form'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='password'
              name='password2'
              placeholder='Confirm Password'
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input type='submit' name='submit' value='Sign up' />
          </div>
          <p>
            Already registered? <Link to='/login'>Log in</Link>
          </p>
        </form>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
