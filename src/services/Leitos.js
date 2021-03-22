import elasticSearch from '../utils/elastic-search';

/**
 * Get all data from Leitos API of OpenDataSUS based on Elastic Search.
 *
 * @param {Object} query Query to be applied in Elastic Search pattern.
 * @return {Array}       Hospital's data.
 */
async function doFetch(query) {
  const endPoint = 'http://mytdt.com.br/api-leitos/';

  const data = {
    size: 10000,
    query,
  };

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
  };

  const result = await fetch(endPoint, requestOptions)
    .then((response) => response.json())
    .then((json) => json.hits);

  return result;
}

/**
 * Get data from all brazilian's hospitals.
 *
 * @return {Array} Hospital's data.
 */
export async function doFetchAll() {
  const result = await doFetch({ match_all: {} });

  return result;
}

/**
 * Get data from multiples state's hospitals.
 *
 * @param {Array} acronymStates States acronyms.
 * @return {Array}              Hospital's data.
 */
export async function doFetchByStates(acronymStates) {
  const states = elasticSearch.arrayToQuery(acronymStates);

  const query = { match: { estadoSigla: { query: states } } };

  const result = await doFetch(query);

  return result.hits;
}

/**
 * Get data from a single state's hospitals.
 *
 * @param {String} acronymState Acronym of state.
 * @return {Array}              Hospital's data.
 */
export async function doFetchBySingleState(acronymState) {
  const result = await doFetch({ match: { estadoSigla: acronymState } });

  return result.hits;
}
