import { InstructorContext } from "@/context/instructorContext";
import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";
import { courseCurriculumInitialFormData } from "@/config";
import { mediaUploadService } from "@/services";
import ProgressBar from "../form/ProgressBar";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const Curriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercent,
    setMediaUploadProgressPercent,
  } = useContext(InstructorContext);

  const addLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      courseCurriculumInitialFormData[0],
    ]);
  };

  const handleCourseTitleChange = (event, index) => {
    let copyOfCourseCurriculumFormData = [...courseCurriculumFormData];
    copyOfCourseCurriculumFormData[index] = {
      ...copyOfCourseCurriculumFormData[index],
      title: event.target.value,
    };
    setCourseCurriculumFormData(copyOfCourseCurriculumFormData);
  };

  const handleFreePreviewChange = (value, index) => {
    let copyOfCourseCurriculumFormData = [...courseCurriculumFormData];
    copyOfCourseCurriculumFormData[index] = {
      ...copyOfCourseCurriculumFormData[index],
      freePreview: value,
    };
    setCourseCurriculumFormData(copyOfCourseCurriculumFormData);
  };

  const handleSingleFileUpload = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const videoFormData = new FormData();
      videoFormData.append("file", file);
      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercent
        );
        if (response.success) {
          let copyOfCourseCurriculumFormData = [...courseCurriculumFormData];
          copyOfCourseCurriculumFormData[index] = {
            ...copyOfCourseCurriculumFormData[index],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(copyOfCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateCourseCurriculumFormData = () => {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!validateCourseCurriculumFormData() || mediaUploadProgress}
          onClick={addLecture}
        >
          Add Lecture
        </Button>
        {mediaUploadProgress ? (
          <ProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercent}
          />
        ) : null}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((item, index) => (
            <div key={item.public_id} className="p-5 border rounded-md">
              <div className="flex items-center gap-5">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture Title"
                  className="max-w-96"
                  onChange={(e) => handleCourseTitleChange(e, index)}
                  value={courseCurriculumFormData[index].title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index].freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6 ">
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index].videoUrl}
                      width="450px"
                      height="200px"
                    />
                    <Button>Replace Video</Button>
                    <Button className="bg-red-500">Delete Lecture</Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    className="mb-4 cursor-pointer"
                    onChange={(e) => handleSingleFileUpload(e, index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Curriculum;
