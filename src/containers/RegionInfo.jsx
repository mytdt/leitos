import Info from './Info';
import * as Api from '../Services/Api';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default class RegionInfo extends Info {
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
    const { loading, info } = this.state;

    if (loading) {
      return <Loading />;
    }

    const { region } = this.props;

    return <Card key={region.id} info={info} name={region.nome} />;
  }
}
