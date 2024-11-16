import { GraduationCap, TvMinimalPlay } from "lucide-react";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/authContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetCredentials } = useContext(AuthContext);
  const logOut = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <header className="relative flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center justify-center">
          <GraduationCap className="w-8 h-8 mr-4" />
          <span className="font-bold md:text-xl text-[14px]">SkillShare</span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
            variant="ghost"
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-4">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="font-bold md:text-xl text-[14px]">My Courses</span>
            <TvMinimalPlay className="w-8 h-8" />
          </div>
          <Button onClick={logOut} className="bg-red-500">
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
