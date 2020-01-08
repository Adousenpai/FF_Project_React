import React, { Fragment } from 'react';
import spinner from './spinner.svg';

export default () => (
  <Fragment>
    <div className='spinner-page'>
      <h2>Loading...</h2>
      <img src={spinner} alt='Loading...' />
    </div>
  </Fragment>
);
