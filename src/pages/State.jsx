import React from 'react';
import PropTypes from 'prop-types';

import CityInfo from '../containers/CityInfo';

import Loading from '../components/Loading';
import NoSearchResults from '../components/NoSearchResults';
import PageHeader from '../components/PageHeader';

import * as Localidades from '../services/Localidades';

import ibge from '../utils/ibge';
import searchUtils from '../utils/search';

/**
 * List all cities of a state.
 *
 * @return {ReactElement} The markup to render
 */
class State extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      state: null,
      search: '',
      pageLocation: '',
      cities: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.getCities();
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  async getCities() {
    this.setState({
      loading: true,
    });

    const { match, history } = this.props;

    const stateName = match.params.state.replace(/\+/g, ' ');
    const state = ibge.getStateByName(stateName);
    if (!state) {
      history.push(`/${match.params.region}`);

      return;
    }

    const cities = await Localidades.getCitiesByState(state.id);

    const pageLocation = `${state.name}`;

    this.setState({
      loading: false,
      state,
      pageLocation,
      cities,
    });
  }

  render() {
    const { loading, pageLocation, state, cities, search } = this.state;

    if (loading) {
      const qtyLoadings = 12;
      const jsxLoadings = [];

      for (let i = 0; i < qtyLoadings; i += 1) {
        jsxLoadings.push(<Loading key={ i } />);
      }

      return jsxLoadings;
    }

    const { match } = this.props;
    const link = match.url;

    const pageHeaderProps = {
      pageLocation,
      search,
      searchHandler: this.handleSearch,
      searchType: 'cidades',
    };

    const citiesSearched = cities.filter((city) => (
      !search || searchUtils.includes(search, city.name)
    ));

    return (
      <>
        <PageHeader { ...pageHeaderProps } />

        {
          (citiesSearched.length === 0)
            ? <NoSearchResults />
            : (
              citiesSearched.map((city) => (
                <CityInfo
                  key={ city.id }
                  state={ state }
                  city={ city }
                  link={ link }
                />
              ))
            )
        }
      </>
    );
  }
}

State.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      region: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default State;
