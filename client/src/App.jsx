import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import ProtectRoute from "./components/protectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Dashboard from "./pages/instructor/Dashboard";
import StudentViewLayout from "./components/studentView/StudentViewLayout";
import Home from "./pages/student/Home";
import NotFound from "./pages/notFound/NotFound";
import AddCourse from "./pages/instructor/AddCourse";
import Courses from "./pages/student/Courses";
import CourseDetails from "./pages/student/CourseDetails";
import PaymentReturn from "./pages/student/PaymentReturn";
import StudentCourses from "./pages/student/StudentCourses";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <ProtectRoute
              authenticated={auth.authenticate}
              user={auth?.user}
              element={<AuthPage />}
            />
          }
        />
        <Route
          path="/instructor"
          element={
            <ProtectRoute
              authenticated={auth.authenticate}
              user={auth?.user}
              element={<Dashboard />}
            />
          }
        />
        <Route
          path="/instructor/create-course"
          element={
            <ProtectRoute
              authenticated={auth.authenticate}
              user={auth?.user}
              element={<AddCourse />}
            />
          }
        />
        <Route
          path="/instructor/edit-course/:courseId"
          element={
            <ProtectRoute
              authenticated={auth.authenticate}
              user={auth?.user}
              element={<AddCourse />}
            />
          }
        />
        <Route
          path="/"
          element={
            <ProtectRoute
              authenticated={auth.authenticate}
              user={auth?.user}
              element={<StudentViewLayout />}
            />
          }
        >
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="course-details/:courseId" element={<CourseDetails />} />
          <Route path="payment-return" element={<PaymentReturn />} />
          <Route path="student-courses" element={<StudentCourses />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
