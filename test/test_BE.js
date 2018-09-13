const tape = require('tape');
const supertest = require('supertest');
const app = require('./../src/app.js');

tape('test for /articles route ', (t) => {
  supertest(app)
    .get('/articles')
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.ok(res.text.includes('body'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'the respone  should be html file');
      t.equal(res.header['content-type'], 'text/html; charset=utf-8', 'the content-type should equal html');
      t.end();
    });
});
