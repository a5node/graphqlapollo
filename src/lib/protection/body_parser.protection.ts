import express from 'express';
import bodyParserMiddleware from 'body-parser';

//body-parser option
const option = {
  json: { limit: '4mb' },
  urlencoded: { extended: false, limit: '4mb' },
};

export default (server: express.Express): void => {
  server.use(bodyParserMiddleware.json(option.json));
  server.use(bodyParserMiddleware.urlencoded(option.urlencoded));
};
