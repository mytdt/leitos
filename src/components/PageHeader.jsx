import React from 'react';
import PropTypes from 'prop-types';

import Search from './Search';

import '../styles/PageHeader.scss';

const PageHeader = ({ pageLocation, search, searchHandler, searchType, noInfo }) => (
  <div className="page-header">
    <div className="page-location">
      { pageLocation }
    </div>

    { noInfo
      ? null
      : <Search search={ search } change={ searchHandler } type={ searchType } /> }
  </div>
);

PageHeader.propTypes = {
  pageLocation: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired,
  noInfo: PropTypes.bool,
};

PageHeader.defaultProps = {
  noInfo: false,
};

export default PageHeader;
