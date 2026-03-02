import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AdminPanel from "./AdminPanel/AdminPanel";
import RegisterAgency from "./RegisterAgency/RegisterAgency";
import "./AdminPanel/AdminPanel.css";
import AgencyProfile from "./RegisterAgency/AgencyProfile"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="font-sans antialiased">
              <Navbar />
              <Hero />
            </div>
          }
        />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/register-agency" element={<RegisterAgency />} />
        <Route path="/agency/:id" element={<AgencyProfile />} />
      </Routes>
    </BrowserRouter>
  );
}