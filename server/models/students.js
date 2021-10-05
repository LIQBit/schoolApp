const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  age: String,
  test1: String,
  classId: String,
});

module.exports = mongoose.model("Student", studentSchema);
