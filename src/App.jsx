import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Admin
import AdminPanel from "./AdminPanel/AdminPanel";


// Agency
import AgencyLandingPage from "./RegisterAgency/AgencyLandingPage";
import RegisterAgency from "./RegisterAgency/RegisterAgency";
import AgencyProfile from "./RegisterAgency/AgencyProfile";
import AgencyDashboard from "./RegisterAgency/AgencyDashboard";
import TeamOnboarding from "./Team/TeamOnboarding";

// Freelancer
import LandingPage from "./Freelancer/LandingPage";
import OnboardingFlow from "./Freelancer/onboarding/OnboardingFlow";
import PublicProfile from "./Freelancer/Public Profile/PublicProfile";
import Dashboard from "./Freelancer/Dashboard";
import  ProjectDetailPage from './Freelancer/Project/projects';

// Hire Talent
import HireTalentLandingPage from "./hire-talent/LandingPage";
import HireTalentDashboard from "./hire-talent/HireTalentDashboard";
import HireTalentOnboarding from "./hire-talent/onboarding/OnboardingFlow";

// Project Demo
import ProjectStreamDemo from "./projectdemo/projectstreamDemo";
import  AuthPage from './components/Signin'

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

function TeamOnboardingPage() {
  const navigate = useNavigate();
  return <TeamOnboarding onGoToDashboard={() => navigate("/agency/dashboard")} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Shared */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signin" element={<AuthPage/>}/>

        {/* Agency routes */}
        <Route path="/register-agency" element={<AgencyLandingPage/>} />
        <Route path="/agency/:id" element={<AgencyProfile />} />
        <Route path="/agency/dashboard" element={<AgencyDashboard />} />
        <Route path="/invite-team" element={<TeamOnboardingPage />} />

        {/* Freelancer routes */}
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/project/:id" element={<ProjectDetailPage/>}/>

        {/* Hire Talent routes */}
        <Route path="/hire-talent" element={<HireTalentLandingPage/>} />
        <Route path="/hire-talent/dashboard" element={<HireTalentDashboard />} />
        <Route path="/hire-talent/onboarding" element={<HireTalentOnboarding />} />

        {/* Project Demo */}
        <Route path="/project-stream" element={<ProjectStreamDemo />} />
      </Routes>
    </BrowserRouter>
  );
}