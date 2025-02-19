'use client'
import useAuthStore from "@/store/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AuthSuccess = () => {
  const searchParams = useSearchParams();
const router=useRouter();
const {setToken}=useAuthStore();
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
 
    if (accessToken && refreshToken) {
 
 
    setToken(accessToken)
      router.push("/profile");
    } else {
    
      router.push("/login");
    }
  }, []);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
