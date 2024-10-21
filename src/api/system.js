import axios from 'axios';
import { httpErrorHandler } from '../utils/errors'
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

export const systemAPI = {

  systemListPath: '/sysrouter/systemList',
  systemSavePath: '/sysrouter/system',
  systemCreatePath: '/sysrouter/system',
  systemGetPath: '/sysrouter/system',

  //Получение данных списка Системы
  async getSystemList(params) {
    return instance.post(`${this.systemListPath}`, params, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
        
      })
  },

  //Обновить
  async saveSystem(data, id) {
    return instance.put(`${this.systemSavePath}/${id}`, data, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },

  //создать
  async createSystem(data, id) {
    return instance.post(`${this.systemCreatePath}/${id}`, data, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },

  // Получить
  async getSystem(id) {
    return instance.get(`${this.systemGetPath}/${id}`, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
}



