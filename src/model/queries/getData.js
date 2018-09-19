const db = require('./../database/db_connection');

exports.getDoctors = () => {
  const sql = "SELECT * FROM users WHERE permission = 'doctor'";
  return db.query(sql);
};

exports.getArticles = () => {
  const sql = 'SELECT * FROM articles;';
  return db.query(sql);
};

exports.getArticle = (id) => {
  const sql = 'SELECT * FROM articles WHERE article_id = $1';
  return db.query(sql, [id]);
};
