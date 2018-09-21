const Router = require('express').Router();
const home = require('./home');
const admin = require('./admin');
const article = require('./article');
const articles = require('./articles');
const doctors = require('./doctors');
const signUp = require('./signUp');
const signIn = require('./signIn');
const doctor = require('./doctor');
const { clientError, serverError } = require('./error');

// Home Route
Router.get('/', home.get);

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

// Doctor Routes
Router.get('/doctors/:id', doctor.get);

// Erorr Handling MiddleWare
Router.use(clientError);
Router.use(serverError);

module.exports = Router;
