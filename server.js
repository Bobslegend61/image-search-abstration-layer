// Importing neccessary modules
const express = require("express");
const path = require("path");
const router = require("./routes/routes");

// Defining port to listen to
const PORT = process.env.PORT || 3000;

// Defining app
let app = express();

// Defining static path
app.use(express.static(path.join(__dirname, "client")));

// Defining api
app.use("/api", router);

// listen
app.listen(PORT, () => {
  console.log("App running on port "+ PORT);
});
