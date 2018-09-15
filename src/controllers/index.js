const Router = require('express').Router();
const chat = require('./chat');
const article = require('./article');

Router.get('/chat', chat.get);
Router.get('/article', article.get);

module.exports = Router;
