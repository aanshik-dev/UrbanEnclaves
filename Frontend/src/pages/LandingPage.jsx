import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05000a]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
