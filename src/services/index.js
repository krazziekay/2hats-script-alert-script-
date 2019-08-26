import axios from 'axios';

const URL = 'https://trackapi.nutritionix.com/v2/';

const HEADER = {
  'x-app-id': '9a063781',
  'x-app-key': '2d771b16b3efbe76dfc878be582f890b',
  'x-remote-user-id': 0
};

const Request = (endpoint, method = 'GET', params = []) => axios({
  url: `${URL}${endpoint}`,
  method,
  data: params,
  headers: HEADER
});


export default Request;