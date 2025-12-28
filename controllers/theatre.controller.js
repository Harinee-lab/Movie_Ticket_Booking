const theatreService = require("../services/theatre.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");
const createTheatre = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        "Validation failed on few parameters of the request body";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    res.status(201).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    res.status(500).json(errorResponseBody);
  }
};
const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "No theatre found for the given id";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre retrieved successfully";
    res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    res.status(500).json(errorResponseBody);
  }
};
const deleteTheatre = async (req, res) => {
  try {
    const response = await theatreService.deleteTheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre deleted successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    res.status(500).json(errorResponseBody);
  }
};
const getTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheatres(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "All theatres retrieved successfully";
    res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    res.status(500).json(errorResponseBody);
  }
};
const updateMoviesInTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateMoviesInTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    );
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated  movies in the theatre";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    res.status(500).json(errorResponseBody);
  }
};
const getMovies = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInATheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message =
      "Successfully fetched the movies for the theatre";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
module.exports = {
  createTheatre,
  getTheatre,
  deleteTheatre,
  getTheatres,
  updateMoviesInTheatre,
  getMovies,
};
