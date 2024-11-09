import InstructorCourses from "@/components/instructorView/InstructorCourses";
import InstructorDashboard from "@/components/instructorView/InstructorDashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/authContext";
import { InstructorContext } from "@/context/instructorContext";
import { getCourseListService } from "@/services";
import { BarChart, Book, LogOut } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchCourseList() {
    const response = await getCourseListService();
    if (response?.success) {
      setInstructorCoursesList(response.data);
    }
  }

  useEffect(() => {
    fetchCourseList();
  }, []);
  const logout = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  const menu = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];
  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md md:block">
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-bold">Instructor View</h2>
          <nav>
            {menu.map((item) => (
              <Button
                key={item.value}
                className="justify-start w-full mb-2"
                variant={activeTab === item.value ? "secondary" : "ghost"}
                onClick={
                  item.value === "logout"
                    ? logout
                    : () => setActiveTab(item.value)
                }
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menu.map((item) => (
              <TabsContent key={item.value} value={item.value}>
                {item.component !== null ? item.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
