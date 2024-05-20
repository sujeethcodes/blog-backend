require("dotenv").config()
const mongoose = require("mongoose")
const Connection = () => {
    mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = Connection