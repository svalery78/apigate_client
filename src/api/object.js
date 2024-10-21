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

export const objectAPI = {

  objectListPath: '/sysrouter/objectList',
  objectPath: '/sysrouter/object',
  saveObjectPath: '/sysrouter/object',
  createObjectPath: '/sysrouter/object',
  сhangeStatusObjectPath: '/sysrouter/objectChangeStatus',

  //Получение списка обьектов
  async getObjectList(params) {
    return instance.post(`${this.objectListPath}`, params, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  //Получение данных объекта
  async getObject(id) {
    return instance.get(`${this.objectPath}/${id}`, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  //Сохранение объекта
  async saveObject(data, id) {
    return instance.put(`${this.saveObjectPath}/${id}`, data, { validateStatus: () => true })
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
  //Создание объекта
  async createObject(obj) {
    return instance.post(`${this.createObjectPath}`, obj, { validateStatus: () => true } )
      .then(response => {
        httpErrorHandler(response.status, response.data.message);
        return response.data
      })
  },
}

