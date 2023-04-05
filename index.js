const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/basic", require("./routes/basic.routes"));
// don't leave this log here
// console.log('api key:', process.env.API_KEY)
app.get("/", (req, res) => {
  res.json("welcome to our api that uses another api");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
