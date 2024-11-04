import React from "react";
import { Button } from "../ui/button";
import FormControls from "./FormControls";

const Form = ({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* form controls */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default Form;
