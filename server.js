require('colors');
const express = require("express");
const dotenv = require("dotenv");

const { mainGmail } = require('./src/controllers/gmail.controller.js')

dotenv.config();

//* Connect to the express server
const app = express();

//* Start the server
const PORT = process.env.PORT || 8000;

//* Middleware to parse JSON data request body
app.use(express.json());


//? API is Running Successfully at "/"
// app.get("/", (req, res) => {
//   res.status(200).send("API is Running Successfully ");
// })

//! API is Running Successfully at "/" and goes directly to controller
app.use("/", mainGmail)


//? Server Started on PORT
app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`.blue.bold)
});

