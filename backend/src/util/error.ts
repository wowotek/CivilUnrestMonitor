export class GeneralNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeneralNotFoundError";
  }
}

export class GeneralBadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeneralBadRequestError";
  }
}
