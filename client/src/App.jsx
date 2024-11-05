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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
