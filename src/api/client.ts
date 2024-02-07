/**
 * @file client request
 * @author linyuhan
 */

import axios from 'axios';
import { baseURL } from 'store/constant';

const apiClient = axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
        'Content-type': 'applcation/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
        config.auth = {
            username,
            password
        };
    }
    return config;
});

export default apiClient;