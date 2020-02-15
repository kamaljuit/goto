const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
//change
const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
const redirectRoutes = require("./routes/redirectRoutes");
const app = express();
const sendResponse = require("./utils/sendResponse");

//--------------------- Important Middlewares --------------------

app.use(express.json()); //Inbuilt body-parser middleware
app.use(
  //Inbuilt url query string parser
  express.urlencoded({
    extended: true
  })
);
app.use(cookieParser());

//----------------------- Stage Specific Middlewares-------------------

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//api routes

app.use(`/api/user`, userRoutes);
app.use(`/api/url`, urlRoutes);
app.use("/s", redirectRoutes);
//Handler for any invalid request
app.all("*", (req, res, next) => {
  // implement a 404 page
});

//Global Error handler
app.use((err, req, res, next) => {
  // console.log(err.stack);
  const statusCode = err.statusCode || 500;
  const statusMessage = err.statusMessage || "error";
  const errorMessage = err.message || "Internal Server Error";
  return sendResponse(res, statusCode, null, errorMessage);
});

module.exports = app;
