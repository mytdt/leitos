import React from 'react';
import PropTypes from 'prop-types';

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
export default class CityInfo extends React.Component {
  constructor(props) {
    super(props);
    const { props: inheritedInfo } = props;
    const { city, state } = inheritedInfo;

    this.state = {
      state,
      city,
      loading: true,
      numberOfHospitals: 0,
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

  async getInfo() {
    const { state, city } = this.state;

    this.setState({
      loading: true,
    });

    const hospitals = await Leitos.doFetchByCity(city.nome, state.sigla);

    const { info: initialInfo } = this.state;

    const info = consolidateInfo(initialInfo, hospitals);

    this.setState({
      loading: false,
      numberOfHospitals: hospitals.length,
      info,
    });
  }

  render() {
    const { loading, numberOfHospitals, info } = this.state;

    const numberOfRegions = 5;

    if (loading) {
      const jsxLoading = [];
      for (let i = 0; i < numberOfRegions; i += 1) {
        jsxLoading.push(<Loading />);
      }

      return jsxLoading;
    }

    const { link, city } = this.state;
    // const link = `/${region.nome}/${state.nome}`;
    // console.log(link);

    const props = {
      name: city.nome,
      info,
      link,
      qtyLoadingForNextLink: numberOfHospitals,
    };

    return <Card { ...props } />;
  }
}

CityInfo.propTypes = {
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
