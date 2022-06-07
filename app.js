const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const database = require("./middlewares/database");
const error = require("./middlewares/error");
const { sendJson } = require("./middlewares/generateResponse");
const routes = require("./routes");
const express = require("express");
const app = express();
database.connect();
// here is set the cron npm 
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.response.sendJson = sendJson;

app.use("/", routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);
// catch 404 and forward to error handler
app.use(error.notFound);
// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
