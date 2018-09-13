const tape = require('tape');
const supertest = require('supertest');
const app = require('./../src/app');

tape('check the article page route', (t) => {
  supertest(app)
    .get('/article')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.ok(res.text.includes('body'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The response should be html');
      t.equal(res.header['content-type'], 'text/html; charset=utf-8', 'Should return text/html');
      t.end();
    });
});
