const Router = require('express').Router();
const chat = require('./chat');
const admin = require('./admin');
const article = require('./article');

Router.get('/chat', chat.get);
Router.get('/admin', admin.get);
Router.get('/article', article.get);

module.exports = Router;
