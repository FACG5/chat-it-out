const Router = require('express').Router();
const doctors = require('./doctors');
const admin = require('./admin');
const article = require('./article');
const articles = require('./articles');

Router.get('/articles', articles.get);
Router.get('/admin', admin.get);
Router.get('/article', article.get);
Router.get('/doctors', doctors.get);

module.exports = Router;
