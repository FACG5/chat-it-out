const tape = require('tape');
const supertest = require('supertest');
const app = require('./../src/app.js');


//test the / ( Home Page )route
tape('test for home route ', (t) => {
  supertest(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err)
        t.error(err);
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('showcase'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();

    });
});


//test the /doctors  ( Doctors Page )route
tape('Check /doctors Route', (t) => {
  supertest(app)
    .get('/doctors')
    .expect(200)
    .expect('Content-type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('doctors'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});

//test the /admin ( Admin Page ) route
tape('check the admin page route', (t) => {
  supertest(app)
    .get('/admin')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err)
        t.error(err);
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('admin'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});

//test the /article ( Article Page ) route
tape('check the article page route', (t) => {
  supertest(app)
    .get('/article/1')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err)
        t.error(err);
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('article_img'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});

tape('check the articles page route', (t) => {
  supertest(app)
    .get('/articles')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.ok(res.text.includes('body'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'the respone  should be html file');
      t.end();
    });
});

//test the /signIn ( Login Page ) Route
tape(' Check The Sign in Page Route', (t) => {
  supertest(app)
    .get('/signIn')
    .expect('Content-type', /html/)
    .expect(200)
    .end((err, res) => {
      if (err)
        t.error(err);
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('login'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});

//test the /signUp (Sign Up Page ) Route
tape(' Check The Sign Up Page Route', (t) => {
  supertest(app)
    .get('/signUp')
    .expect(200)
    .expect('Content-type', /html/)
    .end((err, res) => {
      if (err)
        t.error(err);
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('signup'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});
