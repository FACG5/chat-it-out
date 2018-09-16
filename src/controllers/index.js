
const Router = require('express').Router();
const chat = require('./chat');
const admin = require('./admin');
const article = require('./article');
const signUp = require ('./signUp');
const signIn = require ('./signIn');
Router.get("/signUp", signUp.get);
Router.get('/signIn', signIn.get);
Router.get('/chat', chat.get);
Router.get('/admin', admin.get);
Router.get('/article', article.get);

module.exports = Router;

