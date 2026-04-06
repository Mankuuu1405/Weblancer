import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// root
import Signin from './components/Signin';

// Admin - Layout
import AdminLayout from "./AdminPanel/AdminLayout";

// Admin - User Management
import AdminUsers from "./AdminPanel/AdminUsers";
import AdminUserDetail from "./AdminPanel/AdminUserDetail";
import AdminFreelancers from "./AdminPanel/AdminFreelancers";
import AdminFreelancerDetail from "./AdminPanel/AdminFreelancerDetail";
import { AdminAgencies, AdminAgencyDetail } from "./AdminPanel/AdminAgencies";
import { AdminClients, AdminClientDetail } from "./AdminPanel/AdminClients";

// Admin - KYC
import { AdminKYC, AdminKYCDetail, AdminKYCAgencies, AdminKYCFreelancers } from "./AdminPanel/AdminKYC";

// Admin - Operations
import { AdminProjects, AdminProjectDetail } from "./AdminPanel/AdminProjects";
import { AdminEscrow, AdminPayouts, AdminPayoutDetail, AdminRefunds, AdminCommission } from "./AdminPanel/AdminPaymentsExtended";
import { AdminAtRiskProjects, AdminProjectStreamMonitor, AdminFrozenChats } from "./AdminPanel/AdminProjectStream";
import AdminDisputes from "./AdminPanel/AdminDisputes";
import { AdminDisputeDetail, AdminDisputesPending } from "./AdminPanel/AdminDisputesExtended";
import AdminPayments from "./AdminPanel/AdminPayments";

// Admin - Platform
import AdminAISettings from "./AdminPanel/AdminAISettings";
import { AdminAILogs, AdminAIOverrides } from "./AdminPanel/AdminAIExtended";
import AdminAuditLogs from "./AdminPanel/AdminAuditLogs";
import AdminSettings from "./AdminPanel/AdminSettings";
import { AdminSettingsGeneral, AdminSettingsCommission, AdminSettingsPolicies, AdminSettingsEmail, AdminSettingsRules } from "./AdminPanel/AdminSettingsExtended";
import { AdminAdmins, AdminRoles, AdminAuditLogsPage } from "./AdminPanel/AdminAdmins";

// Admin - Reports
import { AdminRevenueReport, AdminUsersReport, AdminProjectsReport, AdminDisputesReport } from "./AdminPanel/AdminReports";

// Admin - Communications
import AdminNotifications from "./AdminPanel/AdminNotifications";
import AdminAnnouncements from "./AdminPanel/AdminAnnouncements";

// Agency
import AgencyLayout from "./RegisterAgency/AgencyLayout";
import RegisterAgency from "./RegisterAgency/RegisterAgency";
import AgencyProfile from "./RegisterAgency/AgencyProfile";
import AgencyDashboard from "./RegisterAgency/AgencyDashboard";
import TeamOnboarding from "./Team/TeamOnboarding";
import ProjectDetailPage from "./RegisterAgency/ProjectDetailPage";
import AgencyProposals from "./RegisterAgency/AgencyProposals";
import AgencyContracts    from "./RegisterAgency/AgencyContracts";
import AgencyEarnings     from "./RegisterAgency/AgencyEarnings";
import AgencyWithdrawals  from "./RegisterAgency/AgencyWithdrawals";
import AgencyKYC          from "./RegisterAgency/AgencyKYC";
import AgencyReviews      from "./RegisterAgency/AgencyReviews";
import AgencyNotifications from "./RegisterAgency/AgencyNotifications";
import AgencySettings     from "./RegisterAgency/AgencySettings";
import AgencyLandingPage from "./RegisterAgency/AgencyLandingPage";

// Team Member pages
import TeamLayout         from "./Team/TeamLayout";
import TeamProfile        from "./Team/TeamProfile";
import TeamProjects       from "./Team/TeamProjects";
import TeamNotifications  from "./Team/TeamNotifications";
import TeamMemberDashboard from "./Team/TeamMemberDashboard";
import InviteAccept       from "./Team/InviteAccept";

// Freelancer — Layout
import FreelancerLayout from "./Freelancer/FreelancerLayout";

// Freelancer — Pages
import LandingPage from "./Freelancer/LandingPage";
import OnboardingFlow from "./Freelancer/onboarding/OnboardingFlow";
import PublicProfile from "./Freelancer/Public Profile/PublicProfile";
import Dashboard from "./Freelancer/Dashboard";
import FreelancerProposals     from "./Freelancer/FreelancerProposals";
import FreelancerContracts     from "./Freelancer/FreelancerContracts";
import FreelancerReviews       from "./Freelancer/FreelancerReviews";
import FreelancerNotifications from "./Freelancer/FreelancerNotifications";
import FreelancerKYC           from "./Freelancer/FreelancerKYC";
import FreelancerEarnings      from "./Freelancer/FreelancerEarnings";
import FreelancerWithdrawals   from "./Freelancer/FreelancerWithdrawals";
import FreelancerPlan from "./Freelancer/FreelancerPlan";

// Hire Talent
import HireTalentLanding from "./hire-talent/LandingPage";
import HireTalentLayout from "./hire-talent/HireTalentLayout";
import HireTalentDashboard from "./hire-talent/HireTalentDashboard";
import HireTalentOnboarding from "./hire-talent/onboarding/OnboardingFlow";
import ProjectList from "./hire-talent/ProjectList";
import PostNewProject from "./hire-talent/PostNewProject";
import ClientProjectDetail from "./hire-talent/ClientProjectDetail";
import ClientContracts from "./hire-talent/ClientContracts";
import ClientDisputes from "./hire-talent/ClientDisputes";
import ClientNotifications from "./hire-talent/ClientNotifications";
import ClientPayments from "./hire-talent/ClientPayments";
import ClientTransactionDetail from "./hire-talent/ClientTransactionDetail";
import ClientReviews from "./hire-talent/ClientReviews";
import SettingsPage from "./hire-talent/SettingsPage";

// Project Demo
import ProjectStreamDemo from "./projectdemo/projectstreamDemo";
import AgencyChannelADemo from "./projectdemo/AgencyChannelA/AgencyChannelADemo";
import Channel2Page from "./projectdemo/agency/channel2/index";

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Platform overview & governance</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users",     value: "10",    color: "text-gray-800"   },
          { label: "Active Projects", value: "24",    color: "text-green-600"  },
          { label: "Escrow Locked",   value: "₹8.4L", color: "text-orange-500" },
          { label: "AI Flags Today",  value: "3",     color: "text-red-500"    },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <p className="text-sm text-gray-500 text-center">
          Navigate using the <span className="text-green-600 font-semibold">sidebar</span> to manage the platform.
        </p>
      </div>
    </div>
  );
}

// ─── Placeholder for pages not yet built ─────────────────────────────────────
function PlaceholderPage({ title }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1e3a5f]">{title}</h1>
      <p className="text-gray-400 mt-2">Coming soon...</p>
    </div>
  );
}

// ─── Wrappers ─────────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();
  return (
    <div className="font-sans antialiased">
      <Navbar onAdminClick={() => navigate("/admin")} onFreelancerClick={() => navigate("/freelancer")} />
      <Hero  onAdminClick={() => navigate("/admin")} onFreelancerClick={() => navigate("/freelancer")} />
    </div>
  );
}
function Freelancer()        { const n = useNavigate(); return <LandingPage   onJoinClick={() => n("/onboarding")} />; }
function Onboarding()        { const n = useNavigate(); return <OnboardingFlow onExit={() => n("/freelancer")} />; }
function Profile()           { const n = useNavigate(); return <PublicProfile  onBack={() => n(-1)} />; }
function TeamOnboardingPage(){ const n = useNavigate(); return <TeamOnboarding onGoToDashboard={() => n("/agency/dashboard")} />; }

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Signin */}
        <Route path="/signin" element={<Signin />} />

        {/* Admin — Dashboard */}
        <Route path="/admin"                          element={<AdminLayout><AdminDashboard /></AdminLayout>} />

        {/* Admin — User Management */}
        <Route path="/admin/users"                    element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin/users/:id"                element={<AdminLayout><AdminUserDetail /></AdminLayout>} />
        <Route path="/admin/freelancers"              element={<AdminLayout><AdminFreelancers /></AdminLayout>} />
        <Route path="/admin/freelancers/:id"          element={<AdminLayout><AdminFreelancerDetail /></AdminLayout>} />
        <Route path="/admin/agencies"                 element={<AdminLayout><AdminAgencies /></AdminLayout>} />
        <Route path="/admin/agencies/:id"             element={<AdminLayout><AdminAgencyDetail /></AdminLayout>} />
        <Route path="/admin/clients"                  element={<AdminLayout><AdminClients /></AdminLayout>} />
        <Route path="/admin/clients/:id"              element={<AdminLayout><AdminClientDetail /></AdminLayout>} />

        {/* Admin — KYC */}
        <Route path="/admin/kyc/agencies"             element={<AdminLayout><AdminKYCAgencies /></AdminLayout>} />
        <Route path="/admin/kyc/freelancers"          element={<AdminLayout><AdminKYCFreelancers /></AdminLayout>} />
        <Route path="/admin/kyc/:id"                  element={<AdminLayout><AdminKYCDetail /></AdminLayout>} />
        <Route path="/admin/kyc"                      element={<AdminLayout><AdminKYC /></AdminLayout>} />

        {/* Admin — Projects */}
        <Route path="/admin/projects/at-risk"         element={<AdminLayout><AdminAtRiskProjects /></AdminLayout>} />
        <Route path="/admin/projects/:id"             element={<AdminLayout><AdminProjectDetail /></AdminLayout>} />
        <Route path="/admin/projects"                 element={<AdminLayout><AdminProjects /></AdminLayout>} />

        {/* Admin — ProjectStream */}
        <Route path="/admin/projectstream/freeze"     element={<AdminLayout><AdminFrozenChats /></AdminLayout>} />
        <Route path="/admin/projectstream/:id"        element={<AdminLayout><AdminProjectStreamMonitor /></AdminLayout>} />

        {/* Admin — Operations */}
        <Route path="/admin/disputes/pending"         element={<AdminLayout><AdminDisputesPending /></AdminLayout>} />
        <Route path="/admin/disputes/:id"             element={<AdminLayout><AdminDisputeDetail /></AdminLayout>} />
        <Route path="/admin/disputes"                 element={<AdminLayout><AdminDisputes /></AdminLayout>} />
        <Route path="/admin/payments"                 element={<AdminLayout><AdminPayments /></AdminLayout>} />
        <Route path="/admin/escrow"                   element={<AdminLayout><AdminEscrow /></AdminLayout>} />
        <Route path="/admin/payouts/:id"              element={<AdminLayout><AdminPayoutDetail /></AdminLayout>} />
        <Route path="/admin/payouts"                  element={<AdminLayout><AdminPayouts /></AdminLayout>} />
        <Route path="/admin/refunds"                  element={<AdminLayout><AdminRefunds /></AdminLayout>} />
        <Route path="/admin/commission"               element={<AdminLayout><AdminCommission /></AdminLayout>} />

        {/* Admin — Platform */}
        <Route path="/admin/ai-settings"              element={<AdminLayout><AdminAISettings /></AdminLayout>} />
        <Route path="/admin/ai-logs"                  element={<AdminLayout><AdminAILogs /></AdminLayout>} />
        <Route path="/admin/ai-overrides"             element={<AdminLayout><AdminAIOverrides /></AdminLayout>} />
        <Route path="/admin/audit"                    element={<AdminLayout><AdminAuditLogs /></AdminLayout>} />
        <Route path="/admin/audit-logs"               element={<AdminLayout><AdminAuditLogsPage /></AdminLayout>} />
        <Route path="/admin/admins/roles"             element={<AdminLayout><AdminRoles /></AdminLayout>} />
        <Route path="/admin/admins"                   element={<AdminLayout><AdminAdmins /></AdminLayout>} />
        <Route path="/admin/settings"                 element={<AdminLayout><AdminSettings /></AdminLayout>} />
        <Route path="/admin/settings/general"         element={<AdminLayout><AdminSettingsGeneral /></AdminLayout>} />
        <Route path="/admin/settings/commission"      element={<AdminLayout><AdminSettingsCommission /></AdminLayout>} />
        <Route path="/admin/settings/policies"        element={<AdminLayout><AdminSettingsPolicies /></AdminLayout>} />
        <Route path="/admin/settings/email"           element={<AdminLayout><AdminSettingsEmail /></AdminLayout>} />
        <Route path="/admin/settings/rules"           element={<AdminLayout><AdminSettingsRules /></AdminLayout>} />

        {/* Admin — Reports */}
        <Route path="/admin/reports/revenue"          element={<AdminLayout><AdminRevenueReport /></AdminLayout>} />
        <Route path="/admin/reports/users"            element={<AdminLayout><AdminUsersReport /></AdminLayout>} />
        <Route path="/admin/reports/projects"         element={<AdminLayout><AdminProjectsReport /></AdminLayout>} />
        <Route path="/admin/reports/disputes"         element={<AdminLayout><AdminDisputesReport /></AdminLayout>} />

        {/* Admin — Communications */}
        <Route path="/admin/notifications"            element={<AdminLayout><AdminNotifications /></AdminLayout>} />
        <Route path="/admin/announcements"            element={<AdminLayout><AdminAnnouncements /></AdminLayout>} />

        {/* Agency — WITHOUT layout */}
        <Route path="/register-agency"                element={<AgencyLandingPage />} />
        <Route path="/agency/onboarding"              element={<RegisterAgency />} />
        <Route path="/agency/:id"                     element={<AgencyProfile />} />
        <Route path="/invite-team"                    element={<TeamOnboardingPage />} />

        {/* Agency — WITH layout */}
        <Route element={<AgencyLayout />}>
          <Route path="/agency/dashboard"             element={<AgencyDashboard />} />
          <Route path="/agency/proposals"             element={<AgencyProposals />} />
          <Route path="/agency/contracts"             element={<AgencyContracts />} />
          <Route path="/agency/earnings"              element={<AgencyEarnings />} />
          <Route path="/agency/withdrawals"           element={<AgencyWithdrawals />} />
          <Route path="/agency/kyc"                   element={<AgencyKYC />} />
          <Route path="/agency/reviews"               element={<AgencyReviews />} />
          <Route path="/agency/notifications"         element={<AgencyNotifications />} />
          <Route path="/agency/settings"              element={<AgencySettings />} />
          <Route path="/agency/project/:id"           element={<ProjectDetailPage />} />
          <Route path="/agency/channel2/:projectId"   element={<Channel2Page />} />
        </Route>

        {/* Team Member */}
        <Route path="/accept-invite"                  element={<InviteAccept />} />
        <Route element={<TeamLayout />}>
          <Route path="/team/dashboard"               element={<TeamMemberDashboard />} />
          <Route path="/team/projects"                element={<TeamProjects />} />
          <Route path="/team/notifications"           element={<TeamNotifications />} />
          <Route path="/team/profile"                 element={<TeamProfile />} />
        </Route>

        {/* Freelancer — Landing & Onboarding (NO layout) */}
        <Route path="/freelancer"                     element={<Freelancer />} />
        <Route path="/onboarding"                     element={<Onboarding />} />
        <Route path="/profile/:id"                    element={<Profile />} />

        {/* Freelancer — Dashboard & all pages (WITH shared sidebar+topbar) */}
        <Route element={<FreelancerLayout />}>
          <Route path="/dashboard"                    element={<Dashboard />} />
          <Route path="/freelancer/proposals"         element={<FreelancerProposals />} />
          <Route path="/freelancer/contracts"         element={<FreelancerContracts />} />
          <Route path="/freelancer/reviews"           element={<FreelancerReviews />} />
          <Route path="/freelancer/notifications"     element={<FreelancerNotifications />} />
          <Route path="/freelancer/kyc"               element={<FreelancerKYC />} />
          <Route path="/freelancer/earnings"          element={<FreelancerEarnings />} />
          <Route path="/freelancer/withdrawals"       element={<FreelancerWithdrawals />} />
          <Route path="/freelancer/plan" element={<FreelancerPlan />} />
        </Route>

        {/* ─── Hire Talent ─────────────────────────────────────────────────── */}

        {/* Standalone pages (NO sidebar) */}
        <Route path="/hire-talent"                    element={<HireTalentLanding />} />
        <Route path="/hire-talent/onboarding"         element={<HireTalentOnboarding />} />

        {/* Pages WITH persistent sidebar — nested inside HireTalentLayout */}
        <Route path="/hire-talent" element={<HireTalentLayout />}>
          <Route path="dashboard"         element={<HireTalentDashboard />} />
          <Route path="projects"          element={<ProjectList />} />
          <Route path="post-project"      element={<PostNewProject />} />
          <Route path="projects/:id"      element={<ClientProjectDetail />} />
          <Route path="contracts"         element={<ClientContracts />} />
          <Route path="disputes"          element={<ClientDisputes />} />
          <Route path="notifications"     element={<ClientNotifications />} />
          <Route path="payments"          element={<ClientPayments />} />
          <Route path="payments/:id"      element={<ClientTransactionDetail />} />
          <Route path="reviews"           element={<ClientReviews />} />
          <Route path="talent"            element={<PlaceholderPage title="Talent" />} />
          <Route path="settings"          element={<SettingsPage onBack={() => window.history.back()} />} />
        </Route>

        {/* Project Demo */}
        <Route path="/project-stream"                 element={<ProjectStreamDemo />} />
        <Route path="/agency-channel-a"               element={<AgencyChannelADemo />} />

      </Routes>
    </BrowserRouter>
  );
}