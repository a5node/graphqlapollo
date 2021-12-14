import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import option from './option.config';
import env from './env.config';

export default {
  ...process.env,
  ...env,
  ...option,
};
