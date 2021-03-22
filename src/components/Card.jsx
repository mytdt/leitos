import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Card.css';

/**
 * Card component that renders a single card.
 * @param  {String}       props.name Card name
 * @param  {Object}       props.info Card info to display
 * @param  {String}       props.info Card link to more details
 * @return {ReactElement}            The markup to render
 */
const Card = ({ name, info, link }) => {
  const {
    ofertaHospCli,
    ofertaHospUti,
    ocupHospCli,
    ocupHospUti,
    altas,
    obitos,
  } = info;

  return (
    <section className="container-card">
      <div className="header-card">
        <h3>
          {name}
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
      <Link to={ `/${link}` }>+ DETALHES</Link>
    </section>
  );
};

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
  link: PropTypes.string.isRequired,
};

export default Card;
