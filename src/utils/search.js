import removeAccents from './remove-accents';

const includes = (search, value) => (
  removeAccents(value).toLowerCase().includes(removeAccents(search).toLowerCase())
);

export default {
  includes,
};
