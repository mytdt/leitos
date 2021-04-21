import React from 'react';
import PropTypes from 'prop-types';

import * as Leitos from '../services/Leitos';

import Card from './Card';
import Loading from '../components/Loading';

import consolidateInfo from '../utils/consolidate-info';

/**
 * Informations about a specific state.
 *
 * @param {Number} props.state.id      Id of state
 * @param {String} props.state.name    Name of state
 * @param {String} props.state.acronym Acronym of state
 * @param {String} props.link          Link of current url
 * @return {ReactElement}              The markup to render
 */
class StateInfo extends React.Component {
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

  async getInfo() {
    if (this.componentIsMounted) {
      this.setState({
        loading: true,
      });
    }

    const { state } = this.props;
    const hospitais = await Leitos.doFetchBySingleState(state.acronym);

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
    const { state, link: currentLink } = this.props;
    const { loading, info } = this.state;

    if (loading) {
      return <Loading />;
    }

    const link = `${currentLink}/${state.name}`;

    const props = {
      name: state.name,
      info,
      link,
    };

    return <Card { ...props } />;
  }
}

StateInfo.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    acronym: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
};

export default StateInfo;
