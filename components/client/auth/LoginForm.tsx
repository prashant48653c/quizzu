"use client";

import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const { setToken } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axiosInstance.post("/user/login", formData);
      console.log("Success:", res.data);
      const userId = res.data.data.loggedInUser._id;
      localStorage.setItem("userId", userId);
      const token = res.data.data.accessToken;
      setToken(token);

      toast({
        title: "Success",
        description: "Login successful!",
        variant: "default",
      });

      router.push("/profile");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-5">
      <h4 className="text-xl font-semibold mb-4">Login</h4>
      <form className="flex flex-col gap-5 mt-3" onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          className="outline-none border border-gray-300 p-2 rounded-md focus:border-blue-500"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="outline-none border border-gray-300 p-2 rounded-md focus:border-blue-500"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

