// import PropTypes from 'prop-types'
import React from 'react';
import loading from '../assets/images/loading01.gif';

const Spinner = () => {
  return (
    <div className="text-center my-3">
      <img src={loading} alt="loading spinner" />
    </div>
  );
};

export default Spinner;
