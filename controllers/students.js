const Student = require("../models/Student");

// Get all Students
exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get single Student
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ data: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a Student
exports.createStudent = async (req, res, next) => {
  try {
    const students = await Student.create(req.body);
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Student
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ data: student });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Student
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ data: {} });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
