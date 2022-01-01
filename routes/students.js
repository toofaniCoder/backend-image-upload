const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  uploadProfile,
} = require("../controllers/students");

router.route("/").get(getStudents).post(createStudent);
router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent);
router.route("/:id/profile").post(uploadProfile);
module.exports = router;
