import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthenticationAPI } from '../constants/endpoints';

const baseURL = import.meta.env.VITE_BACKEND_API_URL;

const api = async (endpoint, method, body, params, customHeaders = {}) => {
  const token = Cookies.get('Authorization');
  const isFormData = body instanceof FormData;

  console.log('api params with id', params);

  const url = endpoint.replace(/:\w+/g, (match) => {
    const key = match.slice(1);
    return params[key] || match;
  });

  const headers = {
    Authorization: `Bearer ${token}`,
    ...(isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' }),
    ...customHeaders,
  };

  try {
    const response = await axios({
      method: method,
      url: `${baseURL}${url}`,
      headers: headers,
      data: body,
      params: params,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const API = {
  // AUTHENTICATION API //
  login: (body) => api(AuthenticationAPI.login, 'post', body),
  // END AUTHENTICATION API //
};
