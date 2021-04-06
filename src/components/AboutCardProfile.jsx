import React from 'react';
import PropTypes from 'prop-types';
import Git from '../services/Git';
import gitIcon from '../images/git-icon.png';

export default class CardProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: true,
    };

    this.isMountedComponent = false;
  }

  componentDidMount() {
    this.isMountedComponent = true;

    const { login } = this.props;
    this.getInfoUser(login);
  }

  componentWillUnmount() {
    this.isMountedComponent = false;
  }

  async getInfoUser(login) {
    const user = await Git.getSingleContributor(login);
    console.log(user);

    if (!this.isMountedComponent) {
      return;
    }

    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return (
        <div>
          <p> LOADING...</p>
        </div>
      );
    }

    return (
      <div className="about-card-profile">
        <img src={ user.avatar_url } alt="Avatar icone" className="avatar" />
        <div className="inf-profile">
          <h4>{ user.name }</h4>
          <span className="inf">
            <img src={ gitIcon } alt="Git icone" className="git" />
            <a href={ user.html_url } target="blank">
              <p>{ user.login }</p>
            </a>
          </span>
        </div>
      </div>
    );
  }
}

CardProfile.propTypes = {
  login: PropTypes.string.isRequired,
};
