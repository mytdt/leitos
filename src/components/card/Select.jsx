import React from 'react';
import PropTypes from 'prop-types';

import constants from '../../constants';

import './Select.scss';

/**
 * Select component that renders inside a card.
 *
 * @param  {Function}     props.select Callback function to call when select element
 * @return {ReactElement}              The markup to render
 */
const Select = ({ select }) => (
  <div className="card-select">
    <select onChange={ select } defaultValue={ constants.icuBeds }>
      <option value={ constants.icuBeds }>Leitos de UTI</option>
      <option value={ constants.clinicalBeds }>Leitos Clínicos</option>
      <option value={ constants.dischargesDeaths }>Altas e Óbitos</option>
    </select>
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M 7 14 L 12 22 L 17 14 Z" />
      <path d="M 7 10 L 12 2 L 17 10 Z" />
    </svg>
  </div>
);

Select.propTypes = {
  select: PropTypes.func.isRequired,
};

export default Select;
