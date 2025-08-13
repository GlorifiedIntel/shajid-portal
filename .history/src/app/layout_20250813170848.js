import { Poppins, Roboto, Play } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';


const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const robotoSans = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playSans = Play({
  variable: "--font-play-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Shajid Royal College Portal",
  description: "About The Shajid Royal College of Nursing and Midwifery Student Portal is a secure, user-friendly online platform designed to support students throughout their academic journey. Through the portal, students can easily access essential resources such as course materials, lecture schedules, examination timetables, academic results, and fee payment options.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${poppinsSans.variable} ${playSans.variable}`}style={{ fontFamily: "var(--font-roboto), sans-serif" }}>
          <Navbar />
           {children}
           <Footer />
      </body>
    </html>
  );
}