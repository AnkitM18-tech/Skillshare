import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/authContext";
import { StudentContext } from "@/context/studentContext";
import { getStudentEnrolledCoursesService } from "@/services";
import { Eye } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentCourses = () => {
  const { studentEnrolledCourses, setStudentEnrolledCourses } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function getStudentEnrolledCourses() {
    const response = await getStudentEnrolledCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentEnrolledCourses(response.data);
    }
  }

  useEffect(() => {
    getStudentEnrolledCourses();
  }, []);
  return (
    <div className="p-4">
      <h1 className="mb-8 text-3xl font-bold">Enrolled Courses</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {studentEnrolledCourses && studentEnrolledCourses.length > 0 ? (
          studentEnrolledCourses.map((course) => (
            <Card key={course?._id} className="flex flex-col">
              <CardContent className="flex-grow p-4">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="object-cover w-full mb-4 rounded-lg h-52"
                />
                <h3 className="mb-1 font-bold">{course?.title}</h3>
                <p className="mb-2 text-sm text-gray-700">
                  Created By <b>{course?.instructorName}</b>
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseId}`)
                  }
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">Yet to Enroll in a Course</h1>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
