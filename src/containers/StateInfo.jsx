import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Localidades from '../services/Localidades';
import * as Leitos from '../services/Leitos';

import Card from '../components/Card';
import Loading from '../components/Loading';

import consolidateInfo from '../utils/consolidate-info';

/**
 * Informations about a specific state.
 *
 * @param {Number} props.region.id    Id of region
 * @param {String} props.region.sigla Acronym of region
 * @param {String} props.region.nome  Name of region
 * @return {ReactElement}             The markup to render
 */
export default class StateInfo extends React.Component {
  constructor(props) {
    super(props);
    const { props: inheritedInfo } = props;
    const { state, region } = inheritedInfo;

    this.state = {
      region,
      state,
      loading: true,
      numberOfCities: 0,
      info: {
        ofertaHospCli: 0,
        ofertaHospUti: 0,
        ocupHospCli: 0,
        ocupHospUti: 0,
        altas: 0,
        obitos: 0,
      },
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getCities() {
    const { state } = this.state;
    const cities = await Localidades.getCitiesByState(state.id);

    return cities.map((city) => city.nome);
  }

  async getInfo() {
    this.setState({
      loading: true,
    });

    const { state: { sigla } } = this.state;

    const cities = await this.getCities();
    const hospitais = await Leitos.doFetchBySingleState(sigla);

    const { info: initialInfo } = this.state;

    const info = consolidateInfo(initialInfo, hospitais);

    this.setState({
      loading: false,
      numberOfCities: cities.length,
      info,
    });
  }

  render() {
    const { loading, numberOfCities, info } = this.state;

    const numberOfRegions = 5;

    if (loading) {
      const jsxLoading = [];
      for (let i = 0; i < numberOfRegions; i += 1) {
        jsxLoading.push(<Loading />);
      }

      return jsxLoading;
    }

    const { region, state } = this.state;

    const linkParams = {
      pathname: `/${region.nome}/${state.nome}`,
      props: {
        region,
        state,
        qtyLoadingForNextLink: numberOfCities,
      },
    };

    return (
      <Card name={ state.nome } info={ info }>
        <Link to={ linkParams }>Mais Detalhes!</Link>
      </Card>
    );
  }
}

StateInfo.propTypes = {
  props: PropTypes.shape({
  }).isRequired,
  region: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sigla: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
  }).isRequired,
  state: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sigla: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
  }).isRequired,
};
