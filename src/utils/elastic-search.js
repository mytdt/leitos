/**
 * Convert an array to string.
 *
 * @param {Array} array Array to be converted.
 * @return {String}     Converted array.
 */
const arrayToQuery = (array) => {
  const arrayToFormate = array.map((element) => {
    const result = element.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return result;
  });

  return arrayToFormate.join(' AND ');
};

export default {
  arrayToQuery,
};
