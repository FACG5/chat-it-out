const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const Router = require('./controllers/index');

const app = express();

// Middlewares
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Router);

// Hanldebars settings
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', (handlebars({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',

})));

module.exports = app;
