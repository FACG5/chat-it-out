const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

const dburl = '';
dburl = process.env.DB_URL;
if (!dburl) throw new Error('DB_URL MISSING');

const params = url.parse(dburl);
const [username, password] = params.auth.split(':');

const options = {
  password,
  user: username,
  port: params.port,
  host: params.hostname,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNICTIONS || 2,
  ssl: params.hostname !== 'localhost',
};

module.exports = new Pool(options);
