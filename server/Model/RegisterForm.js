const mongoose = require("mongoose");

const registerFormSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    enum: ["student", "graduate", "workingIT", "workingNonIT"],
    required: true,
  },
  qualification: {
    type: String,
    enum: ["Under Graduate", "Post Graduate", "Diploma", "HSC", "SSLC"],
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("RegisterForm", registerFormSchema);
