const tape = require('tape');
const supertest = require('supertest');
const app = require('./../src/app.js');
const dbBuild = require('./../src/model/database/db_build');
const dbDemoBuild = require('./../src/model/database/db_demo_build');
const addUser = require('./../src/model/queries/addUser');
const getUser = require('./../src/model/queries/getUser');

// test the / ( Home Page )route
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
      t.ok(res.text.includes('showcase'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();

    });
});

// test the /doctors  ( Doctors Page )route
tape('Check /doctors Route', (t) => {
  dbBuild((err) => {
    if (err) {
      t.end();
    }
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
});

// test the /admin ( Admin Page ) route
tape('check user with admin permission', (t) => {
  supertest(app)
    .get('/admin')
    .expect(200)
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwicGVybWlzc2lvbiI6ImFkbWluIn0.0ZK65Sez_8cTHYcZlq28RipXMIh1XzwiJcD3pcgz1S4'])
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('admin'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});

// test the /admin ( Admin Page ) route
tape('check user without admin permission', (t) => {
  supertest(app)
    .get('/admin')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwicGVybWlzc2lvbiI6InBhdGlhbnQifQ.0bMPIylzKehxDZrBFSTXrV5nvZs38qU15s611Ambnp4'])
    .expect(302)
    .expect('Content-Type', /plain/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.text, 'Found. Redirecting to /', ' The Response Should Be Redirect');
      t.end();
    });
});

// test the /article ( Article Page ) route
tape('check the article page route', (t) => {
  supertest(app)
    .get('/article/1')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.ok(res.text.includes('body'));
      t.ok(res.text.includes('article_img'));
      t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
      t.end();
    });
});

// test the /articles (Articles Page ) route
tape('check the articles page route', (t) => {
  dbBuild((err) => {
    if (err) {
      return t.end();
    }
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
});

// test the /signIn ( Login Page ) Route
tape(' Check The Sign in Page Route', (t) => {
  supertest(app)
    .get('/signIn')
    .expect('Content-type', /html/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.ok(res.text.includes('body'));
        t.ok(res.text.includes('login'));
        t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
        t.end();
      }
    });
});

// test the /signUp (Sign Up Page ) Route
tape(' Check The Sign Up Page Route', (t) => {
  supertest(app)
    .get('/signUp')
    .expect(200)
    .expect('Content-type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.ok(res.text.includes('body'));
        t.ok(res.text.includes('signup'));
        t.equal(res.text.substr(0, 15), '<!DOCTYPE html>', 'The Response Should Be Html Page');
        t.end();
      }
    });
});

// test /sign up (add user ) Route
tape('Check Adding Taken User To DB', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      supertest(app)
        .post('/signUp')
        .send({ username: 'ahmed', email: 'ahmed@ahmed.com', password: '123456789Q' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err) {
            t.error(err);
          } else {
            t.deepEquals(response.text, JSON.stringify({ Error: 'The Email Or Username Taken' }), ' The Result Should Be Error The User Taken');
            t.end();
          }
        });
    });
  });
});

// test /sign up (add user ) Route
tape('Check Adding Taken Email To DB', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      supertest(app)
        .post('/signUp')
        .send({ username: 'a2hmed', email: 'ahmed@ahmed.com', password: '123456789Q' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err) {
            t.error(err);
          } else {
            t.deepEquals(response.text, JSON.stringify({ Error: 'The Email Or Username Taken' }), ' The Result Should Be Error The User Taken');
            t.end();
          }
        });
    });

  });
});

// test /sign up (add user ) Route
tape('Check Adding Right User To DB', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      supertest(app)
        .post('/signUp')
        .send({ username: 'a2hmed', email: 'ahm2ed@ahmed.com', password: '123456789Q' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err) {
            t.error(err);
          } else {
            t.deepEquals(response.text, JSON.stringify({ result: '/signIn' }), ' The Result Should Be Error The User Taken');
            t.end();
          }
        });
    });
  });
});

// test /sign up (add user ) Route
tape('Check Adding Wrogn  User  Object To DB', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      supertest(app)
        .post('/signUp')
        .send({ username: 'a2hmed', password: '123456789Q' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err) {
            t.error(err);
          } else {
            t.deepEquals(response.text, JSON.stringify({ Error: 'There Is Error' }), ' The Result Should Be Error The User Taken');
            t.end();
          }
        });
    });
  });
});

// Test Add User Query ;
tape(' Check add Right User by AddUser Query ', (t) => {

  dbBuild(() => {
    dbDemoBuild(() => {
      addUser({ username: 'rami', email: 'rami@rami.com', password: '123456789Q' }, (err, result) => {
        if (err) {
          t.error(err);
        } else {
          t.equal(result.rows.length, 0, 'The Row Count Of Result Should Equal Zero');
          t.end();
        }
      });
    });
  });
});

// Test Add User Query  
tape(' Check add taken User (username) by AddUser Query ', (t) => {

  dbBuild(() => {
    dbDemoBuild(() => {
      addUser({ username: 'ahmed', email: 'rami@rami.com', password: '123456789Q' }, (err) => {
        t.equal(err.code, '23505', ' the error code should eqaul 23505');
        t.end();
      });
    });
  });

});

// Test Add User Query ;
tape(' Check add taken User (email) by AddUser Query ', (t) => {

  dbBuild(() => {
    dbDemoBuild(() => {
      addUser({ username: 'rami', email: 'ahmed@ahmed.com', password: '123456789Q' }, (err) => {
        t.equal(err.code, '23505', ' the error code should eqaul 23505');
        t.end();
      });
    });
  });
});

// Test Add User Query ;
tape(' Check add Wrong Object by AddUser Query ', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      addUser({ username: 'rami' }, (err) => {
        t.ok(err);
        t.end();
      });
    });
  });
});

// Test Sign In Page ;
tape('Check Sign In With Wrong Username', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      supertest(app)
        .post('/signIn')
        .send({ username: 'jaz', password: '123456789Q' })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, response) => {
          if (err) {
            t.error(err);
          } else {
            t.deepEqual(JSON.parse(response.text), { Error: 'Check Username Or Password' }, 'The Response Should be check user or passowrd');
          }
          t.end();
        });
    });
  });
});

// Test Sign In Page ; 
tape(' Check Sign In With Wrong Password ', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      supertest(app)
        .post('/signIn')
        .send({ username: 'ahmed', password: 'wrong password' })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, response) => {
          if (err) {
            t.error(err);
          } else {
            t.deepEqual(JSON.parse(response.text), { Error: 'Check Username Or Password' }, 'The Response Should be checj User or Password ');
            t.end();
          }
        });
    });
  });
});

// Test Sign In Page ;
tape(' Check Sign in with right username and password ', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      supertest(app)
        .post('/signIn')
        .send({ username: 'ahmed', password: '123456789Q' })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, response) => {
          if (err) {
            t.error(err);
          } else {
            t.deepEqual(JSON.parse(response.text), { result: '/' }, 'The Response Should Be Href To Home Route')
          }
          t.end();
        });
    });
  });
});

// Test Get User  Query ;
tape(' Check Get User With Exists Query DB ', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      getUser({ username: 'ahmed', password: '123456789Q' }, (err, result) => {
        if (err) {
          t.error(err);
        } else {
          t.equal(result.rows.length, 1, 'the result Count equal 1');
          t.end();
        }
      });
    });
  });
});

// Test Get User Query ;
tape(' Check Get User With N-Exists Query DB', (t) => {
  dbBuild(() => {
    dbDemoBuild(() => {
      getUser({ username: 'ramihassan', password: 'hassouna' }, (err, result) => {
        if (err) {
          t.error(err);
        } else {
          t.equal(result.rows.length, 0, 'The Result Count Eqaul 0');
          t.end();
        }
      });
    });
  });
});
tape.onFinish = () => { process.exit(0); };
