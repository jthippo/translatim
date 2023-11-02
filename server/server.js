const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const axios = require("axios");

// test our server is working properly
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));

// endpoint for main
app.get("/", (_, response) => response.json("Root route for translatim."));

// endpoint for translate
app.get("/translate", async (request, response) => {
  // long way without destructuring
  // const word = request.query.word;
  // const from = request.query.from;
  // const to = request.query.to;

  // quicker way, destructuring properties of request.query into variables
  const { word, from, to } = request.query;

  // api call
  const API = `https://api.mymemory.translated.net/get?q=${word}&langpair=${from}|${to}`;
  // axios makes its own get request from server to api
  const res = await axios.get(API);

  // wrangle only what we want
  const wrangledData = {
    translation: res.data.responseData.translatedText,
    match: res.data.responseData.match,
  };

  // return wrangledData as json
  response.json(wrangledData);
});
