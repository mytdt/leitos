import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Localidades from '../services/Localidades';

import Loading from '../components/Loading';
import CityInfo from '../containers/CityInfo';

/**
 * List all states of a region.
 *
 * @return {ReactElement} The markup to render
 */
export default class Cities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      cities: [],
    };
  }

  componentDidMount() {
    this.getCities();
  }

  async getCities() {
    const { location } = this.props;
    const { state } = location.props;

    this.setState({
      loading: true,
    });

    const cities = await Localidades.getCitiesByState(state.id);

    this.setState({
      loading: false,
      cities,
    });
  }

  render() {
    const { loading, cities } = this.state;

    if (loading) {
      return <Loading />;
    }

    const { location } = this.props;
    const { state } = location.props;

    return (
      cities.map((city) => {
        const props = {
          city,
          state,
        };

        return <CityInfo key={ state.id } props={ props } />;
      })
    );
  }
}

Cities.propTypes = {
  location: PropTypes.shape({
    props: PropTypes.shape({
      qtyLoadingForNextLink: PropTypes.number.isRequired,
      state: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
