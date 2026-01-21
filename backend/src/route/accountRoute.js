import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import {
  registerAccount,
  loginAccount,
  logoutAccount,
  refreshToken,
} from "../controller/accountController.js";

const accountRouter = express.Router();

accountRouter.post("/register", registerAccount);
accountRouter.post("/login", loginAccount);
accountRouter.post("/refresh-token", refreshToken);
accountRouter.post("/logout", authenticate, logoutAccount);

export default accountRouter;
