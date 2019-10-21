import axios from 'axios';
import { formatUrl } from '../helper';
import { API_URL, API_LOGIN_PATH, API_REGISTER_PATH } from '../constants';

export default class Auth {
  constructor() {
    this.token_key_name = 'tk';
  }
  login(email, password) {
    const url = formatUrl(API_URL, API_LOGIN_PATH);
    return axios.post(url, { email, password });
  }
  register(username, email, password, password_confirmation) {
    const url = formatUrl(API_URL, API_REGISTER_PATH);
    return axios.post(url, { username, email, password, password_confirmation });
  }
  setUserToken(token) {
    if (!window) return;
    window.localStorage.setItem(this.token_key_name, token);
  }
  getUserToken() {
    if (!window) return;
    window.localStorage.getItem(this.token_key_name);
  }
}
