const { errorResponseBody } = require("../utils/responsebody");
const validateTheatreCreateRequest = async (req, res, next) => {
  if (!req.body.name) {
    errorResponseBody.message =
      "The name of the theatre is not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.pincode) {
    errorResponseBody.message =
      "The pincode of the theatre is not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.city) {
    errorResponseBody.message =
      "The city of the theatre is not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  next();
};
const validateUpdateMovies = async (req, res, next) => {
  if (!req.body.movieIds) {
    errorResponseBody.message =
      "No movies prresent in the request to be updated in theatre ";
    return res.status(400).json(errorResponseBody);
  }
  if (req.body.insert==undefined) {
    errorResponseBody.message = "The insert parameter is missing in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!(req.body.movieIds instanceof Array)) {
    errorResponseBody.message =
      "Expected array of movies but found something else";
    return res.status(400).json(errorResponseBody);
  }
  if (req.body.movieIds.length == 0) {
    errorResponseBody.message = "No movies present in the array provided";
    return res.status(400).json(errorResponseBody);
  }
  next();
};
module.exports = {
  validateTheatreCreateRequest,
  validateUpdateMovies,
};
