import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import PostForm from './PostForm';

import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section id='posts-page'>
        <div className='posts-container'>
          <div className='posts-text'>
            <h2 className=''>Posts</h2>
            <p className=''>
              <i className='fas fa-user' /> Welcome to the community
            </p>
          </div>
          <PostForm />
          <Alert />

          <div className='posts-group'>
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
