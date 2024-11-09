import CourseLandingPage from "@/components/instructorView/CourseLandingPage";
import CourseSettings from "@/components/instructorView/CourseSettings";
import Curriculum from "@/components/instructorView/Curriculum";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/context/authContext";
import { InstructorContext } from "@/context/instructorContext";
import { addNewCourseService } from "@/services";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    courseLandingFormData,
    setCourseLandingFormData,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;
    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }
      if (item.freePreview) {
        // found atleast one free preview
        hasFreePreview = true;
      }
    }
    return hasFreePreview;
  }

  async function createCourse() {
    const courseAggregatedFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.username,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };

    const response = await addNewCourseService(courseAggregatedFormData);

    if (response?.success) {
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      setCourseLandingFormData(courseLandingInitialFormData);
      navigate(-1); // move to previous page
    }
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="flex justify-between">
        <h1 className="mb-5 text-3xl font-bold">Create New Course</h1>
        <Button
          disabled={!validateFormData()}
          className="px-8 text-sm font-bold tracking-wider"
          onClick={createCourse}
        >
          Create
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container p-4 mx-auto">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <Curriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLandingPage />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCourse;
