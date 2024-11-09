import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InstructorContext } from "@/context/instructorContext";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";

const InstructorCourses = ({ listOfCourses }) => {
  const navigate = useNavigate();
  const {
    setEditCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl font-bold">All Courses</CardTitle>
        <Button
          onClick={() => {
            setEditCourseId(null);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            setCourseLandingFormData(courseLandingInitialFormData);
            navigate("/instructor/create-course");
          }}
          className="p-6"
        >
          Create New Course +
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Students Enrolled</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course) => (
                    <TableRow key={course?.title}>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>
                        ₹{" "}
                        {parseFloat(course?.pricing) *
                          parseInt(course?.students?.length)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="w-6 h-6 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-6 h-6 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
