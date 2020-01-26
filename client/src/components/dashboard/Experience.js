import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.extension}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <a href={exp.company}>Link</a>
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className='btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <section className='experience'>
        <h2 className=''>Raid experience</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Extension</th>
              <th className='hide-sm'>Title</th>
              <th className='hide-sm'>FFlogs</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </section>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
