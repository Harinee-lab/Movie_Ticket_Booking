const theatreController = require("../controllers/theatre.controller");
const theatreMiddlewares = require("../middlewares/theatre.middlewares");
const routes = (app) => {
  app.post(
    "/mba/api/v1/theatres",
    theatreMiddlewares.validateTheatreCreateRequest,
    theatreController.createTheatre
  );
  app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);
  app.get("/mba/api/v1/theatres", theatreController.getTheatres);
  app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);
  app.patch(
    "/mba/api/v1/theatres/:id/movies",
    theatreMiddlewares.validateUpdateMovies,
    theatreController.updateMoviesInTheatre
  );
  app.patch("/mba/api/v1/theatres/:id", theatreController.updateTheatre);
  app.put("mba/v1/api/theatres/:id", theatreController.updateTheatre);
};
module.exports = routes;
