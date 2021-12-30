const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
