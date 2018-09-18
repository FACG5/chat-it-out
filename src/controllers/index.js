
const Router = require('express').Router();
const home = require('./home');
const admin = require('./admin');
const article = require('./article');
const articles = require('./articles');
const doctors = require('./doctors');
const signUp = require('./signUp');
const signIn = require('./signIn');
const { clientError, serverError } = require('./error');

// Home Route
Router.get('/', home.get);

// Sign up Routes
Router.get('/signUp', signUp.get);

// Sign In Routes
Router.get('/signIn', signIn.get);

// Admin Routes
Router.get('/admin', admin.get);

// Article Routes
Router.get('/article', article.get);

// Home Routes
Router.get('/', home.get);

// Doctors Routes
Router.get('/doctors', doctors.get);

// Articles Routes
Router.get('/articles', articles.get);

// Erorr Handling MiddleWare
Router.use(clientError);
Router.use(serverError);

module.exports = Router;
