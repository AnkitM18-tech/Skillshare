import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { StudentContext } from "@/context/studentContext";
import { getStudentCourseListService } from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Courses = () => {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loading,
    setLoading,
  } = useContext(StudentContext);
  const navigate = useNavigate();

  const onFilterChange = (sectionId, option) => {
    let copyOfFilters = { ...filters };
    const indexOfSection = Object.keys(copyOfFilters).indexOf(sectionId);
    if (indexOfSection === -1) {
      copyOfFilters = {
        ...copyOfFilters,
        [sectionId]: [option.id],
      };
    } else {
      const indexOfOption = copyOfFilters[sectionId].indexOf(option.id);
      if (indexOfOption === -1) {
        copyOfFilters[sectionId].push(option.id);
      } else {
        copyOfFilters[sectionId].splice(indexOfOption, 1);
      }
    }
    setFilters(copyOfFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyOfFilters));
  };

  const fetchAllCourses = async (filters, sort) => {
    const query = new URLSearchParams({ ...filters, sortBy: sort });
    const response = await getStudentCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoading(false);
    }
  };

  const createSearchParamsUtil = (filters) => {
    const queryParams = [];
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value) && value.length > 0) {
        const param = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(param)}`);
      }
    }
    return queryParams.join("&");
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsUtil(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) fetchAllCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => sessionStorage.removeItem("filters");
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">All Courses</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <aside className="w-full space-y-4 md:w-64">
          <div>
            {Object.keys(filterOptions).map((key) => (
              <div key={key} className="p-4 border-b">
                <h3 className="mb-3 font-bold">{key.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[key].map((option) => (
                    <Label
                      key={option.id}
                      className="flex items-center gap-3 font-medium"
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[key] &&
                          filters[key].indexOf(option.id) > -1
                        }
                        onCheckedChange={() => onFilterChange(key, option)}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex items-center justify-end gap-3 p-5 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm font-bold text-black">
              {studentViewCoursesList.length} Results
            </span>
          </div>
          <div className="space-y-4">
            {loading && <Skeleton />}
            {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.map((course) => (
                <Card
                  onClick={() => navigate(`/course-details/${course._id}`)}
                  className="cursor-pointer"
                  key={course?._id}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="flex-shrink-0 w-48 h-32">
                      <img
                        className="object-cover w-full h-full"
                        src={course?.image}
                        alt="course-image"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-2 text-xl">
                        {course?.title}
                      </CardTitle>
                      <p className="mb-2 text-sm text-gray-500">
                        Created By <b>{course?.instructorName}</b>
                      </p>
                      <p className="text-[16px] text-gray-700 mt-3 mb-2">
                        {`${course?.curriculum?.length} ${
                          course?.curriculum?.length > 1
                            ? "Lectures"
                            : "Lecture"
                        } - Difficulty : ${course?.level.toUpperCase()}`}
                      </p>
                      <p className="text-lg font-bold">$ {course?.pricing}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : loading ? (
              <Skeleton />
            ) : (
              <h1 className="text-3xl font-bold">No Courses Found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
