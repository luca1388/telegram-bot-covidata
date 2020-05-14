const axios = require('axios').default;

const baseUrl = require('./constants').telegramApiBaseUrl;
const token = require('./constants').telegramApiToken;

const axiosTelegram = axios.create({
    baseURL: baseUrl + token + '/'
});

exports.axiosTelegram = axiosTelegram;