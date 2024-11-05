import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CourseSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Label>Upload Course Banner Image</Label>
          <Input type="file" accept="image/*" className="mb-4 cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
