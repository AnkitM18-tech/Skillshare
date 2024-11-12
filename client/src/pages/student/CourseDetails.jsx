import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { StudentContext } from "@/context/studentContext";
import { getStudentCourseDetailsService } from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const CourseDetails = () => {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseId,
    setCurrentCourseId,
    loading,
    setLoading,
  } = useContext(StudentContext);

  const [displayVideoFreePreview, setDisplayVideoFreePreview] = useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);

  const { courseId } = useParams();
  const location = useLocation();

  async function fetchCourseDetails() {
    const response = await getStudentCourseDetailsService(currentCourseId);
    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
    }
    setLoading(false);
  }

  function showFreePreview(curriculum) {
    setDisplayVideoFreePreview(curriculum?.videoUrl);
  }

  useEffect(() => {
    if (displayVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayVideoFreePreview]);

  useEffect(() => {
    if (currentCourseId !== null) {
      fetchCourseDetails();
    }
  }, [currentCourseId]);

  useEffect(() => {
    if (courseId) setCurrentCourseId(courseId);
  }, [courseId]);

  useEffect(() => {
    if (!location.pathname.includes("course-details")) {
      setStudentViewCourseDetails(null);
      setCurrentCourseId(null);
    }
  }, [location.pathname]);

  if (loading) return <Skeleton />;

  const getIndexOfFreePreview =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;

  return (
    <div className="mx-auto p-4">
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">
          {studentViewCourseDetails?.title}
        </h1>
        <p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {studentViewCourseDetails?.instructorName}</span>
          <span>Created On {studentViewCourseDetails?.date.split("T")[0]}</span>
          <span className="flex items-center px-4">
            <Globe className="mr-2 h-4 w-4" />
            {studentViewCourseDetails?.primaryLanguage.toUpperCase()}
          </span>
          <span>
            {studentViewCourseDetails?.students?.length}{" "}
            {studentViewCourseDetails?.students?.length >= 1
              ? "Enrollments"
              : "Enrollment"}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {studentViewCourseDetails?.objectives
                  .split(",")
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{studentViewCourseDetails?.description}</CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {studentViewCourseDetails?.curriculum?.map(
                (curriculum, index) => (
                  <li
                    className={`${
                      curriculum?.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } flex item-center mb-4`}
                    key={index}
                    onClick={
                      curriculum?.freePreview
                        ? () => showFreePreview(curriculum)
                        : null
                    }
                  >
                    {curriculum?.freePreview ? (
                      <PlayCircle className="mr-2 h-6 w-6" />
                    ) : (
                      <Lock className="mr-2 h-6 w-6" />
                    )}
                    <span>{curriculum?.title}</span>
                  </li>
                )
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getIndexOfFreePreview !== -1
                      ? studentViewCourseDetails?.curriculum[
                          getIndexOfFreePreview
                        ].videoUrl
                      : ""
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ₹ {studentViewCourseDetails?.pricing}
                </span>
              </div>
              <div>
                <Button className="w-full bg-green-500">Buy Now</Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayVideoFreePreview(null);
        }}
      >
        <DialogContent className="w-[600px]">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <VideoPlayer
              url={displayVideoFreePreview}
              width="450px"
              height="200px"
            />
          </div>
          <div className="flex flex-col gap-4">
            {studentViewCourseDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filteredItem) => (
                <p
                  key={filteredItem?._id}
                  onClick={() => showFreePreview(filteredItem)}
                  className="cursor-pointer text-[16px] font-medium"
                >
                  <span
                    className={`${
                      displayVideoFreePreview === filteredItem?.videoUrl
                        ? " bg-black p-2 text-white rounded-lg"
                        : ""
                    }`}
                  >
                    {filteredItem?.title}
                  </span>
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button className="bg-red-400" type="button">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetails;
