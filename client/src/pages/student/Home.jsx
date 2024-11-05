import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import React, { useContext } from "react";

const Home = () => {
  const { resetCredentials } = useContext(AuthContext);
  const logout = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <div>
      Home
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Home;
