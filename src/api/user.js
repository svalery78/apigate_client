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

export const userAPI = {

    userListPath: '/sysrouter/userList',
    userGetPath: '/sysrouter/user',
    userSavePath: '/sysrouter/user',

    //Получение пользователей
    async getUserList(params) {
        return instance.post(`${this.userListPath}`, params, { validateStatus: () => true })
            .then(response => {
                httpErrorHandler(response.status, response.data.message);
                return response.data
            })
    },
    //Получение пользователя
    async getUser(id) {
        return instance.get(`${this.userGetPath}/${id}`, { validateStatus: () => true })
            .then(response => {
                httpErrorHandler(response.status, response.data.message);
                return response.data
            })
    },
    //Обновление пользователя
    async saveUser(data, id) {
        return instance.put(`${this.userSavePath}/${id}`, data, { validateStatus: () => true })
            .then(response => {
                httpErrorHandler(response.status, response.data.message);
                return response.data
            })
    },
}