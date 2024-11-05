import React from "react";
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

const InstructorCourses = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl font-bold">All Courses</CardTitle>
        <Button
          onClick={() => navigate("/instructor/create-course")}
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
              <TableRow>
                <TableCell className="font-medium">MERN Full Stack</TableCell>
                <TableCell>1</TableCell>
                <TableCell>₹ 5999</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-6 h-6 text-green-500" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-6 h-6 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
