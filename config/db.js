const mongoose = require("mongoose");

function connectionDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
}

module.exports = connectionDB;
