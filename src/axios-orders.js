import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-cf2ee.firebaseio.com/'
});

export default instance;
