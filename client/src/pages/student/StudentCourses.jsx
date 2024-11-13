import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/authContext";
import { StudentContext } from "@/context/studentContext";
import { getStudentEnrolledCoursesService } from "@/services";
import { Eye } from "lucide-react";
import { useContext, useEffect } from "react";

const StudentCourses = () => {
  const { studentEnrolledCourses, setStudentEnrolledCourses } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);

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
      <h1 className="text-3xl font-bold mb-8">Enrolled Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentEnrolledCourses && studentEnrolledCourses.length > 0 ? (
          studentEnrolledCourses.map((course) => (
            <Card key={course?._id} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="h-52 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold mb-1">{course?.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Created By <b>{course?.instructorName}</b>
                </p>
              </CardContent>
              <CardFooter>
                <Button className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
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
