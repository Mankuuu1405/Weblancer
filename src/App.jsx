import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AdminPanel from "./AdminPanel/AdminPanel";
import "./AdminPanel/AdminPanel.css";
import LandingPage from "./Freelancer/LandingPage";
import OnboardingFlow from "./Freelancer/onboarding/OnboardingFlow";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "admin") {
    return <AdminPanel onHome={() => setPage("home")} />;
  }

  if (page === "freelancer") {
    return (
      <LandingPage
        onJoinClick={() => setPage("onboarding")}
      />
    );
  }

  if (page === "onboarding") {
    return <OnboardingFlow onExit={() => setPage("freelancer")} />;
  }

  return (
    <div className="font-sans antialiased">
      <Navbar
        onAdminClick={() => setPage("admin")}
        onFreelancerClick={() => setPage("freelancer")}
      />
      <Hero
        onAdminClick={() => setPage("admin")}
        onFreelancerClick={() => setPage("freelancer")}
      />
    </div>
  );
}