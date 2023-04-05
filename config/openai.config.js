// this file we want to setup connection
// to openai
const { Configuration, OpenAIApi } = require("openai");

// check to see if this a production enviroment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const config = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.API_KEY,
});

const my_openai = new OpenAIApi(config);

module.exports = my_openai;
