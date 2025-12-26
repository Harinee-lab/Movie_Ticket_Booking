const theatreController = require("../controllers/theatre.controller");
const theatreMiddlewares = require("../middlewares/theatre.middlewares");
const routes = (app) => {
  app.post(
    "/mba/api/v1/theatres",
    theatreMiddlewares.validateTheatreCreateRequest,
    theatreController.createTheatre
  );
  app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);
  app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);
};
module.exports = routes;
