import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Success');
  };
  return (
    <Fragment>
      <section id='login'>
        <h2>
          <i className='fas fa-sign-in-alt'></i>Log in
        </h2>
        <form action='' className='auth-form' onSubmit={e => onSubmit(e)}>
          <div className='label-form'>
            <input
              type='email'
              name={email}
              placeholder='Email'
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='password'
              name={password}
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

export default Login;
