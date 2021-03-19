import React from 'react';
import Info from './Info';
import * as Api from '../Services/Api';
import Card from '../components/Card';

export default class Region extends Info {
  async getStates() {
    const { region } = this.props;
    const states = await Api.getStatesByRegion(region.id);

    return states.map((state) => state.sigla);
  }

  async getInf() {
    this.setState({
      loading: true,
    });

    const states = await this.getStates();
    const query = this.arrayToQuery(states);

    const hospitais = await Api.doFetchByStates(query);

    this.setState({
      loading: false,
      states: this.consolidateInf(hospitais.hits),
    });
  }


  render() {
    const { region } = this.props;
    const { loading } = this.state;
    const props = {
      info: this.info,
      loading,
      name: region.nome,
    };

    return <Card {...props} />;
  }
}
