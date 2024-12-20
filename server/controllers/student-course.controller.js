const Course = require("../models/course.models");
const StudentCourses = require("../models/student-courses.models");

const getAllCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;
        break;
      case "price-hightolow":
        sortParam.pricing = -1;
        break;
      case "title-atoz":
        sortParam.title = 1;
        break;
      case "title-ztoa":
        sortParam.title = -1;
        break;

      default:
        sortParam.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParam);

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

const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
    });
    const ifStudentBoughtTheCourse =
      studentCourses?.courses.findIndex((item) => item.courseId === courseId) >
      -1;
    return res.status(200).json({
      success: true,
      data: ifStudentBoughtTheCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " Error fetching courses list",
    });
  }
};

module.exports = { getAllCourses, getCourseDetails, checkCoursePurchaseInfo };
