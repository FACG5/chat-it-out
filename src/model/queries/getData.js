const db = require('../database/db_connection.js');

exports.getArticles = () => {
  const sql = 'SELECT * FROM articles;';
  return db.query(sql);
};
