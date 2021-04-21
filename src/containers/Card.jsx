import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Select from '../components/card/Select';
import Info from '../components/card/Info';

import constants from '../constants';
import removeAccents from '../utils/remove-accents';

import '../styles/Card.scss';

/**
 * Card component that renders a single card.
 *
 * @param  {String}       props.name Card name
 * @param  {Object}       props.info Card info to display
 * @param  {String}       props.link Card link to more details
 * @return {ReactElement}            The markup to render
 */
class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: {
        [constants.icuBeds]: true,
        [constants.clinicalBeds]: false,
        [constants.dischargesDeaths]: false,
      },
    };

    this.selectInfo = this.selectInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const enterKey = 13;

    if (event.type === 'keydown' && event.keyCode !== enterKey) {
      return;
    }

    event.target.classList.toggle('only-header');
  }

  bedsInfo(offer, occupation) {
    const percOccupation = this.calculatePercentage(occupation, offer);
    const percAvailable = (offer === 0) ? 0 : (100 - percOccupation);

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
    if (total === 0 && value > 0) {
      return 100;
    }

    if (value <= 0 || total === 0) {
      return 0;
    }

    if (value > total) {
      return 100;
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
      [constants.icuBeds]: false,
      [constants.clinicalBeds]: false,
      [constants.dischargesDeaths]: false,
    };
    showInfo[selected] = true;

    this.setState({
      showInfo,
    });
  }

  render() {
    const { name, info, link, notification } = this.props;
    const { showInfo } = this.state;

    const {
      ofertaHospCli,
      ofertaHospUti,
      ocupHospCli,
      ocupHospUti,
      altas,
      obitos,
    } = info;

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

    let momentNotification = null;
    let notificationDate = null;
    let notificationRelative = null;

    if (notification) {
      momentNotification = moment(notification);
      notificationDate = momentNotification.format('DD/MM/YYYY HH:mm:ss');
      notificationRelative = `atualizado ${momentNotification.fromNow()}`;

      if (!momentNotification.isValid()) {
        notificationDate = 'última notificação não informada';
        notificationRelative = 'sem dados de atualização';
      }
    }

    return (
      <div
        className="card-container"
        onClick={ this.handleClick }
        onKeyDown={ this.handleClick }
        role="button"
        tabIndex="0"
      >
        <div className="card-header" title={ name }>
          { name }
        </div>

        <Select select={ this.selectInfo } />

        <div className="card-info-container">
          <Info { ...icuBeds } />
          <Info { ...clinicalBeds } />
          <Info { ...dischargesDeaths } />
        </div>

        { (!link)
          ? null
          : <Link to={ this.convertLink(link) }>mais detalhes</Link> }
        { (!notification)
          ? null
          : (
            <div className="card-notification" title={ notificationDate }>
              { notificationRelative }
            </div>
          ) }
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.shape({
    ofertaHospCli: PropTypes.number.isRequired,
    ofertaHospUti: PropTypes.number.isRequired,
    ocupHospCli: PropTypes.number.isRequired,
    ocupHospUti: PropTypes.number.isRequired,
    altas: PropTypes.number.isRequired,
    obitos: PropTypes.number.isRequired,
  }).isRequired,
  link: PropTypes.string,
  notification: PropTypes.string,
};

Card.defaultProps = {
  link: null,
  notification: null,
};

export default Card;
