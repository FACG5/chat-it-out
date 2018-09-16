const Router = require('express').Router();
const doctors = require('./doctors');
const admin = require('./admin');
const article = require('./article');

Router.get('/admin', admin.get);
Router.get('/article', article.get);
Router.get('/doctors', doctors.get);

module.exports = Router;
