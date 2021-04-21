import React from 'react';

import RegionInfo from '../containers/RegionInfo';

import NoSearchResults from '../components/NoSearchResults';
import PageHeader from '../components/PageHeader';

import constants from '../constants';

import searchUtils from '../utils/search';

/**
 * List all regions of Brazil.
 *
 * @return {ReactElement} The markup to render
 */
class Brazil extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    const { search } = this.state;

    const pageLocation = 'Brasil';
    const pageHeaderProps = {
      pageLocation,
      search,
      searchHandler: this.handleSearch,
      searchType: 'regiões',
    };

    const regionsSearched = constants.regions.filter((region) => (
      !search || searchUtils.includes(search, region.name)
    ));

    return (
      <>
        <PageHeader { ...pageHeaderProps } />

        {
          (regionsSearched.length === 0)
            ? <NoSearchResults />
            : (
              regionsSearched.map((region) => (
                <RegionInfo key={ region.id } region={ region } />
              ))
            )
        }
      </>
    );
  }
}

export default Brazil;
