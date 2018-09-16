const Router = require('express').Router();
const articles = require('./articles');
const doctors = require('./doctors');
const admin = require('./admin');
const article = require('./article');

Router.get('/admin', admin.get);
Router.get('/article', article.get);
Router.get('/doctors', doctors.get);
Router.get('/articles', articles.get);

module.exports = Router;
