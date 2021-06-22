import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as GitIcon } from '../../icons/github.svg';

import '../../styles/about/Profile.scss';

const Profile = ({ contributor }) => (
  <a href={ contributor.html_url } target="blank" className="about-card-profile">
    <img src={ contributor.avatar_url } alt="Avatar" className="avatar" />
    <div className="profile">
      <GitIcon focusable="false" aria-hidden="true" />
      <div className="info">
        <h4>{ contributor.name }</h4>
        <span>{ contributor.location }</span>
      </div>
    </div>
  </a>
);

Profile.propTypes = {
  contributor: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
