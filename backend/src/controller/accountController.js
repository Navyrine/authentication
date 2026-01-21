import { register, login, refresh, logout } from "../service/authService.js";

async function registerAccount(req, res, next) {
  try {
    const { username, password } = req.body;
    await register(username, password);

    return res.status(201).json({
      status: 201,
      message: "Success register account",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function loginAccount(req, res, next) {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await login(username, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: parseInt(process.env.MAX_AGE_COOKIE),
    });

    return res.status(200).json({
      status: 200,
      acces_token: accessToken,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function refreshToken(req, res, next) {
  try {
    const refreshToken = req.cookie.refresh_token;
    const { acces_token } = await refresh(refreshToken);

    res.status(200).json({
      status: 200,
      acces_token,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function logoutAccount(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logout(refreshToken);
    if (req.cookies.refreshToken) {
      res.clearCookie("refreshToken");
    }

    return res.status(200).json({
      status: 201,
      message: "Success logout",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export { registerAccount, loginAccount, refreshToken, logoutAccount };
