import CustomError from "./CustomError.js";

class CredentialError extends CustomError {
  constructor(message = "Credential") {
    super(message, 401);
  }
}

export default CredentialError;
