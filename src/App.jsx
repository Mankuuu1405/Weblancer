import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AdminPanel from "./AdminPanel/AdminPanel";
import RegisterAgency from "./RegisterAgency/RegisterAgency";
import "./AdminPanel/AdminPanel";
import AgencyProfile from "./RegisterAgency/AgencyProfile"
import AgencyDashboard from "./RegisterAgency/AgencyDashboard"
import TeamOnboarding from "./Team/TeamOnboarding";

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
        <Route path="/dashboard" element={<AgencyDashboard />} />
        <Route path="/invite-team" element={<TeamOnboarding />} />
      </Routes>
    </BrowserRouter>
  );
}