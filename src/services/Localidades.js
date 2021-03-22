/**
 * Obtém as regiões da API de localidades do IBGE.
 *
 * @return {Array}  Regiões brasileiras.
 */
export async function getRegions() {
  const endPoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes/';
  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
}

/**
 * Obtém os estados de uma região.
 *
 * @param {Number} regionId Id da região a ser consultada.
 * @return {Array}          Estados da região.
 */
export async function getStatesByRegion(regionId) {
  const endPoint = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regionId}/estados`;
  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
}
