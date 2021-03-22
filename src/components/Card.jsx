import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Card.css';

/**
 * Card component that renders a single card.
 *
 * @param  {String}       props.region                Region data
 * @param  {Object}       props.info                  Card info to display
 * @param  {String}       props.link                  Card link to more details
 * @param  {String}       props.qtyLoadingForNextLink Card link to more details
 * @return {ReactElement}                             The markup to render
 */
const Card = ({ region, info, link, qtyLoadingForNextLink }) => {
  const {
    ofertaHospCli,
    ofertaHospUti,
    ocupHospCli,
    ocupHospUti,
    altas,
    obitos,
  } = info;

  const linkParams = {
    pathname: link,
    props: {
      qtyLoadingForNextLink,
      region,
    },
  };

  return (
    <section className="container-card">
      <div className="header-card">
        <h3>
          {region.nome}
        </h3>
      </div>
      <div>
        <section className="inf-region">
          <p>
            <b>
              Leitos Clínicos Ofertados:
              {' '}
              {ofertaHospCli}
            </b>
          </p>
          <p>
            <b>
              Leitos de UTI Ofertados:
              {' '}
              {ofertaHospUti}
            </b>
          </p>
          <p>
            <b>
              Leitos Clínicos Ocupados:
              {' '}
              {ocupHospCli}
            </b>
          </p>
          <p>
            <b>
              Leitos de UTI Ocupados:
              {' '}
              {ocupHospUti}
            </b>
          </p>
          <p>
            <b>
              Total de Óbitos:
              {' '}
              {obitos}
            </b>
          </p>
          <p>
            <b>
              Total de Altas:
              {' '}
              {altas}
            </b>
          </p>
        </section>
      </div>
      <Link to={ linkParams }>+ DETALHES</Link>
    </section>
  );
};

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

export default Card;
