const Router = require('express').Router();
const home = require('./home');
const admin = require('./admin');
const article = require('./article');
const articles = require('./articles');
const doctors = require('./doctors');
const signUp = require('./signUp');
const signIn = require('./signIn');
const chat = require('./chat');

// Home Route
Router.get('/', home.get);

// Chat Routes
Router.get('/chat', chat.get);

// Sign up Routes
Router.get('/signUp', signUp.get);
Router.post('/signUp', signUp.post);

// Sign In Routes
Router.route('/signIn')
  .get(signIn.get)
  .post(signIn.post);

// Admin Routes
Router.get('/admin', admin.get);
Router.post('/admin/addArticle', admin.addArticle);

// Article Routes
Router.get('/article/:id', article.get);

// Home Routes
Router.get('/', home.get);

// Doctors Routes
Router.get('/doctors', doctors.get);

// Articles Routes
Router.get('/articles', articles.get);

module.exports = Router;
