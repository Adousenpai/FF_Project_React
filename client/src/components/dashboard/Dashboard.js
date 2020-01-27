import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Experience from './Experience';
import Activity from './Activity';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';

import DashboardActions from './DashboardActions';

const Dashboard = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section id='dashboard'>
        <Alert />
        <h2 className='dashboard-title'>Dashboard</h2>
        <p className='dashboard-text'>
          <i className='fas fa-user'></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            {/* {profile.activity.length > 0 ? (
              <Activity activity={profile.activity} />
            ) : (
              <div>rien</div>
            )}

            {profile.experience.length > 0 ? (
              <Experience experience={profile.experience} />
            ) : (
              <div>rien</div>
            )} */}

            <Link to={`/profile/${user._id}`} className='btn'>
              Profil
            </Link>
            <button className='btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete account{' '}
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <p className='noProfil-text'>
              You have not yet setup a profile, please add some info
            </p>
            <Link to='/create-profile' className='btn-form'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
