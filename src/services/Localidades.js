/**
 * Get all brazilian regions from IBGE API.
 *
 * @return {Array} Brazilian regions.
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
 * @param {Number} regionId Region's id to query.
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
 * @param {String} stateId State's id to query.
 * @return {Array}         State's cities.
 */
export async function getCitiesByState(stateId) {
  const endPoint = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`;
  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  const cities = result.map((city) => (
    {
      id: city.id,
      name: city.nome,
    }
  ));

  return cities;
}
