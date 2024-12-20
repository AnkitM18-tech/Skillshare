import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { createContext, useState } from "react";

export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData
  );
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [mediaUploadProgressPercent, setMediaUploadProgressPercent] =
    useState(0);
  const [instructorCoursesList, setInstructorCoursesList] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercent,
        setMediaUploadProgressPercent,
        instructorCoursesList,
        setInstructorCoursesList,
        editCourseId,
        setEditCourseId,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
