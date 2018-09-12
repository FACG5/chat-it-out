const Router = require('express').Router();
const chat = require('./chat');
const doctors = require('./doctors');

Router.get('/chat', chat.get);
Router.get('/doctors', doctors.get);

module.exports = Router;
