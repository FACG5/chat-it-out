const Router = require('express').Router();
const articles = require('./articles');

Router.get('/articles', articles.get);
module.exports = Router;
