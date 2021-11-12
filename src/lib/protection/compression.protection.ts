import express, { RequestHandler } from 'express';

import compression from 'compression';

const compressionMiddleware: RequestHandler = compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
});

export default (server: express.Express): void => {
  server.use(compressionMiddleware);
};
