import { courseCategories } from "@/config";
import hero from "../../assets/hero.png";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/studentContext";
import {
  checkCoursePurchaseInfoService,
  getStudentCourseListService,
} from "@/services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
const Home = () => {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchAllCourses = async () => {
    const response = await getStudentCourseListService();
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
    }
  };

  const navigateToCourseDetailsOrCourseProgress = async (courseId) => {
    const response = await checkCoursePurchaseInfoService(
      courseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${courseId}`);
      } else navigate(`/course-details/${courseId}`);
    }
  };

  const navigateToCoursesPage = async (categoryId) => {
    sessionStorage.removeItem("filters");
    const newFilter = {
      category: [categoryId],
    };
    sessionStorage.setItem("filters", JSON.stringify(newFilter));
    navigate("/courses");
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);
  return (
    <div className="min-h-screen bg-slate-900">
      <section className="flex flex-col items-center justify-between px-4 py-8 lg:flex-row lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="mb-4 text-3xl font-bold">
            Miles to go before <i>"YOU"</i> sleep
          </h1>
          <p className="text-xl">
            <i>Learn Skills that shape your Future!</i>
          </p>
        </div>
        <div className="mb-8 lg:w-full lg:mb-0">
          <img
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
            src={hero}
            alt="banner-image"
          />
        </div>
      </section>
      <section className="px-4 py-8 bg-slate-800 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold">Course Categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {courseCategories.map((category) => (
            <Button
              key={category.id}
              className="justify-start"
              variant="outline"
              onClick={() => navigateToCoursesPage(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="px-4 py-12 lg:px-8 ">
        <h2 className="mb-6 text-2xl font-bold">Featured Courses</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((course) => (
              <div
                onClick={() =>
                  navigateToCourseDetailsOrCourseProgress(course?._id)
                }
                key={course?._id}
                className="overflow-hidden border rounded-lg shadow cursor-pointer"
              >
                <img
                  width={300}
                  height={150}
                  className="object-cover w-full h-40"
                  src={course?.image}
                  alt="course-image"
                />
                <div className="p-4">
                  <h3 className="mb-2 font-bold">{course?.title}</h3>
                  <p className="mb-2 text-sm text-gray-400">
                    {course?.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">$ {course?.pricing}</p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-3xl font-bold">No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
