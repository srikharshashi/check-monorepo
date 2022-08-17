const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

app.use(
  cors({
    origin:process.env.VITE_BASE_URL,
    exposedHeaders: ["auth-token"],
  })
);

// Route imports
const authRoute = require("./routes/auth");
const historicDataRoute = require(`./routes/historic-data/historic_data`);
const stateDataRoute = require("./routes/state-data/state_data");

dotenv.config();

//mongo connect
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Mongo Connection Success");
});

app.use(express.static(path.join(__dirname, 'dist')));




// Global middlewares
app.use(express.json());

// Route middleware
app.use("/auth", authRoute);
app.use("/historic-data", historicDataRoute);
app.use("/state-data", stateDataRoute);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(6931, () => {
  console.log(`The server is listening on ${process.env.PORT}`);
});
