import { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import { HttpError, ErrorPayload } from './http-errors';

export default (app: Express): void => {
  app.use((req: Request, res: Response, next: NextFunction): void => {
    const err: ErrorPayload = new Error('Requested page not found.');
    req.on('error', () => {});
    res.on('error', () => {});
    err.code = 911;
    err.status = 404;
    next(err);
  });
  app.use((err: ErrorPayload & ErrorRequestHandler & { status: number }, req: Request, res: Response): void => {
    const code = err.code || err.status;
    const status = err.status;
    const message = err.message || 'Internal Server Error';
    req.on('error', () => {});
    if (err instanceof HttpError) {
      res.status(err.status).json(err.json());
      return;
    }
    res.status(status).json({
      success: false,
      error: {
        message,
        code,
      },
    });
  });
  app.use(
    (err: ErrorPayload & ErrorRequestHandler & { status: number }, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        req.on('error', () => {});
        return next(err);
      } else if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({
          success: false,
          error: {
            code: 400,
            message: err.message,
            stack: err.stack,
          },
        });
        return;
      } else {
        res.status(err.status).send({
          success: false,
          error: {
            code: err.code || 400,
            message: err.message,
            stack: err.stack,
          },
        });
        return;
      }
    },
  );
};
