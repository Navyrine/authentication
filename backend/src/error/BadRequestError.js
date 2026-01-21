import CustomError from "./CustomError.js";

class BadRequestError extends CustomError {
  constructor(message = "BadRequest") {
    super(message, 400);
  }
}

export default BadRequestError;
