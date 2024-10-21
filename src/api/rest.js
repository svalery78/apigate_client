import axios from 'axios';
import { httpErrorHandler } from '../utils/errors';
import Cookie from 'js-cookie';
const cfg = require('../config/config');

// const environment = cfg.environment; //Среда. В зависимости от среды будут разные адреса. На проде нужен 1 порт на все сервисы, на локалхосте много портов, для каждого свой

const instance = axios.create({
  baseURL: cfg.microservicesPort ? cfg.microservicesUrl + ':' + cfg.microservicesPort : cfg.microservicesUrl
});
instance.interceptors.request.use(function (config) {
  config.headers['x-access-token'] = Cookie.get('token');
  config.headers['x-user-id'] = Cookie.get('userId');
  return config;
});

export const restAPI = {

  restListPath: '/sysrouter/restList',
  restSavePath: '/sysrouter/rest',
  restGetPath: '/sysrouter/rest',
  restRepeatPath: '/sysrouter/repeatRequest',

  // повтор запроса
  async repeatRequest(id) {
    return instance.post(`${this.restRepeatPath}`, { restId: id }, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },

  // Получить список
  async getRestList(params) {
    return instance.post(`${this.restListPath}`, params, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },

  // Получить запись
  async getRest(id) {
    return instance.get(`${this.restGetPath}/${id}`, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  }
}

