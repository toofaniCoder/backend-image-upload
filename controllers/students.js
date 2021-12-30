const Student = require("../models/Student");
const path = require("path");

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

// Upload Student Profile
exports.uploadProfile = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const profile = req.files.profile;
    // Validate Image
    const fileSize = profile.size / 1000;
    const fileExt = profile.name.split(".")[1];
    if (fileSize > 500) {
      return res
        .status(400)
        .json({ message: "file size must be lower than 500kb" });
    }

    if (!["jpg", "png"].includes(fileExt)) {
      return res
        .status(400)
        .json({ message: "file extension must be jpg or png" });
    }

    const fileName = `${req.params.id}${path.extname(profile.name)}`;
    profile.mv(`uploads/${fileName}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      // update student profile field
      await Student.findByIdAndUpdate(req.params.id, { profile: fileName });
      res.status(200).json({
        data: {
          file: `${req.protocol}://${req.get("host")}/${fileName}`,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
