import axios from 'axios';
import get from 'lodash/get';

const baseEndpoint = "https://cdn.emnify.net/api/v1";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXB1dGlrZXdAY3JlYXppb25pc2EuY29tIiwiYXVkIjoiXC9hcGlcL3YxXC9hdXRoZW50aWNhdGlvbiIsImVzYy5hcHAiOm51bGwsImFwaV9rZXkiOiIwcjh4NDlEcjh1Nm9taklKRDF5Ukc5N1gwSE9ST0JEYjgwdFhISTdZIiwiZXNjLnVzZXIiOjE5OTEyNCwiZXNjLm9yZyI6NDE5MiwiZXNjLm9yZ05hbWUiOiJNaWNoYWVsIFN0cmVpbmVyIFRlc3QiLCJpc3MiOiJzcGMtZnJvbnRlbmQwMDFAc3BjLWZyb250ZW5kIiwiZXhwIjoxNTcwNzE3NDk3LCJlc2Mucm9sZXMiOlsyLDNdLCJpYXQiOjE1NzA3MDMwOTd9.w1UzFqfpAYeb6HWyLwxC2QIm0zTZEzfOccv3V7rA0l0mPLmuLsIqouS668SL4dv8tMdF4auUaqoXSiNadUFgBA";

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