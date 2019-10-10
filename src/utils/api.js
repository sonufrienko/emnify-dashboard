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