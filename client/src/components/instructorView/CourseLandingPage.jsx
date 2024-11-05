import React, { useContext } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import FormControls from "../form/FormControls";
import { courseLandingPageFormControls } from "@/config";
import { InstructorContext } from "@/context/instructorContext";

const CourseLandingPage = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);
  return (
    <Card>
      <CardHeader>Course Landing Page</CardHeader>
      <CardContent>
        <FormControls
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  );
};

export default CourseLandingPage;
