import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import Alert from '../layout/Alert';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    guilde: '',
    serveur: '',
    jobs: '',
    bio: '',
    discordusername: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    guilde,
    serveur,
    jobs,
    bio,
    discordusername,
    youtube,
    twitter,
    facebook,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <section id='create-profil'>
        <Alert />
        <h2>Create Your Profile</h2>
        <p className=''>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>
        <form className='auth-form' onSubmit={e => onSubmit(e)}>
          <div className='label-form'>
            <input
              type='text'
              placeholder='Your Free Compagny'
              name='guilde'
              value={guilde}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='* Your Serveur...'
              name='serveur'
              value={serveur}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='* Jobs'
              name='jobs'
              value={jobs}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='label-form'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='Discord Username'
              name='discordusername'
              value={discordusername}
              onChange={e => onChange(e)}
            />
          </div>

          <div>
            <button
              type='button'
              className='btn'
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
            >
              Add Social Network Links
            </button>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className='label-form social-input'>
                <i className='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='label-form social-input'>
                <i className='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='label-form social-input'>
                <i className='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='label-form social-input'>
                <i className='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={e => onChange(e)}
                />
              </div>
            </Fragment>
          )}
          <div className='btn-profil'>
            <input type='submit' className='btn-social' />
            <Link className='btn-social' to='/dashboard'>
              Go Back
            </Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

const mapStateToProps = state => ({
  createProfile: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
