const socketConfig = require('./socketConfig');
const app = require('./app');

const server = app.listen(app.get('port'), () => {
  console.log(`The server is running now at port ${app.get('port')}`);
});
socketConfig(server);
