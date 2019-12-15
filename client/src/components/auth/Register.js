import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {
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
      console.log('password do not match');
    } else {
      const newUser = {
        name,
        email,
        password,
        password2
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/JSON'
          }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        console.log(err.response);
      }
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
            Already registered? <a href='/login'>Log in</a>
          </p>
        </form>
      </section>
    </Fragment>
  );
};

export default Register;
