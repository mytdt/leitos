import { Component } from 'react';
import axios from 'axios';

export default class Teste extends Component {
  constructor() {
    super();

    this.doFetch = this.doFetch.bind(this);
  }

  async doFetch() {
    const endPoint = 'https://elastic-leitos.saude.gov.br/leito_ocupacao/_search';

    let myHeader = new Headers();
    myHeader.append("Authorization","Basic " + btoa('user-api-leitos:aQbLL3ZStaTr38tj'));
    // myHeader.append("Authorization","Basic dXNlci1hcGktbGVpdG9zOmFRYkxMM1pTdGFUcjM4dGo=");
    // myHeader.append("Content-Type","application/json");

    let requestOptions = {
      method: 'GET',
      withCredentials: true,
      auth: {
        username: 'user-api-leitos',
        password: 'aQbLL3ZStaTr38tj',
      }
    };

    // const result = await fetch(endPoint, requestOptions).then((response) => response.json());
    const result = await axios.get(endPoint, requestOptions);

    return result;
  }

  render() {
    return (
      <button onClick={this.doFetch}>Fetch!</button>
    );
  }
}
