const Router = require('express').Router();
const chat = require('./chat');

Router.get('/chat', chat.get);

module.exports = Router;
