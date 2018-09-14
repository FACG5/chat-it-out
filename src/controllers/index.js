const Router = require('express').Router();
const chat = require('./chat');
const admin = require('./admin');

Router.get('/chat', chat.get);
Router.get('/admin', admin.get);

module.exports = Router;
