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

export const stpAPI = {

  stpListPath: '/sysrouter/stpList',
  stpCreatePath: '/sysrouter/stp',
  stpSavePath: '/sysrouter/stp',
  stpGetPath: '/sysrouter/stp',

  //Получение списка STP
  async getStpList(params) {
    return instance.post(`${this.stpListPath}`, params, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  //создание STP
  async createStp(stp) {
    return instance.post(`${this.stpCreatePath}`, stp, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  async getStp(id){
    return instance.get(`${this.stpGetPath}/${id}`, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  //Обновить
  async saveStp(data, id) {
    return instance.put(`${this.stpSavePath}/${id}`, data, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  
}