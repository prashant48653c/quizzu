import { FaFacebookSquare, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-[#0B436D] ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="w-full md:w-[379px] h-auto md:h-[259px] flex flex-col justify-between border-none shadow-none bg-transparent">
            <CardContent className="space-y-4 flex flex-col gap-8">
              <p className="text-md text-white">
                Explore, learn, and challenge yourself with our interactive exams. Expand your knowledge and track your progress effortlessly.
              </p>
          
              <div className="flex space-x-4">
                <a href="#" className="text-[#95FFE1] hover:text-primary-foreground/80">
                  <FaFacebookSquare className="h-[27px] w-[27px]" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-[#95FFE1] hover:text-primary-foreground/80">
                  <FaYoutube className="h-[27px] w-[27px]" />
                  <span className="sr-only">YouTube</span>
                </a>
                <a href="#" className="text-[#95FFE1] hover:text-primary-foreground/80">
                  <FaLinkedin className="h-[27px] w-[27px]" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="text-[#95FFE1] hover:text-primary-foreground/80">
                  <FaInstagram className="h-[27px] w-[27px]" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-md text-white">© 2024 Quizu. All rights reserved.</p>
            </CardFooter>
          </Card>

          <Card className="bg-transparent border-none w-40 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-white font-bold">About</CardTitle>
            </CardHeader>
            <CardContent>
              <nav>
                <ul className="space-y-1 text-white text-sm">
                  <li><a href="#" className="hover:underline">Home</a></li>
                  <li><a href="#" className="hover:underline">About</a></li>
                  <li><a href="#" className="hover:underline">Dashboard</a></li>
                  <li><a href="#" className="hover:underline">Study Material</a></li>
                  <li><a href="#" className="hover:underline">News</a></li>
                </ul>
              </nav>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white font-bold">Company</CardTitle>
              </CardHeader>
              <CardContent>
                <nav>
                  <ul className="space-y-1 text-white text-sm">
                    <li><a href="#" className="hover:underline">About us</a></li>
                    <li><a href="#" className="hover:underline">Terms of Service</a></li>
                    <li><a href="#" className="hover:underline">Blog</a></li>
                  </ul>
                </nav>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white font-bold">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-white text-sm">
                <p>Kathmandu, Nepal</p>
                <p>+977 01 5891517</p>
                <p>support@quizu.com.np</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


      <div className="py-8 text-center">
        <h1 className="text-6xl text-[#95FFE1] font-bold tracking-[0.3em] sm:text-8xl md:text-9xl lg:text-[10rem]">
          QUIZU
        </h1>
      </div>
    </footer>
  )
}