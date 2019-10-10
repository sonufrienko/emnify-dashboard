import React, { Component } from 'react';
import EndpointsList from '../components/EndpointsList';
import { getEndpoints } from '../utils/api';
class EndpointsRoute extends Component {
  state = {
    endpoints: [],
    totalCount: 0, 
    page: 1, 
    perPage: 5,
    sort: "id"
  }

  async componentDidMount () {
    const { page, perPage, sort } = this.state;
    this.fetchEndpoints(page, perPage, sort);
  }

  fetchEndpoints = async (page, perPage, sort ) => {
    const { data, totalCount } = await getEndpoints(page, perPage, sort);
    this.setState({ endpoints: data, totalCount, page, perPage, sort });
  }

  handleChangePage = (event, newPage) => {
    const { perPage, sort } = this.state;
    this.fetchEndpoints(newPage+1, perPage, sort);
  }

  handleChangeRowsPerPage = (event) => {
    const perPage = parseInt(event.target.value, 10);
    const { page, sort } = this.state;
    this.fetchEndpoints(page, perPage, sort);
  }

  render() {
    const { endpoints, page, perPage, totalCount } = this.state;
    console.log({page, perPage, totalCount});
    if (!endpoints || endpoints.length === 0) return <h1> Loading ... </h1>
    return (
      <EndpointsList 
        endpoints={endpoints} 
        page={page} 
        perPage={perPage} 
        totalCount={totalCount} 
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    )
  }
}

export default EndpointsRoute;
