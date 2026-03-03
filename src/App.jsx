import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AdminPanel from "./AdminPanel/AdminPanel";
import "./AdminPanel/AdminPanel.css";
import LandingPage from "./Freelancer/LandingPage";
import OnboardingFlow from "./Freelancer/onboarding/OnboardingFlow";
import PublicProfile from "./Freelancer/Public Profile/PublicProfile";
import Dashboard from "./Freelancer/Dashboard";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="font-sans antialiased">
      <Navbar
        onAdminClick={() => navigate("/admin")}
        onFreelancerClick={() => navigate("/freelancer")}
      />
      <Hero
        onAdminClick={() => navigate("/admin")}
        onFreelancerClick={() => navigate("/freelancer")}
      />
    </div>
  );
}

function Admin() {
  const navigate = useNavigate();
  return <AdminPanel onHome={() => navigate("/")} />;
}

function Freelancer() {
  const navigate = useNavigate();
  return <LandingPage onJoinClick={() => navigate("/onboarding")} />;
}

function Onboarding() {
  const navigate = useNavigate();
  return <OnboardingFlow onExit={() => navigate("/freelancer")} />;
}

function Profile() {
  const navigate = useNavigate();
  return <PublicProfile onBack={() => navigate(-1)} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}