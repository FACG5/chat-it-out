const Router = require('express').Router();
const home = require('./home');
const admin = require('./admin');
const article = require('./article');
const articles = require('./articles');
const doctors = require('./doctors');
const signUp = require('./signUp');
const signIn = require('./signIn');
const chat = require('./chat');
const signOut = require('./signOut');
const addSuggestion = require('./suggestion');
const { clientError, serverError } = require('./error');
const { get, addArticle, addDoctor, addDoctorDB } = require('./admin');

// Home Route
Router.get('/', home.get);

// Chat Routes
Router.route('/chat')
  .get(chat.get)
  .post(chat.post);

// Sign up Routes
Router.get('/signUp', signUp.get);
Router.post('/signUp', signUp.post);

// Sign In Routes
Router.route('/signIn')
  .get(signIn.get)
  .post(signIn.post);

// Admin Routes
Router.get('/admin', get);
Router.post('/admin/addArticle', addArticle);
Router.route('/addDoctor')
  .get(addDoctor)
  .post(addDoctorDB);

// Article Routes
Router.get('/article/:id', article.get);

// Home Routes
Router.get('/', home.get);

// Doctors Routes
Router.get('/doctors', doctors.get);

// Articles Routes
Router.get('/articles', articles.get);

// Sign Out Routes ;
Router.get('/signout', signOut.get);

// Add Suggestions ;
Router.post('/contactUs', addSuggestion.post);

// Erorr Handling MiddleWare
Router.use(clientError);
Router.use(serverError);

module.exports = Router;
