import React, { Component, Fragment } from 'react';
import { getEndpoints } from '../utils/api';
import AppBarTop from '../components/AppBarTop';
import EndpointsList from '../components/EndpointsList';
import { Root } from '../components/style';
class EndpointsRoute extends Component {
  state = {
    endpoints: [],
    totalCount: 0, 
    page: 1, 
    perPage: 5,
    sort: "id",
    filters: {
      status: '',
      service_profile: '',
      tariff_profile: '',
      last_updated: '',
      created: '',
      name: '',
      tags: '',
      ip_address: '',
      imei: ''
    },
  }

  async componentDidMount () {
    const { page, perPage, sort, filters } = this.state;
    this.fetchEndpoints(page, perPage, sort, filters);
  }

  fetchEndpoints = async (page, perPage, sort, filters) => {
    const filterStr = filters ? Object.keys(filters)
      .map(key => filters[key] && filters[key].length ? `${key}:${filters[key]}` : null)
      .filter(item => !!item)
      .join(',') : '';
    
    const { data, totalCount } = await getEndpoints(page, perPage, sort, filterStr);
    this.setState({ endpoints: data, totalCount, page, perPage, sort });
  }

  handleChangeFilter = (newFilter) => {
    const { page, perPage, sort } = this.state;
    this.fetchEndpoints(page, perPage, sort, newFilter);
  }

  handleChangePage = (event, newPage) => {
    const { perPage, sort, filters } = this.state;
    this.fetchEndpoints(newPage+1, perPage, sort, filters);
  }

  handleChangeRowsPerPage = (event) => {
    const perPage = parseInt(event.target.value, 10);
    const { page, sort, filters } = this.state;
    this.fetchEndpoints(page, perPage, sort, filters);
  }

  render() {
    const { endpoints, page, perPage, totalCount, filters } = this.state;
    console.log("Render table with params ==>", { page, perPage, totalCount });
    return (
    <Fragment>
      <AppBarTop />
      <Root>
        {
          (!endpoints) ? <h1> Loading ... </h1> :
          <EndpointsList 
              endpoints={endpoints} 
              page={page} 
              perPage={perPage} 
              totalCount={totalCount} 
              filters={filters}
              handleChangeFilter={this.handleChangeFilter}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        }
      </Root>
    </Fragment>
    )
  }
}

export default EndpointsRoute;