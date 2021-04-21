import React from 'react';
import PropTypes from 'prop-types';

import HospitalInfo from '../containers/HospitalInfo';

import Loading from '../components/Loading';
import NoSearchResults from '../components/NoSearchResults';
import PageHeader from '../components/PageHeader';

import * as Leitos from '../services/Leitos';
import * as Localidades from '../services/Localidades';

import ibge from '../utils/ibge';
import removeAccents from '../utils/remove-accents';
import searchUtils from '../utils/search';

/**
 * List all hospitals of a city.
 *
 * @return {ReactElement} The markup to render
 */
class City extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      loading: true,
      pageLocation: '',
      hospitals: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.getHospitals();
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  getCityByName(cities, name) {
    return cities.find((city) => (
      removeAccents(city.name).toLowerCase() === removeAccents(name).toLowerCase()
    ));
  }

  async getHospitals() {
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
    const cityName = match.params.city.replace(/\+/g, ' ');
    const city = this.getCityByName(cities, cityName);
    if (!city) {
      history.push(`/${match.params.region}/${state.name}`);

      return;
    }

    const hospitals = await Leitos.doFetchByCity(city.name, state.acronym);

    const pageLocation = `${city.name} / ${state.acronym}`;

    this.setState({
      loading: false,
      pageLocation,
      hospitals,
    });
  }

  render() {
    const { loading, pageLocation, hospitals, search } = this.state;

    if (loading) {
      const qtyLoadings = 3;
      const jsxLoadings = [];

      for (let i = 0; i < qtyLoadings; i += 1) {
        jsxLoadings.push(<Loading key={ i } />);
      }

      return jsxLoadings;
    }

    const noInfo = hospitals.length === 0;
    const pageHeaderProps = {
      pageLocation,
      search,
      searchHandler: this.handleSearch,
      searchType: 'hospitais',
      noInfo,
    };

    const hospitalsSearched = hospitals.filter((hospital) => {
      const name = hospital._source.nomeCnes || hospital._source.cnes || 'Indefinido';

      return !search || searchUtils.includes(search, name);
    });

    return (
      <>
        <PageHeader { ...pageHeaderProps } />

        { noInfo
          ? (
            <div className="page-no-info">
              <div>😕🥴😒</div>
              Não existem dados de hospitais nesta cidade no openDataSUS.
            </div>
          )
          : null }

        {
          (!noInfo && hospitalsSearched.length === 0)
            ? <NoSearchResults />
            : (
              hospitalsSearched.map((hospital, index) => (
                <HospitalInfo
                  key={ index }
                  hospital={ hospital }
                />
              ))
            )
        }
      </>
    );
  }
}

City.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      region: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default City;
