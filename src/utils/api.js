import axios from 'axios';
import get from 'lodash/get';
import {localStore} from './store';

const baseEndpoint = "https://cdn.emnify.net/api/v1";
const token = localStore.get('jwt');

const checkErrorStatus  = (error) => {
    if(error && error.response && error.response.status === 401) {
        localStore.delete('jwt');
        window.location.href('/');
    }
}

export const getEndpoints = (page = 1, perPage = 20, sort = "id", filters = "") => {
    const params = {
        page,
        per_page: perPage,
        sort,
        q: filters
    }
    return axios({
        url: `${baseEndpoint}/endpoint`,
        method: 'GET',
        params,
        headers: {
          'Authorization': `Bearer ${localStore.get('jwt')}`
        }
    }).then(res => {
        console.log("Api result =>", res);
        return {
            totalCount: parseInt(get(res, 'headers[x-total-count]', 0), 10),
            data: res.data
        }
    }).catch(e => {
        checkErrorStatus(e);
        console.log("Fetch endpoints error =>", e);
        return [];
    });
}

export const getAuth = (params) => {

    return axios.post(`${baseEndpoint}/authenticate`, params)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {        
        return {
            error: error.response.status,
        }
      });
}