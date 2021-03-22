/**
 * Round a value up or down according to it's key.
 *
 * @param {String}  key   Object key to check value.
 * @param {Number}  value Value to be deduced.
 * @return {Number}       Deduced value.
 */
const deduceValue = (key, value) => {
  if (Number.isInteger(value)) {
    return value;
  }

  const keysToCeil = [
    'ocupHospCli',
    'ocupHospUti',
    'obitos',
  ];

  if (keysToCeil.indexOf(key) !== -1) {
    return Math.ceil(value);
  }

  const keysToFloor = [
    'ofertaHospCli',
    'ofertaHospUti',
    'altas',
  ];

  if (keysToFloor.indexOf(key) === -1) {
    return Math.floor(value);
  }

  return 0;
};

/**
 * Analyze the hospital info to deduce some values.
 *
 * @param {Object} hospital Hospital's info.
 * @return {Object} Deduced info.
 */
const deduce = (hospital) => {
  Object.entries(hospital).forEach((keyValue) => {
    const [key, value] = keyValue;
    hospital[key] = deduceValue(key, value);
  });

  return hospital;
};

/**
 * Summation of all hospitals info.
 *
 * @param {Object} initialInfo Initial info for the sum.
 * @param {Array} hospitais    Hospitals' info.
 * @return {Object}            Consolidated info.
 */
export default function consolidateInfo(initialInfo, hospitais) {
  return hospitais.reduce((total, atual) => {
    const {
      ofertaHospCli = 0,
      ofertaHospUti = 0,
      ocupHospCli = 0,
      ocupHospUti = 0,
      altas = 0,
      obitos = 0,
    } = deduce(atual._source);

    total.ofertaHospCli += ofertaHospCli;
    total.ofertaHospUti += ofertaHospUti;
    total.ocupHospCli += ocupHospCli;
    total.ocupHospUti += ocupHospUti;
    total.altas += altas;
    total.obitos += obitos;

    return total;
  }, initialInfo);
}
