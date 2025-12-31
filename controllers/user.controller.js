const userService = require("../services/user.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");
const update = async (req, res) => {
  try {
    const response = await userService.updateUserRoleorStatus(
      req.body,
      req.params.id
    );
    successResponseBody.data = response;
    successResponseBody.message = "User updated successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
module.exports = {
  update,
};
