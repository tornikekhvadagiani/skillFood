import React, { useEffect, useState } from "react";
import StageForm from "./StageForm";
import { toast } from "react-toastify";
import BlueButton from "../../../../components/BlueButton";
import SelectCourierHours from "../../../../components/SelectCourierHours";
import usePostRequest from "../../../../hooks/usePostRequest";
import usePutRequest from "../../../../hooks/usePutRequest"; // Import the put request
import { useNavigate } from "react-router-dom";
import { InputFieldProps } from "../../../../interfaces/input-field-interface";
import { useCloudinaryUpload } from "../../../../hooks/useCloudinaryUpload";
import { useTransformedWorkingHours } from "../../../../hooks/useTransformedWorkingHours";

const CourierRegister: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [hoursModalActive, setHoursModalActive] = useState<boolean>(false);
  const [workingHours, setWorkingHours] = useState<Record<string, string[]>>(
    {}
  );
  const transformedWorkingHours = useTransformedWorkingHours(workingHours);
  const { VITE_API_URL, VITE_COURIERS_KEY, VITE_DATES_KEY, VITE_DATES_UUID } =
    import.meta.env;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(transformedWorkingHours);
  }, [workingHours, transformedWorkingHours]);

  const requiredFields: string[] = [
    "firstname",
    "email",
    "personalId",
    "phone",
    "password",
    "vehicle",
  ];

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSelectionChange = (
    newWorkingHours: Record<string, string[]>
  ) => {
    setTimeout(() => {
      setWorkingHours(newWorkingHours);
      handleInputChange("workingHours", JSON.stringify(newWorkingHours));
    }, 0);
  };

  const nextStage = () => {
    if (stage === 3) return;
    const currentStageInputs = inputsStages[stage - 1];
    let hasError = false;
    const newErrors: { [key: string]: boolean } = {};

    currentStageInputs.forEach((input) => {
      if (requiredFields.includes(input.name) && !formData[input.name]) {
        newErrors[input.name] = true;
        hasError = true;
        toast.error(`Please fill in the ${input.name} field`);
      }
    });

    setErrors(newErrors);
    if (!hasError) setStage((prev) => prev + 1);
  };

  const prevStage = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    let hasError = false;
    const newErrors: { [key: string]: boolean } = {};

    if (Object.keys(workingHours).length < 5) {
      newErrors["workingHours"] = true;
      hasError = true;
      toast.error("Please select at least 5 working days");
    }
    if (!formData["vehicle"]) {
      newErrors["vehicle"] = true;
      hasError = true;
      toast.error("Please fill in the vehicle field");
    }

    setErrors(newErrors);
    if (hasError) return;

    let profilePictureUrl: string | null = null;

    if (formData.profilepicture) {
      profilePictureUrl = await useCloudinaryUpload(formData.profilepicture);
      if (!profilePictureUrl) {
        toast.error("Image upload failed");
        return;
      }
    }

    const requestData = {
      firstname: formData.firstname,
      lastname: formData.lastname || null,
      email: formData.email,
      personalId: formData.personalId,
      phone: formData.phone,
      dates: workingHours,
      password: formData.password,
      profilepicture: profilePictureUrl,
      role: formData.role,
      vehicle: formData.vehicle,
      userCalled: [],
      isAviable: true,
    };

    const courierData = await usePostRequest({
      baseUrl: VITE_API_URL,
      key: VITE_COURIERS_KEY,
      data: requestData,
      endPoint: "couriers",
      toastError: "Failed To Create Courier Account",
      toastSuccess: "Courier Account Created Successfully",
      navigate: navigate,
      navigateUrl: "/registration/login/couriers",
    });
    if (courierData) {
      await usePutRequest({
        baseUrl: VITE_API_URL,
        key: VITE_DATES_KEY,
        data: transformedWorkingHours,
        endPoint: `dates/${VITE_DATES_UUID}`,
        toastError: "Failed To Update Working Hours",
        toastSuccess: "Working Hours Updated Successfully",
      });
    }
  };

  const inputsStages: InputFieldProps[][] = [
    [
      {
        name: "firstname",
        type: "text",
        placeholder: "First Name",
        value: formData.firstname || "",
        onChange: (e) => handleInputChange("firstname", e.target.value),
      },
      {
        name: "lastname",
        type: "text",
        placeholder: "Last Name",
        value: formData.lastname || "",
        onChange: (e) => handleInputChange("lastname", e.target.value),
      },
      {
        name: "personalId",
        type: "text",
        placeholder: "Personal ID",
        value: formData.personalId || "",
        onChange: (e) => handleInputChange("personalId", e.target.value),
      },
    ],
    [
      {
        name: "phone",
        type: "number",
        placeholder: "Phone Number",
        value: formData.phone || "",
        onChange: (e) => handleInputChange("phone", e.target.value),
      },
      {
        name: "email",
        type: "email",
        placeholder: "Email",
        value: formData.email || "",
        onChange: (e) => handleInputChange("email", e.target.value),
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        value: formData.password || "",
        onChange: (e) => handleInputChange("password", e.target.value),
      },
    ],
    [
      {
        name: "vehicle",
        type: "text",
        placeholder: "Vehicle Type",
        value: formData.vehicle || "",
        onChange: (e) => handleInputChange("vehicle", e.target.value),
      },
      {
        name: "profilepicture",
        type: "file",
        isFile: true,
        onChange: (e) =>
          handleInputChange("profilepicture", e.target.files?.[0] || null),
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
