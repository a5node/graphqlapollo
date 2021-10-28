import crypto from 'crypto';
import { promisify } from 'util';

import { ErrorEx } from '../errors/error-ex';

export const PasswordLength = 128;
export const SaltLen = 16;
export const Iterations = 10000;
export const Digest = 'sha512';
export const PassLong = 7;

export const hashPassword = async (password: string, salt?: string): Promise<string> => {
  salt = salt || crypto.randomBytes(SaltLen).toString('hex').slice(0, SaltLen);
  const hash = await promisify(crypto.pbkdf2)(password, salt, Iterations, PasswordLength, Digest);

  return [salt, Iterations.toString(), hash.toString('hex')].join('.');
};

export const createPassword = (long?: number): string =>
  crypto
    .randomBytes(long || PassLong)
    .toString('hex')
    .slice(0, long || PassLong)
    .toUpperCase();

export const checkPassword = async (hashed: string, password: string): Promise<boolean> => {
  try {
    const [salt, iterations, hash] = hashed.split('.');

    if (!iterations || !hash) {
      throw new Error('Credentials invalid');
    }

    const checkHashed = await hashPassword(password, salt);

    if (checkHashed !== hashed) {
      throw new Error('Credentials invalid');
    }

    return true;
  } catch (error) {
    throw new ErrorEx('Credentials invalid');
  }
};
