const tape = require('tape');
const supertest = require('supertest');
const app = require('./../src/app');


// Test Doctors Route
tape('Check /chat Route', (t) => {
  supertest(app)
    .get('/chat')
    .expect(200)
    .expect('Content-type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.ok(res.text.includes('body'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'the respone  should be html file');
      t.end();
    });
});
