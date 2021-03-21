import React from 'react';
import * as Api from '../Services/Api';

export default class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      regions: [],
      states: [],
      info: {
        ofertaHospCli: 0,
        ofertaHospUti: 0,
        ocupHospCli: 0,
        ocupHospUti: 0,
        altas: 0,
        obitos: 0,
      },
    }
  }


  arrayToQuery(array) {
    return array.join(' AND ');
  }

  deduceValue(key, value) {
    if (Number.isInteger(value)){
      return value;
    }

    const keysToCeil = [
      'ocupHospCli',
      'ocupHospUti',
      'obitos',
    ];

    if (keysToCeil.indexOf(key) !== -1) {
      return Math.ceil(value);
    }

    const keysToFloor = [
      'ofertaHospCli',
      'ofertaHospUti',
      'altas',
    ]

    if (keysToFloor.indexOf(key) === -1) {
      return Math.floor(value);
    }

    return 0;
  }

  deduceInf(hospital) {
    Object.entries(hospital).forEach((keyValue) => {
      const [ key, value ] = keyValue;
      hospital[key] = this.deduceValue(key, value);
    });

    return hospital;
  }

  consolidateInf(hospitais) {
    const { info: initialInfo } = this.state;

    const info = hospitais.reduce((total, atual)=>{
      const {
        ofertaHospCli = 0,
        ofertaHospUti = 0,
        ocupHospCli = 0,
        ocupHospUti = 0,
        altas = 0,
        obitos = 0,
      } = this.deduceInf(atual._source);

      total.ofertaHospCli += ofertaHospCli;
      total.ofertaHospUti += ofertaHospUti;
      total.ocupHospCli += ocupHospCli;
      total.ocupHospUti += ocupHospUti;
      total.altas += altas;
      total.obitos += obitos;

      return total;

    }, initialInfo);

    this.setState({
      info,
    });
  }

  componentDidMount() {
    this.getInf();
  }

}
