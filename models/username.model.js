const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usernameSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User"
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null,
    required: false
  }
});

const Username = mongoose.model("Username History", usernameSchema);

module.exports = Username;