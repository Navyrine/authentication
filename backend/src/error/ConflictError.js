import CustomError from "./CustomError.js";

class ConfictError extends CustomError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

export default ConfictError;
