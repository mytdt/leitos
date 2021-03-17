import React from 'react';
import * as Api from '../Services/Api'

require('./RegionCard.css');

export default class RegionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      region: this.props,
    }
  }

  componentDidMount() {
    this.getInf();
  }

  async getInf() {
    await console.log(Api.doFetchAll().then((res)=>res));
  }

  render() {
    const { region } = this.props;
    return(
      <section className='container-card'>
        <div className='header-card'>
          <h3>
            {region.nome}
          </h3>
        </div>
        <div>
          <p>inf</p>
        </div>
      </section>
    );
  }
}