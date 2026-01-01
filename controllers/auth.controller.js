const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");
const { STATUS_CODES } = require("../utils/constants");
const signup = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully registered the user";
    return res.status(STATUS_CODES.CREATED).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
const signin = async (req, res) => {
  try {
    const user = await userService.getUserByemail(req.body.email);
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      throw {
        err: "Invalid password for the given email",
        code: STATUS_CODES.UNAUTHORIZED,
      };
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.AUTH_KEY,
      { expiresIn: "48h" }
    );
    console.log(jwt.verify(token, process.env.AUTH_KEY));
    successResponseBody.message = "Successfully logged in";
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      token: token,
    };
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw {
        err: "oldPassword and newPassword required",
        code: STATUS_CODES.BAD_REQUEST,
      };
    }
    const user = await userService.getUserById(req.user);
    const isOldPasswordCorrect = await user.isValidPassword(oldPassword);
    if (!isOldPasswordCorrect) {
      throw {
        err: "Invalid old password, please write the correct old password",
        code: STATUS_CODES.FORBIDDEN,
      };
    }
    user.password = req.body.newPassword;
    await user.save();

    successResponseBody.data = user;
    successResponseBody.message =
      "Successfully updated the password for the given user";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
module.exports = {
  signup,
  signin,
  resetPassword,
};
