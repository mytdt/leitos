import React from 'react';
import PropTypes from 'prop-types';

import StateInfo from '../containers/StateInfo';

import NoSearchResults from '../components/NoSearchResults';
import PageHeader from '../components/PageHeader';

import ibge from '../utils/ibge';
import searchUtils from '../utils/search';

/**
 * List all states of a region.
 *
 * @return {ReactElement} The markup to render
 */
class Region extends React.Component {
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
    const { match, history } = this.props;

    const region = ibge.getRegionByName(match.params.region);
    if (!region) {
      history.push('/');

      return null;
    }

    const states = ibge.getStatesByRegion(region.id);
    const link = match.url;

    const { search } = this.state;

    const pageLocation = `${region.name}`;
    const pageHeaderProps = {
      pageLocation,
      search,
      searchHandler: this.handleSearch,
      searchType: 'estados',
    };

    const statesSearched = states.filter((state) => (
      !search || searchUtils.includes(search, state.name)
    ));

    return (
      <>
        <PageHeader { ...pageHeaderProps } />

        {
          (statesSearched.length === 0)
            ? <NoSearchResults />
            : (
              statesSearched.map((state) => (
                <StateInfo
                  key={ state.id }
                  state={ state }
                  link={ link }
                />
              ))
            )
        }
      </>
    );
  }
}

Region.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      region: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Region;
