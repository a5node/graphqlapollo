import { ConnectOptions } from 'mongoose';

export interface IOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  autoIndex: boolean;
}

export interface OptionConfig {
  PORT?: string;
  NODE_DEV?: string;
  jwtOptions: {
    expiresIn: string;
  };
  staticClient: string;
  bearerToken: {
    bodyKey: string;
    queryKey: string;
    headerKey: string;
    reqKey: string;
  };
  reteLimit: {
    windowMs: number;
    max: number;
  };
  dbOptions: IOptions;
  apolloOptions: {
    path: string;
  };
}

export interface EnvConfig {
  PORT?: string | number;
  NODE_DEV?: string;
  appKey: string;
  DATABASE_URI: string;
  DATABASE_NAME: string;
  HOST: string;
  CORS: string;
  apolloKey: string;
  apolloKeys: string;
  apolloUsers: string;
  apolloId: string;
  NODE_ENV: string;
}

export interface Config {
  process: NodeJS.Process;
  env: EnvConfig;
  options: OptionConfig;
}
