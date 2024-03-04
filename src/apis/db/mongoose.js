const mongoose = require("mongoose");
require("dotenv").config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useCreateIndex: true,      // Set useCreateIndex option
  //   useFindAndModify: false,   // Set useFindAndModify option
};

mongoose
  .connect(process.env.DB, connectionParams)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

module.exports = mongoose; // Export the mongoose instance
