const tape = require('tape');
const supertest = require('supertest');
const app = require('./../src/app.js');
const db_build = require('./../src/model/database/db_build');
const db_demo_build = require('./../src/model/database/db_demo_build');
const addUser = require('./../src/model/queries/addUser');

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
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The response should be html');
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
    .get('/article')
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

//test the /signIn ( Login Page ) Route
tape(' Check The Sign in Page Route', (t) => {
  supertest(app)
    .get('/signIn')
    .expect('Content-type', /html/)
    .expect(200)
    .end((err, res) => {
      if (err)
        t.error(err)
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
        t.error(err)
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('signup'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    })
});

//test /sign up (add user ) Route
tape('Check Adding Taken User To DB', (t) => {
  db_build((err, result) => {
    db_demo_build((err, result) => {
      supertest(app)
        .post('/signUp')
        .send({ username: 'ahmed', email: 'a2hmed@ahmed.com', password: '123456789Q' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err)
            t.error(err);
          t.deepEquals(response.text, JSON.stringify({ Error: "The Email Or Username Taken" }), ' The Result Should Be Error The User Taken');
          t.end();
        });
    });

  });
});

//test /sign up (add user ) Route
tape('Check Adding Taken Email To DB', (t) => {
  db_build((err, result) => {
    db_demo_build((err, result) => {
      supertest(app)
        .post('/signUp')
        .send({ username: 'a2hmed', email: 'ahmed@ahmed.com', password: '123456789Q' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err)
            t.error(err);
          t.deepEquals(response.text, JSON.stringify({ Error: "The Email Or Username Taken" }), ' The Result Should Be Error The User Taken');
          t.end();
        });
    });

  });
});

//test /sign up (add user ) Route
tape('Check Adding Right User To DB', (t) => {
  db_build((err, result) => {
    db_demo_build((err, result) => {
      supertest(app)
        .post('/signUp')
        .send({ username: 'a2hmed', email: 'ahm2ed@ahmed.com', password: '123456789Q' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err)
            t.error(err);
          t.deepEquals(response.text, JSON.stringify({ result: "/signIn" }), ' The Result Should Be Error The User Taken');
          t.end();
        });
    });
  });
});

//test /sign up (add user ) Route
tape('Check Adding Wrogn  User  Object To DB', (t) => {
  db_build((err, result) => {
    db_demo_build((err, result) => {
      supertest(app)
        .post('/signUp')
        .send({ username: 'a2hmed', password: '123456789Q' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err)
            t.error(err);
          t.deepEquals(response.text, JSON.stringify({"Error":"There Is Error"}), ' The Result Should Be Error The User Taken');
          t.end();
        });
    });
  });
});

// Test Add User Query 
tape(' Check add Right User by AddUser Query ', (t) => {

  db_build((err, result) => {
    db_demo_build((err, result) => {
      addUser({ username: "rami", email: "rami@rami.com", password: "123456789Q" }, (err, result) => {
        if (err)
          t.error(err);
        else
          t.equal(result.rows.length, 0, 'The Row Count Of Result Should Equal Zero');
        t.end();
      });
    });
  });

});

// Test Add User Query 
tape(' Check add taken User (username) by AddUser Query ', (t) => {

  db_build((err, result) => {
    db_demo_build((err, result) => {
      addUser({ username: "ahmed", email: "rami@rami.com", password: "123456789Q" }, (err, result) => {
        t.equal(err['code'], '23505', ' the error code should eqaul 23505');
        t.end();
      });
    });
  });

});

// Test Add User Query 
tape(' Check add taken User (email) by AddUser Query ', (t) => {

  db_build((err, result) => {
    db_demo_build((err, result) => {
      addUser({ username: "rami", email: "ahmed@ahmed.com", password: "123456789Q" }, (err, result) => {
        t.equal(err['code'], '23505', ' the error code should eqaul 23505');
        t.end();
      });
    });
  });

});

// Test Add User Query 
tape(' Check add Wrong Object by AddUser Query ', (t) => {

  db_build((err, result) => {
    db_demo_build((err, result) => {
      addUser({ username: "rami" }, (err, result) => {
        t.ok(err);
        t.end();
      });
    });
  });
});




