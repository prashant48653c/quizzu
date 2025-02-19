import "@/app/globals.css";
import Footer from "@/components/client/common/Footer";
import Navbar from "@/components/client/common/ClientHeader";
import QueryProvider from "@/provider/QueryClientProvider";
 
import { Toaster } from "@/components/ui/toaster";
  
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
