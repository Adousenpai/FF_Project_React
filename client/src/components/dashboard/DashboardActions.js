import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn m-1'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='/add-activity' className='btn m-1'>
        <i className='fas fa-poll'></i> Add Main Activity
      </Link>
      <Link to='/add-experience' className='btn m-1'>
        <i className='fas fa-khanda'></i> Add Raid Experience
      </Link>
      {/* <Link to='/add-photo' className='btn m-1'>
        <i className='fas fa-image'></i> Add Picture
      </Link> */}
    </div>
  );
};

export default DashboardActions;
