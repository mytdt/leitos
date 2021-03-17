import { Component } from 'react';
import RegionCard from './RegionCard';
import * as Api from '../Services/Api';

export default class Teste extends Component {
  constructor () {
    super();

    this.state = {
      loading: false,
      regions: [],
    };
  }

  componentDidMount() {
    this.setState({
      loading:true,
    });

    Api.getRegions()
      .then((res)=>{
        this.setState({
          loading: false,
          regions: res,
        });
      });
    }

    render() {
    const { loading, regions } = this.state;

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <div>
        <h1>
          <b>
            Número de leitos disponíveis por Região
          </b>
        </h1>
        <section>
          {
            regions.map((region) => {
              return <RegionCard key={region.nome} region={region}/>;
            })
          }
        </section>
      </div>
    );
  }
}
