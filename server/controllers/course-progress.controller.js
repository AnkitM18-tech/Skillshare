const CourseProgress = require("../models/course-progress.models");
const Course = require("../models/course.models");
const StudentCourses = require("../models/student-courses.models");

const markLectureAsViewed = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;
    let progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        lecturesProgress: [
          {
            lectureId,
            viewed: true,
            dateViewed: new Date(),
          },
        ],
      });
      await progress.save();
    } else {
      const lectureProgress = progress.lecturesProgress.find(
        (item) => item.lectureId === lectureId
      );
      if (lectureProgress) {
        lectureProgress.viewed = true;
        lectureProgress.dateViewed = new Date();
      } else {
        progress.lecturesProgress.push({
          lectureId,
          viewed: true,
          dateViewed: new Date(),
        });
      }
      await progress.save();
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // check if all lectures are viewed or not
    const areAllLecturesViewed =
      progress.lecturesProgress.length === course.curriculum.length &&
      progress.lecturesProgress.every((item) => item.viewed);

    if (areAllLecturesViewed) {
      progress.completed = true;
      progress.completionDate = new Date();

      await progress.save();
    }

    return res.status(200).json({
      success: true,
      message: "Lecture marked as viewed",
      data: progress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while marking the lecture as viewed",
    });
  }
};

const getCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const studentPurchasedCourses = await StudentCourses.findOne({ userId });
    const isCoursePurchased =
      studentPurchasedCourses?.courses?.findIndex(
        (item) => item.courseId === courseId
      ) > -1;
    if (!isCoursePurchased) {
      return res.status(200).json({
        success: true,
        data: {
          isCoursePurchased: false,
        },
        message: "You need to purchase this course to access it ",
      });
    }
    const currentUserCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (
      !currentUserCourseProgress ||
      currentUserCourseProgress?.lecturesProgress.length === 0
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "No Progress Yet. Start Watching Now",
        data: {
          courseDetails: course,
          progress: [],
          isCoursePurchased: true,
        },
      });
    }

    const courseDetails = await Course.findById(courseId);

    return res.status(200).json({
      success: true,
      message: "Course Progress has been fetched successfully",
      data: {
        courseDetails,
        progress: currentUserCourseProgress.lecturesProgress,
        completed: currentUserCourseProgress.completed,
        completionDate: currentUserCourseProgress.completionDate,
        isCoursePurchased: true,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching course progress",
    });
  }
};

const resetCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found",
      });
    }

    progress.lecturesProgress = [];
    progress.completed = false;
    progress.completionDate = null;

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Course progress has been reset successfully",
      data: progress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting course progress",
    });
  }
};

module.exports = {
  getCourseProgress,
  markLectureAsViewed,
  resetCourseProgress,
};
