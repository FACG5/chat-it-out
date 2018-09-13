BEGIN;

DROP TABLE IF EXISTS users,articles,contacts,chats CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY ,
	user_name VARCHAR(100) NOT NULL,
	user_email TEXT NOT NULL UNIQUE,
	user_password TEXT,
	permission  VARCHAR(100) DEFAULT 'user'
);
INSERT INTO users (user_name,user_email,user_password,permission) VALUES
('salwa','salwa@hotmail.com','123','admin');

INSERT INTO users (user_name,user_email,user_password,permission) VALUES
('ons','ons@hotmail.com','1861997','doctor'),
('kannan','kannan@hotmail.com','rami','doctor'),
('mohanned','mohanned@hotmail.com','fofo','doctor');

CREATE TABLE articles (
article_id SERIAL PRIMARY KEY ,
article_title VARCHAR(250) NOT NULL,
article_img TEXT ,
article_body TEXT NOT NULL
);

INSERT INTO articles  (article_title,article_img,article_body) VALUES
('lorem1','https://source.unsplash.com/1600x900/?nature,water','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
('lorem2','https://source.unsplash.com/1600x900/?nature,flower','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
('lorem3','https://source.unsplash.com/1600x900/?nature,bird','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

CREATE TABLE contacts (
contact_id SERIAL PRIMARY KEY ,
name VARCHAR(250) NOT NULL,
email TEXT NOT NULL,
subject TEXT NOT NULL,
content TEXT NOT NULL
);
INSERT INTO contacts  (name,email,subject,content) VALUES
('mohanned','mohanned@hotmail.com','sad','I am so sad so sad , I want to kill myself');

CREATE TABLE chats (
	id SERIAL PRIMARY KEY ,
	sender INTEGER REFERENCES users(user_id),
	receiver INTEGER REFERENCES users(user_id),
	message TEXT
);

COMMIT;
