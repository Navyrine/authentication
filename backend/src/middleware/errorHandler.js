import CustomError from "../error/CustomError.js";

function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  console.error("UNEXPECTED ERROR: " + err);
}

export default errorHandler;
