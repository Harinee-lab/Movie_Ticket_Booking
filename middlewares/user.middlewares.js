const { errorResponseBody } = require("../utils/responsebody");
const { STATUS_CODES } = require("../utils/constants");
const validateUpdateUserRequest = (req, res, next) => {
  if (!(req.body.userRole || req.body.userStatus)) {
    errorResponseBody.message =
      "Malformed request,please provide role or status to be updated";
    return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
  }
  next();
};
module.exports = {
  validateUpdateUserRequest,
};
