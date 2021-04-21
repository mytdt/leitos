import React from 'react';
import PropTypes from 'prop-types';

import * as Leitos from '../services/Leitos';

import Card from './Card';
import Loading from '../components/Loading';

import consolidateInfo from '../utils/consolidate-info';
import ibge from '../utils/ibge';

/**
 * Informations about a specific region.
 *
 * @param {Number} props.region.id    Id of region
 * @param {String} props.region.name  Name of region
 * @return {ReactElement}             The markup to render
 */
class RegionInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      info: {
        ofertaHospCli: 0,
        ofertaHospUti: 0,
        ocupHospCli: 0,
        ocupHospUti: 0,
        altas: 0,
        obitos: 0,
      },
    };

    this.componentIsMounted = false;
  }

  componentDidMount() {
    this.componentIsMounted = true;
    this.getInfo();
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  getStates() {
    const { region } = this.props;
    const states = ibge.getStatesByRegion(region.id);

    return states.map((state) => state.acronym);
  }

  async getInfo() {
    if (this.componentIsMounted) {
      this.setState({
        loading: true,
      });
    }

    const states = this.getStates();
    const hospitais = await Leitos.doFetchByStates(states);

    if (this.componentIsMounted) {
      const { info: initialInfo } = this.state;
      const info = consolidateInfo(initialInfo, hospitais);

      this.setState({
        loading: false,
        info,
      });
    }
  }

  render() {
    const { region } = this.props;
    const { loading, info } = this.state;

    if (loading) {
      return <Loading />;
    }

    const link = `/${region.name}`;

    const props = {
      name: region.name,
      info,
      link,
    };

    return <Card { ...props } />;
  }
}

RegionInfo.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default RegionInfo;
