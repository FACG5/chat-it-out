
const Router = require('express').Router();
const doctors = require('./doctors');
const admin = require('./admin');
const article = require('./article');
const signUp = require ('./signUp');
const signIn = require ('./signIn');

// Sign up Routes
Router.get("/signUp", signUp.get);

// Sign In Routes
Router.get('/signIn', signIn.get);

// Sign In Admin
Router.get('/admin', admin.get);

// Sign In Article
Router.get('/article', article.get);

// Sign In Doctors
Router.get('/doctors', doctors.get);

module.exports = Router;

