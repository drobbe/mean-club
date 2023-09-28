import mongoose from 'mongoose';
import { server } from './express.js';
import { init } from './initDB.js';

function serve() {
  const config = setEnvironment();

  startServer(config);
}

function setEnvironment() {
  if (!process.env.NODE_ENV) {
    console.error(
      'No configuration file found for "' +
        process.env.NODE_ENV +
        '" environment'
    );

    process.exit(1);
  }
  return process.env;
}

function initExpress() {
  return server();
}

function initDB() {
  init();
}

function startServer(config) {
  mongoose
    .connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (db) {
      let app = initExpress();

      app.listen(config.port, () => {
        console.log(
          'Bookclub started using the "' +
            process.env.NODE_ENV +
            '" environment configuration on port ' +
            config.port +
            '!'
        );
        initDB();
      });
    });
}

serve();
