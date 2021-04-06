const getContributors = async () => {
  const endPoint = 'https://api.github.com/repos/mytdt/leitos/contributors';

  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
};

const getSingleContributor = async (contributor) => {
  const endPoint = `https://api.github.com/users/${contributor}`;

  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
};

export default {
  getContributors,
  getSingleContributor,
};
