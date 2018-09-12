const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`The server is running now at port ${app.get('port')}`);
});
