const theatreService = require("../services/theatre.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");
const { STATUS_CODES } = require("../utils/constants");
const createTheatre = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    res.status(STATUS_CODES.CREATED).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Theatre retrieved successfully";
    res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const deleteTheatre = async (req, res) => {
  try {
    const response = await theatreService.deleteTheatre(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Theatre deleted successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const getTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheatres(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "All theatres retrieved successfully";
    res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const updateTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateTheatre(
      req.params.id,
      req.body
    );
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the theatre";
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
const updateMovies = async (req, res) => {
  try {
    const response = await theatreService.updateMoviesInTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    );
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated movies inn the theatre";
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
const updateMoviesInTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateMoviesInTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    );
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated  movies in the theatre";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const getMovies = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInATheatre(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message =
      "Successfully fetched the movies for the theatre";
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
const checkMovie = async (req, res) => {
  try {
    const response = await theatreService.checkMovieInATheatre(
      req.params.theatreId,
      req.params.movieId
    );
    successResponseBody.data = response;
    successResponseBody.message =
      "Succesfully checked if the movie is present in the theatre";
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
  createTheatre,
  getTheatre,
  deleteTheatre,
  getTheatres,
  updateMoviesInTheatre,
  getMovies,
  updateTheatre,
  getMovies,
  checkMovie,
};
