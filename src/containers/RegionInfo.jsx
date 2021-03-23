import React from 'react';
import PropTypes from 'prop-types';

import * as Localidades from '../services/Localidades';
import * as Leitos from '../services/Leitos';

import Card from './Card';
import Loading from '../components/Loading';

import consolidateInfo from '../utils/consolidate-info';

/**
 * Informations about a specific region.
 *
 * @param {Number} props.region.id    Id of region
 * @param {String} props.region.sigla Acronym of region
 * @param {String} props.region.nome  Name of region
 * @return {ReactElement}             The markup to render
 */
export default class RegionInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      numberOfStates: 0,
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

  async getStates() {
    const { region } = this.props;
    const states = await Localidades.getStatesByRegion(region.id);

    return states.map((state) => state.sigla);
  }

  async getInfo() {
    this.setState({
      loading: true,
    });

    const states = await this.getStates();
    const hospitais = await Leitos.doFetchByStates(states);

    const { info: initialInfo } = this.state;
    const info = consolidateInfo(initialInfo, hospitais);

    this.setState({
      loading: false,
      numberOfStates: states.length,
      info,
    });
  }

  render() {
    const { loading, numberOfStates, info } = this.state;

    if (loading) {
      return <Loading />;
    }

    const { region } = this.props;
    const link = `/${region.nome.toLowerCase()}`;

    const props = {
      region,
      info,
      link,
      qtyLoadingForNextLink: numberOfStates,
    };

    return <Card { ...props } />;
  }
}

RegionInfo.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sigla: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
  }).isRequired,
};
