const Router = require('express').Router();
const home = require('./home');
const admin = require('./admin');
const article = require('./article');
const doctors = require('./doctors');

// Home Route
Router.get("/", home.get);

// Admin Routes
Router.get('/admin', admin.get);

// Article Routes
Router.get('/article', article.get);

// Doctors Routes
Router.get('/doctors', doctors.get);

module.exports = Router;
