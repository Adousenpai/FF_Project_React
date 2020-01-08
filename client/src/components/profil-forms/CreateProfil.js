import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfil = props => {
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

  return (
    <Fragment>
      <section id='create-profil'>
        <h2>Create Your Profile</h2>
        <p className=''>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>
        <form className='auth-form'>
          <div className='label-form'>
            <input type='text' placeholder='Your Free Compagny' name='guilde' />
          </div>
          <div className='label-form'>
            <input type='text' placeholder='* Your Serveur...' name='serveur' />
          </div>
          <div className='label-form'>
            <input type='text' placeholder='* Jobs' name='jobs' />
          </div>
          <div className='label-form'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
            ></textarea>
          </div>
          <div className='label-form'>
            <input
              type='text'
              placeholder='Discord Username'
              name='discordusername'
            />
          </div>

          <div>
            <button type='button' className='btn'>
              Add Social Network Links
            </button>
          </div>

          <div className='label-form social-input'>
            <i className='fab fa-youtube fa-2x'></i>
            <input type='text' placeholder='YouTube URL' name='youtube' />
          </div>

          <div className='label-form social-input'>
            <i className='fab fa-twitter fa-2x'></i>
            <input type='text' placeholder='Twitter URL' name='twitter' />
          </div>

          <div className='label-form social-input'>
            <i className='fab fa-facebook fa-2x'></i>
            <input type='text' placeholder='Facebook URL' name='facebook' />
          </div>

          <div className='label-form social-input'>
            <i className='fab fa-instagram fa-2x'></i>
            <input type='text' placeholder='Instagram URL' name='instagram' />
          </div>
          <div className='btn-profil'>
            <input type='submit' className='btn-social' />
            <a className='btn-social' href='dashboard.html'>
              Go Back
            </a>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

CreateProfil.propTypes = {};

export default CreateProfil;
