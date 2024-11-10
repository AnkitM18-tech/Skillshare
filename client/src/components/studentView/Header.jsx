import { GraduationCap, TvMinimalPlay } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/authContext";

const Header = () => {
  const { resetCredentials } = useContext(AuthContext);
  const logOut = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-bold md:text-xl text-[14px]">SkillShare</span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3">
            <span className="font-bold md:text-xl text-[14px]">My Courses</span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
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
