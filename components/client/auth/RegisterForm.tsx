'use client'

import { useToast } from "@/hooks/use-toast";
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
 
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    try {
      const res = await axiosInstance.post('/user/register', formData);
      console.log('Success:', res.data);
      localStorage.setItem('userId', res.data.data.createdUser._id);
      toast({
        title: "Success",
        description: "Registration successful!",
        variant: "default",
        duration: 2000,
      });
      router.push('/profile');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="mt-5">
      <h4 className="text-xl font-semibold mb-4">Register</h4>
      <form className="flex flex-col gap-5 mt-3" onSubmit={handleRegister}>
        <input
          type="text"
          name="fullname"
          className="outline-none border border-gray-300 p-2 rounded-md focus:border-blue-500"
          placeholder="Enter your full name"
          value={formData.fullname}
          onChange={handleInputChange}
        />
        <input
          type="email"
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
            Register
          </button>
        </div>
      </form>
  
    </div>
  );
};

export default RegisterForm;

