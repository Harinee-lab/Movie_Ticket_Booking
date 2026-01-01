const userService = require("../services/user.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");
const { STATUS_CODES } = require("../utils/constants");
const update = async (req, res) => {
  try {
    const response = await userService.updateUserRoleorStatus(
      req.body,
      req.params.id
    );
    successResponseBody.data = response;
    successResponseBody.message = "User updated successfully";
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
  update,
};
