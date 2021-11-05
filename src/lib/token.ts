/* eslint-disable @typescript-eslint/no-explicit-any */

//Config
import env from '../config';
import { Dictionary } from '../interface';

import jwt from 'jsonwebtoken';

export const validateToken = (token: string): Dictionary => {
  let decoded: Dictionary | null = null;

  try {
    decoded = jwt.verify(token, env.appKey) as Dictionary;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return { valid: true, expired: true };
    }
    return { valid: false };
  }

  const expirationDate = new Date(decoded.exp * 1000);

  if (new Date() > expirationDate) {
    return { valid: true, expired: true };
  }

  return {
    valid: true,
    data: decoded,
    expired: false,
  };
};

export const generateToken = (data: Dictionary): string => {
  return jwt.sign(data, env.appKey, env.jwtOptions);
};
