const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");
const Movie = require("./models/movie.model");
const MovieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");
const authRoutes = require("./routes/auth.routes");
env.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set("debug", true);

MovieRoutes(app);
theatreRoutes(app);
authRoutes(app);
app.get("/home", (req, res) => {
  console.log("Hitting /home");
  return res.json({
    success: true,
    message: "Fetched home",
  });
});
app.listen(process.env.PORT, async () => {
  console.log(`Server is running on Port ${process.env.PORT} !!`);
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
    // await Movie.create({
    //   name: "Inception",
    //   description: "A mind-bending thriller by Christopher Nolan.",
    //   casts: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    //   director: "Christopher Nolan",
    //   trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    //   language: "English",
    //   releaseDate: "2026-07-25",
    //   releaseStatus: "RELEASED",
    // });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
});
