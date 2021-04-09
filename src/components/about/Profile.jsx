import React from 'react';
import PropTypes from 'prop-types';

import gitIcon from '../../images/git-icon.png';

const Profile = ({ contributor }) => (
  <div className="about-card-profile">
    <img src={ contributor.avatar_url } alt="Avatar icone" className="avatar" />
    <div className="inf-profile">
      <h4>{ contributor.name }</h4>
      <span className="inf">
        <img src={ gitIcon } alt="Git icone" className="git" />
        <a href={ contributor.html_url } target="blank">
          <p>{ contributor.login }</p>
        </a>
      </span>
    </div>
  </div>
);

Profile.propTypes = {
  contributor: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
