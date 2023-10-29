require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');

const app = express();

const rsvpRouter = require("./routes/rsvp");

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(logger("dev"));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/rsvp", rsvpRouter);
const string = process.env.MONGO_URI;
mongoose.connect(string);

const database = mongoose.connection;
database.on("error:", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});
