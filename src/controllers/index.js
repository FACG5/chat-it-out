
const Router = require('express').Router();
const chat = require('./chat');
const signUp = require ('./signUp');
const signIn = require ('./signIn');
Router.get("/signUp", signUp.get);
Router.get('/signIn', signIn.get);
Router.get('/chat', chat.get);
 module.exports = Router;
