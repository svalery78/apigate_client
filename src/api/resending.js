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

export const resendingAPI = {
  resendingListPath: '/sysrouter/resendingList',
  resendingCreatePath: '/sysrouter/resending',
  resendingSavePath: '/sysrouter/resending',
  resendingGetPath: '/sysrouter/resending',

  //Получение списка STP
  async getResendingList(params) {
    return instance.post(`${this.resendingListPath}`, params, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  //создание STP
  async createResending(resending) {
    return instance.post(`${this.resendingCreatePath}`, resending, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  async getResending(id){
    return instance.get(`${this.resendingGetPath}/${id}`, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  //Обновить
  async saveResending(data, id) {
    return instance.put(`${this.resendingSavePath}/${id}`, data, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  
}