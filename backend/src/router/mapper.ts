import { GeneralBadRequestError, GeneralNotFoundError } from "../util";

export const mapError = (err: Error) => {
  switch (true) {
    case err instanceof GeneralNotFoundError:
      return { code: "NOT_FOUND", message: err.message, cause: err };
    case err instanceof GeneralBadRequestError:
      return { code: "BAD_REQUEST", message: err.message, cause: err };
    default:
      return {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
        cause: err,
      };
  }
};
