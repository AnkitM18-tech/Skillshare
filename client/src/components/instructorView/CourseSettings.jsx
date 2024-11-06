import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InstructorContext } from "@/context/instructorContext";
import { mediaUploadService } from "@/services";
import ProgressBar from "../form/ProgressBar";

const CourseSettings = () => {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercent,
    setMediaUploadProgressPercent,
  } = useContext(InstructorContext);

  async function handleImageUpload(event) {
    const image = event.target.files[0];
    if (image) {
      const imageFormData = new FormData();
      imageFormData.append("file", image);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          imageFormData,
          setMediaUploadProgressPercent
        );
        if (response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response?.data?.url,
            public_id: response?.data?.public_id,
          });
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <div className="p-4">
        {mediaUploadProgress ? (
          <ProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercent}
          />
        ) : null}
      </div>
      <CardContent>
        {courseLandingFormData?.image ? (
          <img src={courseLandingFormData.image} />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Banner Image</Label>
            <Input
              onChange={handleImageUpload}
              type="file"
              accept="image/*"
              className="mb-4 cursor-pointer"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
