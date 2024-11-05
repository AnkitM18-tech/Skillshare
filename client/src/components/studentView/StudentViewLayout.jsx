import React from "react";
import { Outlet } from "react-router-dom";

const StudentViewLayout = () => {
  return (
    <div>
      Student Layout
      <Outlet />
    </div>
  );
};

export default StudentViewLayout;
