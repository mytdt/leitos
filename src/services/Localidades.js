/**
 * Get all brazilian regions from de localidades do IBGE API.
 *
 * @return {Array}  brazilian regions.
 */
export async function getRegions() {
  const endPoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes/';
  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
}

/**
 * Get states from a region.
 *
 * @param {Number} regionId Region's Id to query.
 * @return {Array}          Region's states.
 */
export async function getStatesByRegion(regionId) {
  const endPoint = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regionId}/estados`;
  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
}

/**
 * Get cities from a state.
 *
 * @param {String} stateId State's Id to query.
 * @return {Array}         State's cities.
 */
export async function getCitiesByState(StateId) {
  const endPoint = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${StateId}/municipios`;
  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
}
