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
    successResponseBody.data = response;
    successResponseBody.message = "Movie created successfully";
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
const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovie(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Movie deleted successfully";
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
const getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);
    successResponseBody.data = response;
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (err) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = err;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
const updateMovie = async (req, res) => {
  try {
    const response = await movieService.updateMovie(req.params.id, req.body);
    successResponseBody.data = response;
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
const getMovies = async (req, res) => {
  try {
    const response = await movieService.fetchMovies(req.query);
    successResponseBody.data = response;
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
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
  getMovies,
};
