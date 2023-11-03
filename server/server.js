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

  // translation api call
  const API_translation = `https://api.mymemory.translated.net/get?q=${word}&langpair=${from}|${to}`;
  // axios makes its own get request from server to api
  const res_translation = await axios.get(API_translation);

  // image api call
  const API_image = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${res_translation.data.responseData.translatedText}`;
  const res_image = await axios.get(API_image);

  // wrangle only what we want
  const wrangledData = {
    translation: res_translation.data.responseData.translatedText,
    match: res_translation.data.responseData.match,
    image: res_image.data.results[0].urls.regular,
  };

  // return wrangledData as json
  response.json(wrangledData);
});
