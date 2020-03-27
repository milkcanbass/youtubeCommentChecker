const express = require("express");

module.exports = function(app, io) {
  let Twitter = require("twitter");

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  let tweetId;
  let socketConnection;
  let twitterStream;

  io.on("connection", socket => {
    client.get("statuses/filter", { track: "javascript" }, stream => {
      stream.on("data", event => {
        tweetId = (event && event.id) || "";
      });

      stream.on("error", function(error) {
        throw error;
      });
      twitterStream = stream;
    });

    io.emit("tweetId", tweetId);
  });
};
