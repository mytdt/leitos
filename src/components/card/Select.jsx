import React from 'react';
import PropTypes from 'prop-types';

import constants from '../../constants';

import { ReactComponent as SelectArrow } from '../../icons/select-arrow.svg';

import '../../styles/card/Select.scss';

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
    <SelectArrow focusable="false" aria-hidden="true" />
  </div>
);

Select.propTypes = {
  select: PropTypes.func.isRequired,
};

export default Select;
