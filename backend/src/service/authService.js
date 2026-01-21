import bcrypt from "bcrypt";
import ConflictError from "../error/ConflictError.js";
import BadRequestError from "../error/BadRequestError.js";
import CredentialError from "../error/CredentialError.js";
import { findByUsername, createAccount } from "../model/accountModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../util/generateToken.js";
import {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
} from "../model/refreshTokenModel.js";

async function register(username, password) {
  if (!username || !password) {
    throw new BadRequestError("Username and password required");
  }

  if (typeof username === "string" || typeof password === "string") {
    username = username.trim();
    password = password.trim();
  }

  const existingUser = await findByUsername(username);

  if (existingUser) {
    throw new ConflictError("Username already used");
  }

  const hash = await bcrypt.hash(password, 12);
  await createAccount(username, hash);
}

async function login(username, password) {
  if (!username || !password) {
    throw new BadRequestError("Username and password required");
  }

  if (typeof username === "string" || typeof password === "string") {
    username = username.trim();
    password = password.trim();
  }

  const existingUser = await findByUsername(username);
  if (!existingUser.username) {
    throw new CredentialError("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    throw new CredentialError("Invalid username or password");
  }

  const payload = {
    id: existingUser.account_id,
    username: existingUser.username,
  };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await saveRefreshToken(existingUser.account_id, refreshToken);

  return { accessToken, refreshToken };
}

async function refresh(refreshToken) {
  const storedToken = await findRefreshToken(refreshToken);
  if (!storedToken) {
    throw new ConflictError("Invalid refresh token");
  }

  const decoded = verifyRefreshToken(refreshToken);
  const newAccessToken = generateAccessToken({
    id: decoded.id,
    username: decoded.username,
  });

  return { newAccessToken };
}

async function logout(refreshToken) {
  if (!refreshToken || refreshToken === "") {
    throw new CredentialError("Refresh token required");
  }

  await deleteRefreshToken(refreshToken);
}

export { register, login, refresh, logout };
