const jwt = require("jsonwebtoken");
const { errorResponseBody } = require("../utils/responsebody");
const userService = require("../services/user.service");
const validateSignupRequest = async (req, res, next) => {
  if (!req.body.name) {
    errorResponseBody.err = "Name of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.email) {
    errorResponseBody.err = "Email of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.password) {
    errorResponseBody.err = "Password of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  next();
};
const validateSignInRequest = async (req, res, next) => {
  if (!req.body.email) {
    errorResponseBody.err = "No email provided for  sign in";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.password) {
    errorResponseBody.err = "No password provided for  sign in";
    return res.status(400).json(errorResponseBody);
  }
  next();
};
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      errorResponseBody.err = "No token provided";
      return res.status(403).json(errorResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if (!response) {
      errorResponseBody.err = "Failed to authenticate the token";
      return res.status(401).json(errorResponseBody);
    }
    const user = await userService.getUserById(response.id);
    req.user = user.id;
    next();
  } catch (error) {
    if (error.code == 404) {
      errorResponseBody.err =
        "User for whom the token was generated is not found";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
const validateResetPasswordRequest = async (req, res, next) => {
  if (!req.body.oldPassword) {
    errorResponseBody.err = "Old password not provided";
    return res.status(400).json(errorResponseBody);
  }

  if (!req.body.newPassword) {
    errorResponseBody.err = "New password not provided";
    return res.status(400).json(errorResponseBody);
  }
  next();
};
module.exports = {
  validateSignupRequest,
  validateSignInRequest,
  isAuthenticated,
  validateResetPasswordRequest,
};
