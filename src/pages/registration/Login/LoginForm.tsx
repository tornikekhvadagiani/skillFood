import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyForm from "../../../components/MyForm";
import { toast } from "react-toastify";
import useGetRequest from "../../../hooks/useGetRequest";
interface LoginFormProps {
  registerAs: string;
}
import { useAuth } from "../../../contexts/AuthContext";
const LoginForm: React.FC<LoginFormProps> = ({ registerAs }) => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { VITE_API_URL, VITE_COURIERS_KEY } = import.meta.env;
  const { login } = useAuth();
  const { data: users } = useGetRequest({
    baseUrl: `${VITE_API_URL}/${registerAs}`,
    key: VITE_COURIERS_KEY,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email,
        password: !formData.password,
      });
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!users) {
      toast.error("Failed to load users.");
      setLoading(false);
      return;
    }

    const user = users.find(
      (user: any) =>
        user.email === formData.email && user.password === formData.password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");
      login(user);
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password.");
    }
    setLoading(false);
  };

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
  }, [registerAs]);

  const loginInputs = [
    {
      name: "email",
      type: "text",
      placeholder: "Enter Email",
      value: formData.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("email", e.target.value),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      value: formData.password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("password", e.target.value),
    },
    {
      name: "submit",
      type: "submit",
      value: loading ? "Logging in..." : "Login",
      inputClassName: "bg-var-blue text-white cursor-pointer",
    },
  ];

  return (
    <MyForm
      className="flex flex-col items-center justify-center w-full px-10 gap-3"
      inputs={loginInputs}
      onSubmit={submitLogin}
      errors={errors}
    />
  );
};

export default LoginForm;
