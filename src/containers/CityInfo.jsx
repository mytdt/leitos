import React from 'react';
import PropTypes from 'prop-types';

import * as Leitos from '../services/Leitos';

import Card from './Card';
import Loading from '../components/Loading';

import consolidateInfo from '../utils/consolidate-info';

/**
 * Informations about a specific city.
 *
 * @param {Number} props.city.id   Id of city
 * @param {String} props.city.name Name of city
 * @param {String} props.link      Link of current url
 * @return {ReactElement}          The markup to render
 */
class CityInfo extends React.Component {
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

    const { state, city } = this.props;
    const hospitals = await Leitos.doFetchByCity(city.name, state.acronym);

    if (this.componentIsMounted) {
      const { info: initialInfo } = this.state;
      const info = consolidateInfo(initialInfo, hospitals);

      this.setState({
        loading: false,
        info,
      });
    }
  }

  render() {
    const { city, link: currentLink } = this.props;
    const { loading, info } = this.state;

    if (loading) {
      return <Loading />;
    }

    const link = `${currentLink}/${city.name}`;

    const props = {
      name: city.name,
      info,
      link,
    };

    return <Card { ...props } />;
  }
}

CityInfo.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    acronym: PropTypes.string.isRequired,
  }).isRequired,
  city: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
};

export default CityInfo;
