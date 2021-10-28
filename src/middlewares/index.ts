'use strict';
import express from 'express';

import protection from '../lib/protection';

export default (app: express.Express): void => {
  protection(app);
};
