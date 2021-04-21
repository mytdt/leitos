import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as SearchIcon } from '../icons/search.svg';

import '../styles/Search.scss';

const Search = ({ search, change, type }) => (
  <div className="page-search">
    <input
      type="text"
      placeholder={ `Pesquisar ${type}` }
      value={ search }
      onChange={ change }
    />
    <SearchIcon focusable="false" aria-hidden="true" />
  </div>
);

Search.propTypes = {
  search: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Search;
