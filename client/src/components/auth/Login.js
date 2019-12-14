import React from 'react';

const Login = () => {
  return (
    <section id='login'>
      <h2>
        <i className='fas fa-sign-in-alt'></i>Log in
      </h2>
      <form action='' className='auth-form'>
        <div className='label-form'>
          <input type='email' name='email' placeholder='Email' />
        </div>
        <div className='label-form'>
          <input type='password' name='password' placeholder='Password' />
        </div>

        <div className='label-form'>
          <input type='submit' name='submit' value='Log in' />
        </div>
        <p>
          Not registered yet? <a href='/login'>Sign up</a>
        </p>
      </form>
    </section>
  );
};

export default Login;
