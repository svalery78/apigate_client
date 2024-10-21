import axios from 'axios';
import { httpErrorHandler } from '../utils/errors'
import Cookie from 'js-cookie';

const cfg = require('../config/config');
// const environment = cfg.environment;

const instance = axios.create({
    baseURL: cfg.microservicesPort ? cfg.microservicesUrl + ':' + cfg.microservicesPort : cfg.microservicesUrl
});

instance.interceptors.request.use(function (config) {
    config.headers['x-access-token'] = Cookie.get('token');
    config.headers['x-user-id'] = Cookie.get('userID');
    return config;
});

export const authAPI = {

    signinUserPath: '/sysrouter/signin',
    signupUserPath: '/sysrouter/signup',
    signoutUserPath: '/sysrouter/signout',

    //добавление
    async signupUser(user) {
        return instance.post(this.signupUserPath, user, { validateStatus: () => true })
            .then(response => {
                httpErrorHandler(response.status, response.data.message);
                return response.data
            })
    },
    //авторизация (login)
    async signinUser(user) {
        return instance.post(this.signinUserPath, user, { validateStatus: () => true })
            .then(response => {
                httpErrorHandler(response.status, response.data.message);
                return response.data
            })
    },
    //logout
    async signoutUser(user) {
        return instance.post(this.signoutUserPath, user, { validateStatus: () => true })
            .then(response => {
                httpErrorHandler(response.status, response.data.message);
                return response.data;
            })
    },
}