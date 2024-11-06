import { InstructorContext } from "@/context/instructorContext";
import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";
import { courseCurriculumInitialFormData } from "@/config";

const Curriculum = () => {
  const { courseCurriculumFormData, setCourseCurriculumFormData } =
    useContext(InstructorContext);

  const addLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      courseCurriculumInitialFormData[0],
    ]);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={addLecture}>Add Lecture</Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((item, index) => (
            <div key={item.public_id} className="p-5 border rounded-md">
              <div className="flex items-center gap-5">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture Title"
                  className="max-w-96"
                />
                <div className="flex items-center space-x-2">
                  <Switch checked={false} id={`freePreview-${index + 1}`} />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6 ">
                <Input
                  type="file"
                  accept="video/*"
                  className="mb-4 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Curriculum;
