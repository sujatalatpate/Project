import React, { useState } from "react";
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
const steps = [
  "Personal Information",
  "Details",
  "Skills Details",
  "Credentail Details",
];

export default function Stepperform() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleDataChange = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      // Final step - prepare data
      console.log("Submitting formData:", formData);

      const entry = {
        srno: Date.now(),
        name: formData.name,
        email: formData.email,
        phoneno: formData.phoneno,
        gender: formData.gender,
        // You can store more info locally if needed
      };

      // Save to localStorage for list display
      const existing = JSON.parse(localStorage.getItem("formList") || "[]");
      localStorage.setItem("formList", JSON.stringify([...existing, entry]));

      // 🔥 Register via API
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://reactinterviewtask.codetentaclestechnologies.in/api/api/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              c_password: formData.c_password,
              role: "user",
            }),
          }
        );

        const result = await res.json();
        console.log("📨 Status Code:", res.status);
        console.log("📨 Response Body:", result);

        if (!res.ok) {
          alert(result.message || "Registration failed");
          console.log("Failed Registration Payload:", {
            email: formData.email,
            password: formData.password,
            c_password: formData.c_password,
          });
          return;
        }

        console.log("Registered user:", result);
      } catch (error) {
        console.error("Registration error:", error);
        alert("Network error while registering");
        return;
      }
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Personaldetails onChange={handleDataChange} />
          </>
        );
      case 1:
        return (
          <>
            <Countrydetails onChange={handleDataChange} />
          </>
        );
      case 2:
        return (
          <>
            <Skillsdetails onChange={handleDataChange} />
          </>
        );
      case 3:
        return (
          <>
            <Credentaildetails onChange={handleDataChange} />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
        <div>
          <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
            Stepper Form
          </h3>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700 mb-2">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <>
            {activeStep === steps.length ? (
              <div className="flex justify-center  w-full mt-5">
                <div className=" p-8 m-4">
                  <Typography variant="h5" className="mt-10 mb-10 pb-10">
                    Thank you for submitting the form!
                  </Typography>
                  <Link
                    to="/List"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    View List
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Typography variant="h5">
                  {getStepContent(activeStep)}
                </Typography>
                <div className="flex justify-center">
                  <div className="flex justify-between w-full mt-4">
                    <Button
                      className="bg-back "
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </Layout>
  );
}
