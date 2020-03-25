const express = require("express");
const router = express.Router();
const io = require("../server");
let Twitter = require("twitter");

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let socketConnection, twitterStream;

module.exports = function(io) {
  const sendMessage = msg => {
    if (msg.text.includes("RT")) {
      return;
    }
    socketConnection.emit("tweets", msg);
  };

  io.on("connection", socket => {
    socketConnection = socket;
    stream();
    socket.on("connection", () => console.log("Client connected"));
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  router.get("/stream", (req, res) => {
    console.log("triggered");
    client.stream("statuses/filter", { track: "javascript" }, stream => {
      stream.on("data", event => {
        sendMessage(event && event.text);
      });

      stream.on("error", function(error) {
        throw error;
      });
      twitterStream = stream;
    });
  });
};
