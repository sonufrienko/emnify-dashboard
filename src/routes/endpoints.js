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
    filters: "",
  }

  async componentDidMount () {
    const { page, perPage, sort, filters } = this.state;
    this.fetchEndpoints(page, perPage, sort, filters);
  }

  fetchEndpoints = async (page, perPage, sort, filters) => {
    const { data, totalCount } = await getEndpoints(page, perPage, sort, filters);
    this.setState({ endpoints: data, totalCount, page, perPage, sort });
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
    const { endpoints, page, perPage, totalCount } = this.state;
    console.log("Render table with params ==>", { page, perPage, totalCount });
    return (
    <Fragment>
      <AppBarTop />
      <Root>
        {
          (!endpoints || endpoints.length === 0) ? <h1> Loading ... </h1> :
          <EndpointsList 
              endpoints={endpoints} 
              page={page} 
              perPage={perPage} 
              totalCount={totalCount} 
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