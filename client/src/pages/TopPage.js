import React, { useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton
} from "react-twitter-embed";

const TopPage = () => {
  // sockets test
  const socket = io();
  const [twId, setTWId] = useState(0);
  socket.on("tweetId", tweetId => setTWId(tweetId));

  return (
    <div>
      <TwitterTweetEmbed tweetId={twId || ""} />
      <div>TopPage!!!</div>
    </div>
  );
};

export default TopPage;
