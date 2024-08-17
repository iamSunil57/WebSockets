const mongoose = require("mongoose");

async function connectToDatabase() {
  await mongoose.connect(
    "mongodb+srv://sunilchand675:sunil57@cluster0.zfdnl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database Connected");
}

module.exports = connectToDatabase;
