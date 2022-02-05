const express = require("express");
const mongoose = require("mongoose");
const credentials = require("./credentials.js");

const app = express();
const PORT = process.env.PORT || 3000;
const dbUrl =
  "mongodb+srv://" +
  credentials.username +
  ":" +
  credentials.password +
  "@" +
  credentials.altasDB +
  "/" +
  credentials.database;

// const dbUrl =
//   "mongodb://" +
//   credentials.username +
//   ":" +
//   credentials.password +
//   "@" +
//   credentials.host +
//   ":" +
//   credentials.port +
//   "/" +
//   credentials.database;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello, world");
});

app.use((req, res) => {
  res.status(404);
  res.send("404");
});

mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
