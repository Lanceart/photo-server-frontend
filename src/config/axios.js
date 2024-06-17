import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const USER_ID = 123;

const axiosClient = axios.create({
  baseURL,
  headers: {
    // 'imageid': USER_ID,
    
  },
});

export default axiosClient;
