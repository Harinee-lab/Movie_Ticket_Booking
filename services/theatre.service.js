const Theatre = require("../models/theatre.model");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: 422 };
    }
    console.log(error);
    throw error;
  }
};
const getTheatre = async (id) => {
  const response = await Theatre.findById(id);
  try {
    if (!response) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getAllTheatres = async (data) => {
  try {
    let query = {};
    if (data && data.city) {
      query.city = data.city;
    }
    if (data && data.pincode) {
      query.pincode = data.pincode;
    }
    if (data && data.name) {
      query.name = data.name;
    }
    const response = await Theatre.find(query);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateThreatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return {
        err: "No  theatre found foe the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    if (error.name) {
      let err = {};
      Object.keys(error.errors).forEach((keys) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: 404 };
    }
    throw error;
  }
};
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  const theatre = await Theatre.findById(theatreId);
  if (!theatre) {
    return {
      err: "No such theatre found for the given id",
      code: 404,
    };
  }
  if (insert) {
    movieIds.forEach((movieId) => {
      theatre.movies.push(movieId);
    });
  } else {
    let savedMovieIds = theatre.movies;
    movieIds.forEach((movieId) => {
      savedMovieIds = savedMovieIds.filter((smi) => smi == movieId);
    });
    theatre.movies = savedMovieIds;
  }
  await theatre.save();
  return theatre.populate("movies");
};
const getMoviesInATheatre = async (id) => {
  try {
    const theatre = await Theatre.findById(id, {
      name: 1,
      movies: 1,
      address: 1,
    }).populate("movies");
    if (!theatre) {
      return {
        err: "No theatre with the given id found",
        code: 404,
      };
    }
    return theatre;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getMovies = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInATheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = error;
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
const checkMovieInATheatre = async (theatreId, movieId) => {
  try {
    let response = await Theatre.findById(theatreId);
    if (!response) {
      return {
        err: "No such theatre found",
        code: 404,
      };
    }
    return response.movies.indexOf(movieId) != -1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  createTheatre,
  getTheatre,
  getAllTheatres,
  deleteTheatre,
  updateMoviesInTheatres,
  getMoviesInATheatre,
  getMovies,
  updateThreatre,
  checkMovieInATheatre,
};
