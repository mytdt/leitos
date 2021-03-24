import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Select from '../components/card/Select';
import Info from '../components/card/Info';

import constants from '../constants';
import removeAccents from '../utils/remove-accents';

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

  bedsInfo(offer, occupation) {
    const percOccupation = this.calculatePercentage(occupation, offer);
    const percAvailable = 100 - percOccupation;

    let available = offer - occupation;
    if (available < 0) {
      available = 0;
    }

    return [
      {
        name: 'Ofertados',
        value: offer,
      },
      {
        name: 'Ocupados',
        value: occupation,
        percentage: {
          value: percOccupation,
          class: this.cssClass(percOccupation, 'low'),
        },
      },
      {
        name: 'Disponíveis',
        value: available,
        percentage: {
          value: percAvailable,
          class: this.cssClass(percAvailable, 'high'),
        },
      },
    ];
  }

  calculatePercentage(value, total) {
    if (value > total) {
      return 100;
    }

    if (value < 0) {
      return 0;
    }

    return parseInt((value * 100) / total, 10);
  }

  convertLink(link) {
    return removeAccents(link).replace(/\s/g, '+').toLowerCase();
  }

  cssClass(percentage, better) {
    const betterOptions = ['low', 'high'];

    if (betterOptions.indexOf(better) === -1) {
      return '';
    }

    const percentageOptions = {
      high: [10, 25, 50, 100], // eslint-disable-line no-magic-numbers
      low: [50, 75, 90, 100], // eslint-disable-line no-magic-numbers
    };

    for (let i = 0; i < percentageOptions[better].length; i += 1) {
      if (percentage <= percentageOptions[better][i]) {
        return `${better}-perc-lte-${percentageOptions[better][i]}`;
      }
    }
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

    const linkParams = {
      pathname: this.convertLink(link),
      props: {
        qtyLoadingForNextLink,
        region,
      },
    };

    const icuBeds = {
      show: showInfo[constants.icuBeds],
      infos: this.bedsInfo(ofertaHospUti, ocupHospUti),
    };

    const clinicalBeds = {
      show: showInfo[constants.clinicalBeds],
      infos: this.bedsInfo(ofertaHospCli, ocupHospCli),
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
          <Info { ...icuBeds } />
          <Info { ...clinicalBeds } />
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
