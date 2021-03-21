import { Component } from 'react';
import Loading from '../components/Loading';
import RegionInfo from '../containers/RegionInfo';
import * as Api from '../Services/Api';

export default class Regions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      regions: [],
    }
  }

  async getRegions() {
    this.setState({
      loading: true,
    });

    const regions = await Api.getRegions();

    this.setState({
      loading: false,
      regions,
    });
  }

  componentDidMount() {
    this.getRegions();
  }

  render() {
    const { loading, regions } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      regions.map((region) => {
        return <RegionInfo key={region.id} region={region}/>;
      })
    );
  }
}
