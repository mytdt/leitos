import React, { Component } from 'react';

import * as Localidades from '../services/Localidades';

import Loading from '../components/Loading';
import RegionInfo from '../containers/RegionInfo';

/**
 * List all regions.
 *
 * @return {ReactElement} The markup to render
 */
export default class Regions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      regions: [],
    };
  }

  componentDidMount() {
    this.getRegions();
  }

  async getRegions() {
    this.setState({
      loading: true,
    });

    const regions = await Localidades.getRegions();

    this.setState({
      loading: false,
      regions,
    });
  }

  render() {
    const { loading, regions } = this.state;

    const numberOfRegions = 5;

    if (loading) {
      const jsxLoading = [];
      for (let i = 0; i < numberOfRegions; i += 1) {
        jsxLoading.push(<Loading key={ i } />);
      }

      return jsxLoading;
    }

    return (
      regions.map((region) => <RegionInfo key={ region.id } region={ region } />)
    );
  }
}
