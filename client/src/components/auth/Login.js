import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <section id='login'>
        <Alert />
        <h2>
          <i className='fas fa-sign-in-alt'></i>Log in
        </h2>
        <form action='' className='auth-form' onSubmit={e => onSubmit(e)}>
          <div className='label-form'>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={e => onChange(e)}
            />
          </div>

          <div className='label-form'>
            <input type='submit' name='submit' value='Log in' />
          </div>
          <p>
            Not registered yet? <Link to='/login'>Sign up</Link>
          </p>
        </form>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
