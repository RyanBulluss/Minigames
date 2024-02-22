const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

// Always require and cofigure near top
require("dotenv").config();

// Connect to the database
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use(require("./config/checkToken"));

// Put API routes here, before the "catch all" route
app.use("/users", require("./routes/users"));
app.use("/comments", require("./routes/comments"));
// app.use("/wordle", require("./routes/wordle"));
// app.use("/api/wordle", require("./routes/users"));
// app.use("/api/minesweeper", require("./routes/users"));
// app.use("/api/brick-breaker", require("./routes/users"));
// app.use("/api/sudoku", require("./routes/users"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
