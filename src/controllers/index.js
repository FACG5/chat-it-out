const Router = require('express').Router();
const chat = require('./chat');
const articles = require('./articles');
const article = require('./article');

Router.get('/chat', chat.get);
Router.get('/articles', articles.get);
Router.get('/article', article.get);
module.exports = Router;
