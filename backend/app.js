const express = require("express");
const mongoose = require("mongoose");
// const session = require("express-session");

const credentials = require("./credentials.js");
const app = express();
require("dotenv").config();

const dbUrl =
  "mongodb://" +
  credentials.username +
  ":" +
  credentials.password +
  "@" +
  credentials.host +
  ":" +
  credentials.port +
  "/" +
  credentials.database;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: "mysecret" }));

const routes = require("./routes/index");
app.use("/api", routes);
app.use((req, res) => {
  res.status(404);
  res.send("404");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
