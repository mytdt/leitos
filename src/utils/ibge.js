import constants from '../constants';

import removeAccents from './remove-accents';

/**
 * Get a region by it's name.
 *
 * @param  {String} name Name of region
 * @return {Object}      Region
 */
const getRegionByName = (name) => (
  constants.regions.find((region) => (
    removeAccents(region.name).toLowerCase() === removeAccents(name).toLowerCase()
  ))
);

/**
 * Get all states of a region.
 *
 * @param {Number} regionId Region id to search states.
 * @return {Array}          States of region
 */
const getStatesByRegion = (regionId) => (
  constants.states.filter((state) => (
    parseInt(state.id / 10, 10) === regionId
  ))
);

/**
 * Get a state by it's name.
 *
 * @param  {String} name Name of state
 * @return {Object}      State
 */
const getStateByName = (name) => (
  constants.states.find((state) => (
    removeAccents(state.name).toLowerCase() === removeAccents(name).toLowerCase()
  ))
);

export default {
  getStatesByRegion,
  getRegionByName,
  getStateByName,
};
