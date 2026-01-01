const mongoose = require("mongoose");
const Movie = require("../models/movie.model");
const { STATUS_CODES } = require("../utils/constants");
const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      throw { err, code: STATUS.UNPROCESSABLE_ENTITY };
    } else {
      throw error;
    }
  }
};
const deleteMovie = async (id) => {
  try {
    const response = await Movie.findById(id);
    if (!response) {
      throw {
        err: "No movie found for the given id ",
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
      };
    }
    await Movie.findByIdAndDelete(id);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  console.log("Movie found:", movie);
  if (!movie) {
    throw {
      err: "No movie found for the corresponding id provided",
      code: STATUS_CODES.NOT_FOUND,
    };
  }
  return movie;
};
const updateMovie = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return movie;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err, code: STATUS_CODES.UNPROCESSABLE_ENTITY };
    } else {
      throw error;
    }
  }
};
const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
  let movies = await Movie.find(query);
  if (!movies) {
    throw {
      err: "Not able to find the queries movies",
      code: STATUS.NOT_FOUND,
    };
  }
  return movies;
};
module.exports = {
  createMovie,
  deleteMovie,
  updateMovie,
  getMovieById,
  fetchMovies,
};
