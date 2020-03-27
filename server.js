const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const router = express.Router();
const io = require("socket.io")(server);
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 8000;
const test = require("./routes/test");
require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

//socketIo
const twitter = require("./routes/twitter")(app, io);

app.use("/test", test);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  console.log("Serving React App...");
  app.get("*", (req, res) => {
    // don't serve api routes to react app
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;
