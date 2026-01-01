const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");
const { STATUS_CODES } = require("../utils/constants");
const createMovie = async (req, res) => {
  try {
    const response = await movieService.createMovie(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        "Validation failed on few parameters of the request body";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movie created successfully";
    return res.status(STATUS_CODES.CREATED).json(successResponseBody);
  } catch (err) {
    console.log(err);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovie(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movie deleted successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (err) {
    console.log(err.name, err.errors.description);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
const getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (err) {
    console.log(err);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
const updateMovie = async (req, res) => {
  try {
    const response = await movieService.updateMovie(req.params.id, req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        "The updates that we are trying to apply doesn't match the schema";
      successResponseBody.data = response;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (err) {
    console.log(err);
    errorResponseBody.err = err;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
const getMovies = async (req, res) => {
  try {
    const response = await movieService.fetchMovies(req.query);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
  getMovies,
};
