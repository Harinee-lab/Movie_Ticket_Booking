const { errorResponseBody } = require("../utils/responsebody");
const validateUpdateUserRequest = (req, res, next) => {
  if (!(req.body.userRole || req.body.userStatus)) {
    errorResponseBody.message =
      "Malformed request,please provide role or status to be updated";
    return res.status(400).json(errorResponseBody);
  }
  next();
};
module.exports = {
  validateUpdateUserRequest,
};
