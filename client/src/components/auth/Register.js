import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const Register = props => {
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
      props.setAlert('Password does not match', 'danger');
    } else {
      console.log('success');
    }
  };

  return (
    <Fragment>
      <section id='register'>
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
              required
            />
          </div>
          <div className='label-form'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='label-form'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='label-form'>
            <input
              type='password'
              name='password2'
              placeholder='Confirm Password'
              value={password2}
              onChange={e => onChange(e)}
              required
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

export default connect(null, { setAlert })(Register);
