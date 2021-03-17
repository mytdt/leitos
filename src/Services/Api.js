async function doFetch(query) {
  const endPoint = 'http://mytdt.com.br/api-leitos/';

    const data = {
      size: 10000,
      query: query,
    }

    let requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
    };

    const result = await fetch(endPoint, requestOptions)
      .then((response) => response.json())
      .then((result) => result.hits);

      return result;
}

export async function doFetchAll() {
  return doFetch({match_all: {}});
}

export async function doFetchByState(stateSlg) {
  return doFetch({match:{estadoSigla: stateSlg}});
}

// async function getIdByRegion(state) {
//   const endPoint = `https://servicodados.ibge.gov.br/api/v1/localidades/estados${state}`
//   const result = await fetch(endPoint)
//     .then((res)=>res);

//   return result;
// }

export async function getRegions() {
  return fetch('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/')
  .then((res)=>res.json());
}

export async function getStatesByRegion(region) {
  const regions = {
    Norte: "1",
    Nordeste: "2",
    Sudeste: "3",
    Sul: "4",
    CentroOeste: "5",
  }

  const stateNumber = regions[region];
  const endPoint = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${stateNumber}/estados`

  const result = await fetch(endPoint);
  return result;
}
