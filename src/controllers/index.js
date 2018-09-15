const Router = require('express').Router();
const chat = require('./chat');
const home = require('./home');
Router.get("/", home.get);
Router.get('/chat', chat.get);

module.exports = Router;
