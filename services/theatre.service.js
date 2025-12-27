const Theatre = require("../models/theatre.model");

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
module.exports = {
  createTheatre,
  getTheatre,
  deleteTheatre,
  updateMoviesInTheatres,
};
