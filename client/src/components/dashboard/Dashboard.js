import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section id='dashboard'>
        <h2>Dashboard</h2>
        <p className='dashboard-text'>
          <i className='fas fa-user'></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>has</Fragment>
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
