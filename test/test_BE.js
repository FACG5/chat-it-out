
const tape = require ('tape');
const supertest = require ('supertest');
const app = require ('./../src/app.js');
//test the home route
tape('test for home route ', (t) => {
    supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
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

tape('check the admin page route', (t) => {
  supertest(app)
    .get('/admin')
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
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The response should be html');
      t.end();
    });
});
