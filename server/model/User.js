const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
// Scheme is the blueprint of the unit of the data(Model) we want to
// insert, delete, find, in short interact with database
const UserSchema = new Schema({
  googleID: {
    type: String
  },
  facebookID: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create Model
mongoose.model("users", UserSchema);
