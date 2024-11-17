import { createContext, useState } from "react";

export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentViewCoursesList, setStudentViewCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentViewCourseDetails, setStudentViewCourseDetails] =
    useState(null);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [studentEnrolledCourses, setStudentEnrolledCourses] = useState([]);
  const [studentCourseProgress, setStudentCourseProgress] = useState({});
  return (
    <StudentContext.Provider
      value={{
        studentViewCoursesList,
        setStudentViewCoursesList,
        loading,
        setLoading,
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseId,
        setCurrentCourseId,
        studentEnrolledCourses,
        setStudentEnrolledCourses,
        studentCourseProgress,
        setStudentCourseProgress,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
