const express = require('express');
const path = require('path');

const app = express();

// Middlewares
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
