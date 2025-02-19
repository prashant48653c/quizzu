"use client";
import Sidebar from "@/components/profile/Sidebar";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import QueryProvider from "@/provider/QueryClientProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { error, data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/me");
      return response.data.data.user;
    },
  });
  if (error) {
    return <div>Error to load profile</div>;
  }
  if (isLoading) {
    return <h3>Loading....</h3>;
  }
  if (data) {
    console.log(data);
  }
  return (
    <>
      <div className="flex min-h-screen mt-4 justify-center">
        <div className="flex w-10/12 border border-slate-200">
          <Sidebar data={data} />
          <QueryProvider>


          {children}
          </QueryProvider>
          
        </div>
      </div>
    </>
  );
};

export default Layout;
