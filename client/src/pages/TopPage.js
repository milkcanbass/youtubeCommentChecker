import React, { useEffect } from "react";
import axios from "axios";

const TopPage = () => {
  useEffect(() => {}, []);

  const retrieveTweets = () => {
    axios({
      method: "get",
      url: "twitter/stream",
      responseType: "stream"
    }).then(res => {
      console.log(res.data);

      //   response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
    });
  };
  retrieveTweets();

  return <div>TopPage!!!</div>;
};

export default TopPage;
