const StudentCourses = require("../models/student-courses.models");

const getCoursesBoughtByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const boughtCourses = await StudentCourses.findOne({ userId: studentId });
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: boughtCourses.courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching courses",
    });
  }
};

module.exports = { getCoursesBoughtByStudentId };
