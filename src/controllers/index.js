const Router = require('express').Router();
const doctors = require('./doctors');

Router.get('/doctors', doctors.get);

module.exports = Router;
