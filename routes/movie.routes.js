const movieController = require("../controllers/movie.controller");
const moviemiddlewares = require("../middlewares/movie.middlewares");
const authMiddleware = require("../middlewares/auth.middlewares");
const routes = (app) => {
  app.post(
    "/mba/api/v1/movies",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    moviemiddlewares.validateMovieCreationRequest,
    movieController.createMovie
  );
  app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);
  app.get("/mba/api/v1/movies/:movieId", movieController.getMovie);
  app.put("/mba/api/v1/movies/:id", movieController.updateMovie);
  app.patch("/mba/api/v1/movies/:id", movieController.updateMovie);
  app.get("/mba/api/v1/movies", movieController.getMovies);
};
module.exports = routes;
