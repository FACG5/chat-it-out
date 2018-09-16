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
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});

//test the /article ( Article Page ) route
tape('check the article page route', (t) => {
  supertest(app)
    .get('/article')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err)
        t.error(err);
      t.ok(res.text.includes('body'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});
