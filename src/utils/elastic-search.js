/**
 * Convert an array to string.
 *
 * @param {Array} array Array to be converted.
 * @return {String}     Converted array.
 */
const arrayToQuery = (array) => array.join(' AND ');

export default {
  arrayToQuery,
};
