'use strict';

import morgan from 'morgan';
import winston from 'winston';

const { format } = winston;

export const logger = winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((msg) => {
      return `${msg.timestamp} [${msg.level}] ${msg.message}`;
    })
  ),
  transports: [new winston.transports.Console({ level: 'http' })],
});

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

export const errorHandler = (error, request, response) => {
  const status = error?.status || 500;
  logger.error(`${error.message} - ${request?.originalUrl}`, request);

  if (response) response.status(status).json(error.message);
};
