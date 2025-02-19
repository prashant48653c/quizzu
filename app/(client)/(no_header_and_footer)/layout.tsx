import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/provider/QueryClientProvider";
 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
      </body>
    </html>
  );
}
