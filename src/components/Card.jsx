import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  render() {
    const { name, loading, info } = this.props;
    const {
      ofertaHospCli,
      ofertaHospUti,
      ocupHospCli,
      ocupHospUti,
      altas,
      obitos,
    } = info;

    if (loading) {
      return <p>loading...</p>;
    }

    return(
      <section className='container-card'>
        <div className='header-card'>
          <h3>
            {name}
          </h3>
        </div>
        <div>
          <section className="inf-region">
          <p>
            <b>
              Leitos Clínicos Ofertados: {ofertaHospCli}
            </b>
          </p>
          <p>
            <b>
              Leitos de UTI Ofertados: {ofertaHospUti}
            </b>
          </p>
          <p>
            <b>
              Leitos Clínicos Ocupados: {ocupHospCli}
            </b>
          </p>
          <p>
            <b>
              Leitos de UTI Ocupados: {ocupHospUti}
            </b>
          </p>
          <p>
            <b>
              Total de Óbitos: {obitos}
            </b>
          </p>
          <p>
            <b>
              Total de Altas: {altas}
            </b>
          </p>
          </section>
        </div>
      </section>
    );
  }
}
