'use strict';

import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import routesCore from './src/core/routes.js';
import { authenticateTokenMidleware } from './src/core/auth.js';
import { morganMiddleware, logger, errorHandler } from './logger.js';

export const server = function () {
  let app = express();

  enableCors(app);
  useBodyParser(app);
  loadRoutes(app);

  return app;
};

function enableCors(app) {
  app.use(cors());
  app.options('*', cors()); // include before other routes
}

function loadRoutes(app) {
  app.use('/', routesCore);
}

function useBodyParser(app) {
  // Request body parsing middleware should be above methodOverride
  app.use((req, res, next) => {
    bodyParser.json({ limit: '50mb', extended: true })(req, res, (err) => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(authenticateTokenMidleware);
  app.use(morganMiddleware);
}
