// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import loading from '../assets/images/loading01.gif';

export class Spinner extends Component {

  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="loading spinner" />
      </div>
    )
  }
}

export default Spinner;