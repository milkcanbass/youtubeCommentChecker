const express = require("express");

module.exports = function(io) {
  let Twitter = require("twitter");

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  io.on("connection", socket => {
    client.stream("statuses/filter", { track: "javascript" }, stream => {
      stream.on("data", event => {
        let tweetId = event && event.id;

        socket.emit("tweetId", { tweetId });
      });

      stream.on("error", function(error) {
        throw error;
      });
      twitterStream = stream;
    });
  });
};
