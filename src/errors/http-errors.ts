import { Dictionary } from '@server/interface';

export interface ErrorPayload extends Dictionary {
  message?: string;
  code?: number | string;
  stack?: number | string;
}

export abstract class HttpError extends Error {
  public readonly status!: number;
  public readonly name!: string;
  public readonly code!: number | string;
  public readonly payload!: Dictionary;

  protected defaultCode!: number | string;
  protected defaultMessage!: string;

  protected constructor(payload: ErrorPayload) {
    super();

    if (typeof payload === 'string') {
      this.message = payload;
    } else {
      this.payload = {
        success: false,
        error: {
          ...payload,
        },
      };

      this.code = payload.code || this.defaultCode;
      this.status = payload.status || this.status;
      this.message = payload.message || this.defaultMessage;
    }

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public json(): Dictionary {
    if (!this.payload) {
      return {
        success: false,
        error: {
          message: this.message,
          code: this.code,
          stack: this.stack,
        },
      };
    }

    return this.payload;
  }
}

export class Http400Error extends HttpError {
  public readonly status = 400;
  protected defaultMessage = 'Bad Request';
  protected defaultCode = 400;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}

export class Http401Error extends HttpError {
  public readonly status = 401;
  protected defaultMessage = 'Unauthorized';
  protected defaultCode = 401;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}

export class Http403Error extends HttpError {
  public readonly status = 403;
  protected defaultMessage = 'Forbidden';
  protected defaultCode = 403;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}

export class Http404Error extends HttpError {
  public readonly status = 404;
  protected defaultMessage = 'Not found';
  protected defaultCode = 404;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}

export class Http409Error extends HttpError {
  public readonly status = 409;
  protected defaultMessage = 'Conflict';
  protected defaultCode = 409;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}

export class Http410Error extends HttpError {
  public readonly status = 410;
  protected defaultMessage = 'Gone';
  protected defaultCode = 410;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}
export class Http415Error extends HttpError {
  public readonly status = 415;
  protected defaultMessage = 'Unsupported Media Type';
  protected defaultCode = 415;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}

export class Http419Error extends HttpError {
  public readonly status = 419;
  protected defaultMessage = 'Expired';
  protected defaultCode = 419;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}

export class Http500Error extends HttpError {
  public readonly status = 500;
  protected defaultMessage = 'Internal Server Error';
  protected defaultCode = 500;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}

export class Http501Error extends HttpError {
  public readonly status = 501;
  protected defaultMessage = 'Not Implemented';
  protected defaultCode = 501;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}
export class Http503Error extends HttpError {
  public readonly status = 503;
  protected defaultMessage = 'Service Unavailable';
  protected defaultCode = 503;

  public constructor(payload: ErrorPayload) {
    super(payload);
  }
}
