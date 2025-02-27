import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/provider/QueryClientProvider";
 import Navbar from "@/components/client/common/ClientHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        
        <Navbar></Navbar>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
      </body>
    </html>
  );
}
