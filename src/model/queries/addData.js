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

const insertDoctor = (doctor) => {
  const {
    name,
    email,
    password,
    image,
    description,
  } = doctor;
  const sql = 'INSERT INTO users (user_name,user_email,user_password,doctor_image,doctor_description,permission) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id';
  return db.query(sql, [name, email, password, image, description, 'doctor']);
};


module.exports = { insertArticle, insertDoctor };
