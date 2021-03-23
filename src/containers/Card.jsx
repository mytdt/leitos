import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Select from '../components/Card/Select';
import Info from '../components/Card/Info';

import constants from '../constants';

import './Card.scss';

/**
 * Card component that renders a single card.
 *
 * @param  {String}       props.region                Region data
 * @param  {Object}       props.info                  Card info to display
 * @param  {String}       props.link                  Card link to more details
 * @param  {String}       props.qtyLoadingForNextLink Card link to more details
 * @return {ReactElement}                             The markup to render
 */
export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: {
        [constants.clinicalBeds]: false,
        [constants.icuBeds]: true,
        [constants.dischargesDeaths]: false,
      },
    };

    this.selectInfo = this.selectInfo.bind(this);
  }

  selectInfo(event) {
    const selected = event.target.value;

    const showInfo = {
      [constants.clinicalBeds]: false,
      [constants.icuBeds]: false,
      [constants.dischargesDeaths]: false,
    };
    showInfo[selected] = true;

    this.setState({
      showInfo,
    });
  }

  render() {
    const { region, info, link, qtyLoadingForNextLink } = this.props;
    const { showInfo } = this.state;

    const {
      ofertaHospCli,
      ofertaHospUti,
      ocupHospCli,
      ocupHospUti,
      altas,
      obitos,
    } = info;

    const dispHospCli = ofertaHospCli - ocupHospCli;
    const dispHospUti = ofertaHospUti - ocupHospUti;

    const linkParams = {
      pathname: link,
      props: {
        qtyLoadingForNextLink,
        region,
      },
    };

    const clinicalBeds = {
      show: showInfo[constants.clinicalBeds],
      infos: [
        { name: 'Ofertados', value: ofertaHospCli },
        { name: 'Ocupados', value: ocupHospCli },
        { name: 'Disponíveis', value: dispHospCli },
      ],
    };

    const icuBeds = {
      show: showInfo[constants.icuBeds],
      infos: [
        { name: 'Ofertados', value: ofertaHospUti },
        { name: 'Ocupados', value: ocupHospUti },
        { name: 'Disponíveis', value: dispHospUti },
      ],
    };

    const dischargesDeaths = {
      show: showInfo[constants.dischargesDeaths],
      infos: [
        { name: 'Altas', value: altas },
        { name: 'Óbitos', value: obitos },
      ],
    };

    return (
      <div className="card-container">
        <div className="card-header" title={ region.nome }>
          {region.nome}
        </div>

        <Select select={ this.selectInfo } />

        <div className="card-info-container">
          <Info { ...clinicalBeds } />
          <Info { ...icuBeds } />
          <Info { ...dischargesDeaths } />
        </div>

        <Link to={ linkParams }>mais detalhes</Link>
      </div>
    );
  }
}

Card.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sigla: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
  }).isRequired,
  info: PropTypes.shape({
    ofertaHospCli: PropTypes.number.isRequired,
    ofertaHospUti: PropTypes.number.isRequired,
    ocupHospCli: PropTypes.number.isRequired,
    ocupHospUti: PropTypes.number.isRequired,
    altas: PropTypes.number.isRequired,
    obitos: PropTypes.number.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
  qtyLoadingForNextLink: PropTypes.number.isRequired,
};
