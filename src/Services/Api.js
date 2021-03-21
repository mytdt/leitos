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

export async function doFetchBySingleState(stateSlg) {
  return doFetch({match:{estadoSigla: stateSlg}});
}

export async function doFetchByStates(acronymState) {
  const query = {"match": {"estadoSigla": {"query": acronymState}}};

  return doFetch(query);
}

// -------------IBGE FETCH API------------------------------
export async function getRegions() {
  const endPoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes/';
  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
}

export async function getStatesByRegion(region) {
  const endPoint = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${region}/estados`;
  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
}
