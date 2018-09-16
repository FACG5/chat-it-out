const db = require('../db_connection');

exports.getArticles = () => {
  const sql = 'SELECT * FROM articles;';
  return db.query(sql);
};
