import CredentialError from "../error/CredentialError.js";
import { verifyAccessToken } from "../util/generateToken.js";

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new CredentialError("Authorization header missing");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new CredentialError("Token missing");
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new CredentialError("Invalid or expires token");
  }
}

export default authenticate;
