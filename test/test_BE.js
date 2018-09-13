const tape = require ('tape');
const supertest = require ('supertest');
const app = require ('./../src/app.js');
//test the home route
tape('test for home route ', (t) => {
    supertest(app)
      .get('/')
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
  //test the sign-in route
  tape('test for sign-up', (t) => {
    supertest(app)
      .get('/signIn')
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
  //test the sign-up route
  tape('test for sign-up', (t) => {
    supertest(app)
      .get('/signUp')
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