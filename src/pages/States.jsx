import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import * as Localidades from '../services/Localidades';

import Loading from '../components/Loading';
import StateInfo from '../containers/StateInfo';

/**
 * List all states of a region.
 *
 * @return {ReactElement} The markup to render
 */
class States extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      states: [],
    };
  }

  componentDidMount() {
    this.getStates();
  }

  async getStates() {
    const { location } = this.props;
    const { region } = location.props;

    this.setState({
      loading: true,
    });

    const states = await Localidades.getStatesByRegion(region.id);

    this.setState({
      loading: false,
      states,
    });
  }

  render() {
    const { loading, states } = this.state;

    if (loading) {
      return <Loading />;
    }

    const { location } = this.props;
    const { region } = location.props;

    return (
      states.map((state) => {
        const props = {
          state,
          region,
        };

        return <StateInfo key={ state.id } props={ props } />;
      })
    );
  }
}

States.propTypes = {
  location: PropTypes.shape({
    props: PropTypes.shape({
      qtyLoadingForNextLink: PropTypes.number.isRequired,
      region: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(States);
