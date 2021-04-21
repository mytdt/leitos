import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

/**
 * Informations about a specific hospital.
 *
 * @param {Number} props.hospital.id   Id of hospital
 * @param {String} props.hospital.name Name of hospital
 * @param {String} props.link      Link of current url
 * @return {ReactElement}          The markup to render
 */
const HospitalInfo = ({ hospital }) => {
  const name = hospital._source.nomeCnes || hospital._source.cnes || 'Indefinido';
  const notification = hospital._source.dataNotificacaoOcupacao
    || '0000-00-00T03:00:00.000Z';

  const info = {
    ofertaHospCli: hospital._source.ofertaHospCli || 0,
    ofertaHospUti: hospital._source.ofertaHospUti || 0,
    ocupHospCli: hospital._source.ocupHospCli || 0,
    ocupHospUti: hospital._source.ocupHospUti || 0,
    altas: hospital._source.altas || 0,
    obitos: hospital._source.obitos || 0,
  };

  const props = {
    name,
    info,
    notification,
  };

  return <Card { ...props } />;
};

HospitalInfo.propTypes = {
  hospital: PropTypes.shape({
    _source: PropTypes.shape({
      cnes: PropTypes.string,
      nomeCnes: PropTypes.string,
      dataNotificacaoOcupacao: PropTypes.string,
      ofertaHospCli: PropTypes.number,
      ofertaHospUti: PropTypes.number,
      ocupHospCli: PropTypes.number,
      ocupHospUti: PropTypes.number,
      altas: PropTypes.number,
      obitos: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default HospitalInfo;
