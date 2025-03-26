import React, { useEffect, useState } from "react";
import MyForm from "../../../components/MyForm";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import useGetRequest from "../../../hooks/useGetRequest";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  loginType: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginType }) => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>(
    {}
  );

  const [users, setUsers] = useState<any[]>([]);

  const { VITE_API_URL, VITE_COURIERS_KEY, VITE_ADMINS_KEY, VITE_USERS_KEY } =
    import.meta.env;
  const { login } = useAuth();
  const navigate = useNavigate();
  const correctKey = () => {
    switch (loginType) {
      case "admins":
        return VITE_ADMINS_KEY;
      case "couriers":
        return VITE_COURIERS_KEY;
      case "users":
        return VITE_USERS_KEY;
    }
  };

  const { data, error, loading } = useGetRequest({
    baseUrl: `${VITE_API_URL}`,
    key: correctKey(),
    endPoint: loginType,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
    if (error) {
      toast.error(error);
    }
  }, [data, error]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email,
        password: !formData.password,
      });
      toast.error("Please fill in all fields.");
      return;
    }

    if (!users || users.length === 0) {
      toast.error("No users found.");
      return;
    }
    console.log(data);

    const user = users.find(
      (user: any) =>
        user.email === formData.email && user.password === formData.password
    );

    if (user) {
      localStorage.setItem("loginedAccount", JSON.stringify(user));
      toast.success("Login successful!");
      login(user);
      navigate("/");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
  }, [loginType]);

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
      value: "Login",
      inputClassName: "bg-var-blue text-white cursor-pointer",
    },
  ];

  if (loading) {
    return (
      <ClipLoader
        color={"royalblue"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="mx-auto "
      />
    );
  }

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
