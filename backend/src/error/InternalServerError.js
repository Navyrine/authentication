class InternalServerError extends Error {
  constructor(message = "InternalServer") {
    super(message, 500);
  }
}

export default InternalServerError;
