const Router = require('express').Router();
const chat = require('./chat');
const articles = require('./articles');

Router.get('/chat', chat.get);
Router.get('/articles', articles.get);
module.exports = Router;
