const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.log(`⛔ Error connecting to MongoDB\n${error}`);
    process.exit(1);
  }
};

module.exports = connectToDB;
