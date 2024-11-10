const Course = require("../models/course.models");

const getAllCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});
    if (coursesList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Courses Found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: coursesList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " Error fetching courses list",
    });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " Error fetching courses list",
    });
  }
};

module.exports = { getAllCourses, getCourseDetails };
