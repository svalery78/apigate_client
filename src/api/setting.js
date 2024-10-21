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

export const settingAPI = {

    settingListPath: '/sysrouter/settingList',
    settingCreatePath: '/sysrouter/setting',
    settingSavePath: '/sysrouter/setting',
    settingGetPath: '/sysrouter/setting',

  async getSettingList(params) {
    return instance.post(`${this.settingListPath}`, params, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  async createSetting(setting) {
    return instance.post(`${this.settingCreatePath}`, setting, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  async getSetting(id){
    return instance.get(`${this.settingGetPath}/${id}`, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  async saveSetting(data, id) {
    return instance.put(`${this.settingSavePath}/${id}`, data, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
}