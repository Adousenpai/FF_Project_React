import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Activity = ({ activity }) => {
  const activitys = activity.map(act => (
    <tr key={act._id}>
      <td>{act.main1}</td>
      <td className='hide-sm'>{act.main2}</td>
      {/* <td>
        <button className='btn-danger'>Delete</button>
      </td> */}
    </tr>
  ));

  return (
    <Fragment>
      <section className='activity'>
        <h2 className=''>Activity</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Principal</th>
              <th className='hide-sm'>Secondaire</th>
            </tr>
          </thead>
          <tbody>{activitys}</tbody>
        </table>
      </section>
    </Fragment>
  );
};

Activity.propTypes = {
  activity: PropTypes.array.isRequired
};

export default Activity;
