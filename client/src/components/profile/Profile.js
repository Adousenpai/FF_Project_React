import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import ProfileExperience from './ProfileExperience';
import ProfileActivity from './ProfileActivity';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section id='profile'>
            <div className='profile-nav'>
              <Link to='/communauty' className='btn'>
                <i className='fas fa-arrow-left'></i> Back To Profiles
              </Link>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link to='/edit-profile' className='btn'>
                    Edit Profile
                  </Link>
                )}
            </div>

            <ProfileTop profile={profile} />

            <div className='profile-exp'>
              <h2 className='text-primary'>Raid Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Raid Experience Yet</h4>
              )}
            </div>

            <div className='profile-exp'>
              <h2 className='text-primary'>Principal Activity</h2>
              {profile.activity.length > 0 ? (
                <Fragment>
                  {profile.activity.map(activity => (
                    <ProfileActivity key={activity._id} activity={activity} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Principal Activity Yet</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
