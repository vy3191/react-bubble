import { token } from '../constants/localStorage';
import axios from 'axios';

 export function axiosWithAuth() {
   return axios.create({
      baseURL: 'http://localhost:5000',
      headers: {
        authorization: localStorage.getItem(token)
      }
   })
}