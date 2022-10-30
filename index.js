const express = require("express");
require("dotenv").config();

// import modules
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

// db connection module!!!
const dbConnect = require("./dbmodule/dbConnection");
// app declare!!
const app = express();

app.use(express.json());

app.use("/", todoRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  res.send("you are in wrong path!!!");
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  } else if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("there was some error!!!");
  }
});

// db connection call
dbConnect()
  .then(() => {
    console.log("db connected!!!!");
  })
  .catch((err) => console.log(err.message));

app.listen(4000, () => console.log("server is running!!!"));
