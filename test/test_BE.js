const tape = require('tape');
const supertest = require('supertest');
const app = require('./../src/app.js');


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
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The response should be html');
      t.end();
    });
});

tape('check the admin page route', (t) => {
  supertest(app)
    .get('/articles')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.ok(res.text.includes('body'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The response should be html');
      t.end();
    });
});

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
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'the respone  should be html file');
      t.end();
    });
});
