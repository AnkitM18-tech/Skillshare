const Course = require("../models/course.models");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = new Course(courseData);
    const saveCourse = await newCourse.save();

    if (saveCourse) {
      return res.status(201).json({
        success: true,
        message: "Course added successfully",
        data: saveCourse,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Some Error Occurred while creating new course",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some Error Occurred while creating new course",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({});

    return res.status(200).json({
      success: true,
      message: "All Courses fetched",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some Error Occurred while creating new course",
    });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some Error Occurred while creating new course",
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    const updatedCourseData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating course",
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some Error Occurred while creating new course",
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
};
