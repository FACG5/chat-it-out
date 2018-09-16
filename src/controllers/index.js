const Router = require('express').Router();
const chat = require('./chat');
const home = require('./home');
const admin = require('./admin');
const article = require('./article');
Router.get("/", home.get);
Router.get('/chat', chat.get);
Router.get('/admin', admin.get);
Router.get('/article', article.get);

module.exports = Router;
