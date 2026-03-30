import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

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

// Agency — Layout
import AgencyLayout from "./RegisterAgency/AgencyLayout";

// Agency — Pages
import RegisterAgency from "./RegisterAgency/RegisterAgency";
import AgencyProfile from "./RegisterAgency/AgencyProfile";
import AgencyDashboard from "./RegisterAgency/AgencyDashboard";
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

// Team — Layout
import TeamLayout from "./Team/TeamLayout";

// Team — Pages
import TeamOnboarding     from "./Team/TeamOnboarding";
import TeamProfile        from "./Team/TeamProfile";
import TeamProjects       from "./Team/TeamProjects";
import TeamNotifications  from "./Team/TeamNotifications";
import TeamMemberDashboard from "./Team/TeamMemberDashboard";
import InviteAccept       from "./Team/InviteAccept";

// Freelancer
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

// Hire Talent
import HireTalentLanding from "./hire-talent/LandingPage";
import HireTalentDashboard from "./hire-talent/HireTalentDashboard";
import HireTalentOnboarding from "./hire-talent/onboarding/OnboardingFlow";
import ProjectList from "./hire-talent/ProjectList";
import PostNewProject from "./hire-talent/PostNewProject";
import ClientProjectDetail from "./hire-talent/ClientProjectDetail";
import ClientDisputes from "./hire-talent/ClientDisputes";
import ClientNotifications from "./hire-talent/ClientNotifications";
import ClientPayments from "./hire-talent/ClientPayments";
import ClientTransactionDetail from "./hire-talent/ClientTransactionDetail";
import ClientReviews from "./hire-talent/ClientReviews";

// Auth
import WeblanceAuth from "./components/WeblanceAuth";

// Project Demo
import ProjectStreamDemo from "./projectdemo/projectstreamDemo";
import AgencyChannelADemo from "./projectdemo/AgencyChannelA/AgencyChannelADemo";
import Channel2Page from "./projectdemo/agency/channel2/index";

/* ── Theme tokens (mirrors AdminUsers) ───────────────────── */
const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",

  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",

  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

  text:   "#1C1C1C",
  muted:  "#9ca3af",
  border: "#e5e7eb",
  bg:     "#f9fafb",
  white:  "#ffffff",

  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
};

const FONT = "'Poppins', sans-serif";

const STAT_COLOR = {
  gray:   { bg: G.bg,       border: G.border,       val: G.text,      label: G.muted   },
  green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, label: G.greenDeep },
  orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",   label: "#b45309" },
  red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",   label: "#dc2626" },
};

function AdminDashboard() {
  const stats = [
    { label: "Total Users",     value: "10",    color: "gray"   },
    { label: "Active Projects", value: "24",    color: "green"  },
    { label: "Escrow Locked",   value: "₹8.4L", color: "orange" },
    { label: "AI Flags Today",  value: "3",     color: "red"    },
  ];

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>
          Platform overview & governance
        </p>
      </div>

      {/* ── Stats strip ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map((s) => {
          const c = STAT_COLOR[s.color];
          return (
            <div key={s.label} style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: 14,
              padding: "16px 20px",
              boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
            }}>
              <p style={{
                fontSize: 10, fontWeight: 700, color: c.label,
                textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6,
              }}>{s.label}</p>
              <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>
                {s.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Info card ── */}
      <div style={{
        background: G.white,
        border: `1px solid ${G.greenBorder}`,
        borderRadius: 16,
        padding: "28px 24px",
        boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
        textAlign: "center",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: G.greenBg, border: `1px solid ${G.greenBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, margin: "0 auto 12px",
        }}>◎</div>
        <p style={{ fontSize: 13, color: G.muted, margin: 0 }}>
          Navigate using the{" "}
          <span style={{ color: G.greenDeep, fontWeight: 700 }}>sidebar</span>
          {" "}to manage the platform.
        </p>
      </div>

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
function Freelancer()        { const n = useNavigate(); return <LandingPage    onJoinClick={() => n("/onboarding")} />; }
function Onboarding()        { const n = useNavigate(); return <OnboardingFlow  onExit={() => n("/freelancer")} />; }
function Profile()           { const n = useNavigate(); return <PublicProfile   onBack={() => n(-1)} />; }
function TeamOnboardingPage(){ const n = useNavigate(); return <TeamOnboarding  onGoToDashboard={() => n("/agency/dashboard")} />; }

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login"  element={<WeblanceAuth />} />

        {/* ── Admin ── */}
        <Route path="/admin"                           element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/users"                     element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin/users/:id"                 element={<AdminLayout><AdminUserDetail /></AdminLayout>} />
        <Route path="/admin/freelancers"               element={<AdminLayout><AdminFreelancers /></AdminLayout>} />
        <Route path="/admin/freelancers/:id"           element={<AdminLayout><AdminFreelancerDetail /></AdminLayout>} />
        <Route path="/admin/agencies"                  element={<AdminLayout><AdminAgencies /></AdminLayout>} />
        <Route path="/admin/agencies/:id"              element={<AdminLayout><AdminAgencyDetail /></AdminLayout>} />
        <Route path="/admin/clients"                   element={<AdminLayout><AdminClients /></AdminLayout>} />
        <Route path="/admin/clients/:id"               element={<AdminLayout><AdminClientDetail /></AdminLayout>} />
        <Route path="/admin/kyc/agencies"              element={<AdminLayout><AdminKYCAgencies /></AdminLayout>} />
        <Route path="/admin/kyc/freelancers"           element={<AdminLayout><AdminKYCFreelancers /></AdminLayout>} />
        <Route path="/admin/kyc/:id"                   element={<AdminLayout><AdminKYCDetail /></AdminLayout>} />
        <Route path="/admin/kyc"                       element={<AdminLayout><AdminKYC /></AdminLayout>} />
        <Route path="/admin/projects/at-risk"          element={<AdminLayout><AdminAtRiskProjects /></AdminLayout>} />
        <Route path="/admin/projects/:id"              element={<AdminLayout><AdminProjectDetail /></AdminLayout>} />
        <Route path="/admin/projects"                  element={<AdminLayout><AdminProjects /></AdminLayout>} />
        <Route path="/admin/projectstream/freeze"      element={<AdminLayout><AdminFrozenChats /></AdminLayout>} />
        <Route path="/admin/projectstream/:id"         element={<AdminLayout><AdminProjectStreamMonitor /></AdminLayout>} />
        <Route path="/admin/disputes/pending"          element={<AdminLayout><AdminDisputesPending /></AdminLayout>} />
        <Route path="/admin/disputes/:id"              element={<AdminLayout><AdminDisputeDetail /></AdminLayout>} />
        <Route path="/admin/disputes"                  element={<AdminLayout><AdminDisputes /></AdminLayout>} />
        <Route path="/admin/payments"                  element={<AdminLayout><AdminPayments /></AdminLayout>} />
        <Route path="/admin/escrow"                    element={<AdminLayout><AdminEscrow /></AdminLayout>} />
        <Route path="/admin/payouts/:id"               element={<AdminLayout><AdminPayoutDetail /></AdminLayout>} />
        <Route path="/admin/payouts"                   element={<AdminLayout><AdminPayouts /></AdminLayout>} />
        <Route path="/admin/refunds"                   element={<AdminLayout><AdminRefunds /></AdminLayout>} />
        <Route path="/admin/commission"                element={<AdminLayout><AdminCommission /></AdminLayout>} />
        <Route path="/admin/ai-settings"               element={<AdminLayout><AdminAISettings /></AdminLayout>} />
        <Route path="/admin/ai-logs"                   element={<AdminLayout><AdminAILogs /></AdminLayout>} />
        <Route path="/admin/ai-overrides"              element={<AdminLayout><AdminAIOverrides /></AdminLayout>} />
        <Route path="/admin/audit"                     element={<AdminLayout><AdminAuditLogs /></AdminLayout>} />
        <Route path="/admin/audit-logs"                element={<AdminLayout><AdminAuditLogsPage /></AdminLayout>} />
        <Route path="/admin/admins/roles"              element={<AdminLayout><AdminRoles /></AdminLayout>} />
        <Route path="/admin/admins"                    element={<AdminLayout><AdminAdmins /></AdminLayout>} />
        <Route path="/admin/settings"                  element={<AdminLayout><AdminSettings /></AdminLayout>} />
        <Route path="/admin/settings/general"          element={<AdminLayout><AdminSettingsGeneral /></AdminLayout>} />
        <Route path="/admin/settings/commission"       element={<AdminLayout><AdminSettingsCommission /></AdminLayout>} />
        <Route path="/admin/settings/policies"         element={<AdminLayout><AdminSettingsPolicies /></AdminLayout>} />
        <Route path="/admin/settings/email"            element={<AdminLayout><AdminSettingsEmail /></AdminLayout>} />
        <Route path="/admin/settings/rules"            element={<AdminLayout><AdminSettingsRules /></AdminLayout>} />
        <Route path="/admin/reports/revenue"           element={<AdminLayout><AdminRevenueReport /></AdminLayout>} />
        <Route path="/admin/reports/users"             element={<AdminLayout><AdminUsersReport /></AdminLayout>} />
        <Route path="/admin/reports/projects"          element={<AdminLayout><AdminProjectsReport /></AdminLayout>} />
        <Route path="/admin/reports/disputes"          element={<AdminLayout><AdminDisputesReport /></AdminLayout>} />
        <Route path="/admin/notifications"             element={<AdminLayout><AdminNotifications /></AdminLayout>} />
        <Route path="/admin/announcements"             element={<AdminLayout><AdminAnnouncements /></AdminLayout>} />

        {/* ── Agency — WITHOUT layout ── */}
        <Route path="/register-agency"   element={<AgencyLandingPage />} />
        <Route path="/agency/onboarding" element={<RegisterAgency />} />
        <Route path="/agency/:id"        element={<AgencyProfile />} />

        {/* ── Agency — WITH AgencyLayout ── */}
        <Route element={<AgencyLayout />}>
          <Route path="/agency/dashboard"            element={<AgencyDashboard />} />
          <Route path="/agency/proposals"            element={<AgencyProposals />} />
          <Route path="/agency/contracts"            element={<AgencyContracts />} />
          <Route path="/agency/earnings"             element={<AgencyEarnings />} />
          <Route path="/agency/withdrawals"          element={<AgencyWithdrawals />} />
          <Route path="/agency/kyc"                  element={<AgencyKYC />} />
          <Route path="/agency/reviews"              element={<AgencyReviews />} />
          <Route path="/agency/notifications"        element={<AgencyNotifications />} />
          <Route path="/agency/settings"             element={<AgencySettings />} />
          <Route path="/agency/project/:id"          element={<ProjectDetailPage />} />
          <Route path="/agency/channel2/:projectId"  element={<Channel2Page />} />
        </Route>

        {/* ── Team — WITHOUT layout (onboarding flows) ── */}
        <Route path="/invite-team"   element={<TeamOnboardingPage />} />
        <Route path="/accept-invite" element={<InviteAccept />} />

        {/* ── Team — WITH TeamLayout (sidebar + header fixed) ── */}
        <Route element={<TeamLayout />}>
          <Route path="/team/dashboard"     element={<TeamMemberDashboard />} />
          <Route path="/team/projects"      element={<TeamProjects />} />
          <Route path="/team/notifications" element={<TeamNotifications />} />
          <Route path="/team/profile"       element={<TeamProfile />} />
        </Route>

        {/* ── Freelancer ── */}
        <Route path="/freelancer"  element={<Freelancer />} />
        <Route path="/onboarding"  element={<Onboarding />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route element={<FreelancerLayout />}>
          <Route path="/dashboard"                  element={<Dashboard />} />
          <Route path="/freelancer/proposals"       element={<FreelancerProposals />} />
          <Route path="/freelancer/contracts"       element={<FreelancerContracts />} />
          <Route path="/freelancer/reviews"         element={<FreelancerReviews />} />
          <Route path="/freelancer/notifications"   element={<FreelancerNotifications />} />
          <Route path="/freelancer/kyc"             element={<FreelancerKYC />} />
          <Route path="/freelancer/earnings"        element={<FreelancerEarnings />} />
          <Route path="/freelancer/withdrawals"     element={<FreelancerWithdrawals />} />
        </Route>

        {/* ── Hire Talent ── */}
        <Route path="/hire-talent"               element={<HireTalentLanding />} />
        <Route path="/hire-talent/dashboard"     element={<HireTalentDashboard />} />
        <Route path="/hire-talent/onboarding"    element={<HireTalentOnboarding />} />
        <Route path="/hire-talent/projects"      element={<ProjectList />} />
        <Route path="/hire-talent/post-project"  element={<PostNewProject />} />
        <Route path="/hire-talent/projects/:id"  element={<ClientProjectDetail />} />
        <Route path="/hire-talent/disputes"      element={<ClientDisputes />} />
        <Route path="/hire-talent/notifications" element={<ClientNotifications />} />
        <Route path="/hire-talent/payments"      element={<ClientPayments />} />
        <Route path="/hire-talent/payments/:id"  element={<ClientTransactionDetail />} />
        <Route path="/hire-talent/reviews"       element={<ClientReviews />} />

        {/* ── Project Demos ── */}
        <Route path="/project-stream"   element={<ProjectStreamDemo />} />
        <Route path="/agency-channel-a" element={<AgencyChannelADemo />} />

      </Routes>
    </BrowserRouter>
  );
}