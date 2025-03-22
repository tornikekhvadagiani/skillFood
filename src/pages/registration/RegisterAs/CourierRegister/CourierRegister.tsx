import React, { useState } from "react";
import StageForm from "./StageForm";
import BlueButton from "../../../../components/BlueButton";
import { InputFieldProps } from "../../../../interfaces/input-field-interface";
import SelectCourierHours from "../../../../components/SelectCourierHours";
import { toast } from "react-toastify";

const CourierRegister: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [hoursModalActive, setHoursModalActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isWorkingHoursSelected, setIsWorkingHoursSelected] =
    useState<boolean>(false); // New state to track if working hours are selected

  const requiredFields: string[] = [
    "role",
    "name",
    "email",
    "personalId",
    "phone",
    "password",
    "dates",
    "vehichle",
  ];

  const [selectedWorkingHours, setSelectedWorkingHours] = useState<
    Record<string, Set<string>>
  >({});

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [workingHours, setWorkingHours] = useState<Record<string, string[]>>(
    {}
  );

  const handleTimeSelectionChange = (
    newWorkingHours: Record<string, string[]>
  ) => {
    setWorkingHours(newWorkingHours);
    setIsWorkingHoursSelected(true);
    handleInputChange("workingHours", JSON.stringify(newWorkingHours));
  };

  const nextStage = () => {
    if (stage === 3) return;
    const currentStageInputs = inputsStages[stage - 1];
    let hasError = false;
    const newErrors: { [key: string]: boolean } = {};

    currentStageInputs.forEach((input, i) => {
      if (requiredFields.includes(input.name) && !formData[input.name]) {
        newErrors[input.name] = true;
        hasError = true;
        if (i === 1) toast.error("Please fill all required fields");
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      setStage((prev) => prev + 1);
    }
  };

  const prevStage = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;
    const newErrors: { [key: string]: boolean } = {};

    console.log(Object.keys(workingHours).length);

    if (Object.keys(workingHours).length <= 4) {
      newErrors["workingHours"] = true;
      hasError = true;
      toast.error("Please Select 5 or more days in week");
    }

    if (!formData["vehichle"]) {
      newErrors["vehichle"] = true;
      hasError = true;
      toast.error("Please fill in the vehicle field");
    }

    setErrors(newErrors);

    if (!hasError) {
      if (stage < 3) {
        setStage((prev) => prev + 1);
      }
    }

    console.log("Form Data:", formData);
  };

  const inputsStages: InputFieldProps[][] = [
    [
      {
        name: "role",
        type: "text",
        placeholder: "Enter your Role (courier)",
        value: formData.role || "",
        onChange: (e) => handleInputChange("role", e.target.value),
      },
      {
        name: "name",
        type: "text",
        placeholder: "Enter your first name",
        value: formData.name || "",
        onChange: (e) => handleInputChange("name", e.target.value),
      },
      {
        name: "last",
        type: "text",
        placeholder: "Enter your last name",
        value: formData.lastname || "",
        onChange: (e) => handleInputChange("lastname", e.target.value),
      },
    ],
    [
      {
        name: "personalId",
        type: "text",
        placeholder: "Enter your Personal ID",
        value: formData.personalId || "",
        onChange: (e) => handleInputChange("personalId", e.target.value),
      },
      {
        name: "phone",
        type: "number",
        placeholder: "Enter your phone number",
        value: formData.phone || "",
        onChange: (e) => handleInputChange("phone", e.target.value),
      },
      {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        value: formData.password || "",
        onChange: (e) => handleInputChange("password", e.target.value),
      },
    ],
    [
      {
        name: "file",
        type: "file",
        isFile: true,
        onChange: (e) => handleInputChange("file", e.target.files?.[0] || ""),
      },
      {
        name: "vehichle",
        type: "text",
        placeholder: "Enter vehichle type",
        value: formData.vehichle || "",
        onChange: (e) => handleInputChange("vehichle", e.target.value),
      },
      {
        name: "dates",
        type: "button",
        value: "Select Working Hours",
        inputClassName: `p-2 border rounded cursor-pointer ${
          errors["workingHours"] ? "border-red-500" : "border-gray-300"
        }`,
        onClick: () => setHoursModalActive(true),
      },
      {
        name: "submit",
        type: "submit",
        value: "Submit Registration",
        inputClassName: "bg-var-blue text-white cursor-pointer mt-10",
        onClick: () => handleSubmit,
      },
    ],
  ];

  return (
    <>
      <SelectCourierHours
        isOpen={hoursModalActive}
        setIsOpen={setHoursModalActive}
        onTimeSelectionChange={handleTimeSelectionChange}
      />
      <StageForm
        inputs={inputsStages[stage - 1]}
        onSubmit={handleSubmit}
        errors={errors}
      />
      <div className="flex py-10 gap-10">
        <BlueButton active={stage === 1} onClick={prevStage} title="Previous" />
        <BlueButton active={stage === 3} onClick={nextStage} title="Next" />
      </div>
    </>
  );
};

export default CourierRegister;
