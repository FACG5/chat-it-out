BEGIN;

DROP TABLE IF EXISTS users,articles, suggestions,chats CASCADE;

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
user_name VARCHAR(20) NOT NULL UNIQUE,
user_email TEXT NOT NULL UNIQUE,
user_password TEXT NOT NULL,
doctor_image TEXT DEFAULT 'https://myblue.bluecrossma.com/sites/g/files/csphws636/files/inline-images/Doctor%20Image%20Desktop.png',
doctor_description TEXT,
permission VARCHAR(10) DEFAULT 'user'
);

CREATE TABLE articles (
article_id SERIAL PRIMARY KEY,
article_title VARCHAR(100) NOT NULL,
article_img TEXT DEFAULT 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/614/cached.offlinehbpl.hbpl.co.uk/news/ORP/mentalhealth12-2016101210022372.jpg',
article_body TEXT NOT NULL
);


CREATE TABLE suggestions (
suggestion_id SERIAL PRIMARY KEY,
name VARCHAR(20) NOT NULL,
email TEXT NOT NULL,
subject TEXT NOT NULL,
content TEXT NOT NULL
);


CREATE TABLE chats (
id SERIAL PRIMARY KEY,
sender VARCHAR(20) REFERENCES users(user_name) NOT NULL,
receiver VARCHAR(20) REFERENCES users(user_name) NOT NULL,
message TEXT NOT NULL
);


COMMIT;
