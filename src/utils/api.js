import axios from 'axios';
import get from 'lodash/get';

const baseEndpoint = "https://cdn.emnify.net/api/v1";
const token = "";

export const getEndpoints = (page = 1, perPage = 20, sort = "id") => {
    const params = {
        page,
        per_page: perPage,
        sort
    }
    return axios({
        url: `${baseEndpoint}/endpoint`,
        method: 'GET',
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        console.log("Api result =>", res);
        return {
            totalCount: parseInt(get(res, 'headers[x-total-count]', 0), 10),
            data: res.data
        }
    }).catch(e => {
        console.log("Fetch endpoints error =>", e);
        return [];
    });
}

export const getAuth = (params) => {

    console.log(params);

    return axios.post(`${baseEndpoint}/authenticate`, params)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });

    // return axios({
    //     url: `${baseEndpoint}/authenticate`,
    //     method: 'POST',
    //     data: JSON.stringify(params),
    //     headers: {
    //         'Accept':'application/json',
    //         'Content-Type':'application/json'
    //     }
    // }).then(res => {
    //     console.log("Api result =>", res);
    //     return res.data;
    // }).catch(e => {
    //     console.log("Fetch endpoints error =>", e);
    //     return e;
    // });
}