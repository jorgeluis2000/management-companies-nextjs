const createErrorFactory = (name: string) => {
  return class BusinessError extends Error {
    constructor(message: string) {
      super(message);
      this.name = name;
    }
  };
};

export const ConnectionError = createErrorFactory("ConnectionError");
export const NotFoundObjectError = createErrorFactory("NotFoundObjectError");
export const QueryError = createErrorFactory("QueryError");
export const InvalidCredentialError = createErrorFactory("InvalidCredentialError");
export const InvalidParamsError = createErrorFactory("InvalidParamsError");
export const UnknownError = createErrorFactory("UnknownError");
export const NotAuthenticatedError = createErrorFactory("NotAuthenticatedError");
export const SessionError = createErrorFactory("SessionError");
