import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import GitHubButton from 'react-github-btn';

import { ReactComponent as LeftArrow } from '../icons/left-arrow.svg';

import '../styles/Header.scss';

const Header = () => {
  const { pathname } = useLocation();

  const pathnameToArray = pathname.match(/[^/]+/g) || [];
  const pathLevel = pathnameToArray.length;
  const levels = [
    { id: 0, name: 'Home' },
    { id: 1, name: 'Regiões' },
    { id: 2, name: 'Estados' },
    { id: 3, name: 'Cidades' },
  ];

  const currentLevel = levels.find((level) => level.id === pathLevel) || levels[0];

  pathnameToArray.pop();
  const backLink = `/${pathnameToArray.join('/')}`;

  let backButton = true;
  if (currentLevel.id === 0) {
    backButton = false;
  }

  let linkClasses = 'link';
  if (backButton) {
    linkClasses += ' has-icon';
  }

  return (
    <div className="header">
      <div className="bar transparent">
        <div className="bar-left">
          <Link to={ backLink } className={ linkClasses }>
            { backButton
              ? <LeftArrow />
              : null }
            { currentLevel.name }
          </Link>
        </div>

        <div className="bar-center">
          Leitos
        </div>

        <div className="bar-right">
          <Link className="about" to="/about">Sobre</Link>

          <GitHubButton
            href="https://github.com/mytdt/leitos"
            data-size="large"
            data-show-count="true"
            aria-label="Star mytdt/leitos on GitHub"
          >
            GitHub
          </GitHubButton>
        </div>
      </div>

      <div className="title">
        Leitos
      </div>

      <div className="subtitle">
        { 'powered by ' }
        <a href="https://opendatasus.saude.gov.br/">
          openDataSUS
        </a>
      </div>
    </div>
  );
};

export default Header;
