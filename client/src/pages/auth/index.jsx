import Form from "@/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/authContext";

import { GraduationCap } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
  } = useContext(AuthContext);

  const changeActiveTab = (value) => {
    setActiveTab(value);
  };

  const checkSignInFormValidity = () => {
    return (
      signInFormData &&
      signInFormData.email !== "" &&
      signInFormData.password !== ""
    );
  };
  const checkSignUpFormValidity = () => {
    return (
      signUpFormData &&
      signUpFormData.username !== "" &&
      signUpFormData.email !== "" &&
      signUpFormData.password !== ""
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="/" className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="text-xl font-bold">SkillShare</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          onValueChange={changeActiveTab}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create A New Account</CardTitle>
                <CardDescription>
                  Enter Your Details to Get Started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkSignUpFormValidity()}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign In to Your Existing Account</CardTitle>
                <CardDescription>
                  Sign In to Access Your Account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkSignInFormValidity()}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
