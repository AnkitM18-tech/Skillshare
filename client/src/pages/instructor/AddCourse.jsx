import CourseLandingPage from "@/components/instructorView/CourseLandingPage";
import CourseSettings from "@/components/instructorView/CourseSettings";
import Curriculum from "@/components/instructorView/Curriculum";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const AddCourse = () => {
  return (
    <div className="container p-4 mx-auto">
      <div className="flex justify-between">
        <h1 className="mb-5 text-3xl font-bold">Create New Course</h1>
        <Button className="px-8 text-sm font-bold tracking-wider">
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
