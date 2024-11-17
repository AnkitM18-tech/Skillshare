const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema({
  lectureId: {
    type: String,
  },
  viewed: {
    type: Boolean,
  },
  viewedDate: {
    type: Date,
  },
});

const CourseProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
  completionDate: {
    type: Date,
  },
  lecturesProgress: [LectureProgressSchema],
});

module.exports = mongoose.model("CourseProgress", CourseProgressSchema);
