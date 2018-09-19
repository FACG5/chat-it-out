const db = require('../database/db_connection');

const insertArticle = (article) => {
  const {
    title,
    img,
    body,
  } = article;
  const sql = 'INSERT INTO articles (article_title, article_img, article_body) VALUES ($1, $2, $3) RETURNING article_id';
  return db.query(sql, [title, img, body]);
};

module.exports = { insertArticle };
