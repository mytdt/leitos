/**
 * Remove accents from a given string.
 *
 * @param {String} value The string to remove accents.
 * @return {String}      New string without accents.
 */
const removeAccents = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default removeAccents;
