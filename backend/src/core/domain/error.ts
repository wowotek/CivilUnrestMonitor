import { GeneralBadRequestError, GeneralNotFoundError } from "../../util";

export class UserNotFoundError extends GeneralNotFoundError {
  constructor(username: string) {
    super(`User with username ${username} not found`);
  }
}

export class UserAlreadyExistsError extends GeneralBadRequestError {
  constructor(username: string) {
    super(`User with username ${username} already exists`);
  }
}

export class UserPasswordIncorrectError extends GeneralBadRequestError {
  constructor() {
    super("User password is incorrect");
  }
}
