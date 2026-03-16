import { useState } from "react";
import { PageHeader, SectionCard, ActionBtn } from "./AdminComponents";

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
      <div className="flex-1 mr-6">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors ${value ? "bg-green-500" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />
  );
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("platform");
  const [saved, setSaved] = useState(false);

  const [platform, setPlatform] = useState({
    platformName: "Weblance",
    platformEmail: "admin@weblance.com",
    supportEmail: "support@weblance.com",
    legalEmail: "legal@weblance.com",
    commissionRate: "6",
    currency: "INR",
    maintenanceMode: false,
    registrationOpen: true,
  });

  const [adminRoles, setAdminRoles] = useState([
    { name: "Super Admin", email: "sa@weblance.com", permissions: "Full Access", active: true },
    { name: "Platform Admin", email: "pm@weblance.com", permissions: "Users, Projects, Disputes", active: true },
    { name: "Finance Admin", email: "fa@weblance.com", permissions: "Payments, Escrow, Payouts", active: true },
    { name: "Support Admin", email: "support@weblance.com", permissions: "Users, Disputes (read)", active: false },
  ]);

  const [notifications, setNotifications] = useState({
    emailOnDispute: true,
    emailOnSuspension: true,
    emailOnHighRisk: true,
    emailOnPaymentAnomaly: true,
    slackNotifications: false,
    dailySummary: true,
  });

  const [security, setSecurity] = useState({
    twoFactorRequired: true,
    sessionTimeout: "8",
    ipWhitelist: false,
    loginAudit: true,
    rateLimit: true,
  });

  const set = (obj, setObj) => (key) => (val) => setObj({ ...obj, [key]: val });
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const tabs = ["platform", "admin roles", "notifications", "security", "legal"];

  return (
    <div className="p-6">
      <PageHeader
        title="Settings"
        subtitle="Platform configuration, admin roles & system preferences"
        actions={
          <ActionBtn label={saved ? "✓ Saved" : "Save Changes"} variant="primary" size="md" onClick={handleSave} />
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-100 mb-6">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap transition-colors ${activeTab === tab ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Platform Tab */}
      {activeTab === "platform" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SectionCard title="Platform Identity">
            <SettingRow label="Platform Name" desc="Displayed in emails and UI">
              <TextInput value={platform.platformName} onChange={set(platform, setPlatform)("platformName")} />
            </SettingRow>
            <SettingRow label="Admin Email" desc="Primary contact for platform operations">
              <TextInput value={platform.platformEmail} onChange={set(platform, setPlatform)("platformEmail")} />
            </SettingRow>
            <SettingRow label="Support Email" desc="Shown to users for help requests">
              <TextInput value={platform.supportEmail} onChange={set(platform, setPlatform)("supportEmail")} />
            </SettingRow>
            <SettingRow label="Legal Email" desc="For compliance and legal notices">
              <TextInput value={platform.legalEmail} onChange={set(platform, setPlatform)("legalEmail")} />
            </SettingRow>
          </SectionCard>

          <SectionCard title="Business Rules">
            <SettingRow label="Commission Rate (%)" desc="Platform fee deducted from each payment">
              <div className="flex items-center gap-2">
                <TextInput value={platform.commissionRate} onChange={set(platform, setPlatform)("commissionRate")} placeholder="6" />
                <span className="text-sm text-gray-500">%</span>
              </div>
            </SettingRow>
            <SettingRow label="Default Currency" desc="Used for all transactions on the platform">
              <select value={platform.currency} onChange={(e) => setPlatform({ ...platform, currency: e.target.value })}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
                <option value="INR">INR — Indian Rupee</option>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
              </select>
            </SettingRow>
            <SettingRow label="New Registrations" desc="Allow new users to sign up">
              <Toggle value={platform.registrationOpen} onChange={set(platform, setPlatform)("registrationOpen")} />
            </SettingRow>
            <SettingRow label="Maintenance Mode" desc="All users see maintenance page">
              <Toggle value={platform.maintenanceMode} onChange={set(platform, setPlatform)("maintenanceMode")} />
            </SettingRow>
            {platform.maintenanceMode && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600 font-semibold">⚠ Maintenance mode is ON — platform is hidden from all users</p>
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {/* Admin Roles Tab */}
      {activeTab === "admin roles" && (
        <div className="space-y-5">
          <SectionCard title="Admin Team">
            <div className="space-y-2 mb-4">
              {adminRoles.map((admin, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {admin.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{admin.name}</p>
                    <p className="text-xs text-gray-400">{admin.email}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{admin.permissions}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${admin.active ? "bg-green-50 text-green-600 border border-green-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                      {admin.active ? "Active" : "Inactive"}
                    </span>
                    <ActionBtn label="Edit" />
                  </div>
                </div>
              ))}
            </div>
            <ActionBtn label="+ Invite Admin" variant="primary" size="md" />
          </SectionCard>

          <SectionCard title="Permission Matrix">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-400 pb-2 pr-4">Permission</th>
                    {["Super Admin", "Platform Admin", "Finance Admin", "Support Admin"].map(r => (
                      <th key={r} className="text-center text-gray-500 font-semibold pb-2 px-3">{r}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { perm: "Manage Users", access: [true, true, false, false] },
                    { perm: "View Payments", access: [true, true, true, false] },
                    { perm: "Release Escrow", access: [true, false, true, false] },
                    { perm: "Resolve Disputes", access: [true, true, false, true] },
                    { perm: "Manage AI Settings", access: [true, false, false, false] },
                    { perm: "View Audit Logs", access: [true, true, true, true] },
                    { perm: "Delete Logs", access: [false, false, false, false] },
                    { perm: "Suspend Accounts", access: [true, true, false, false] },
                  ].map((row) => (
                    <tr key={row.perm} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 pr-4 text-gray-600 font-medium">{row.perm}</td>
                      {row.access.map((has, i) => (
                        <td key={i} className="py-2 px-3 text-center">
                          <span className={has ? "text-green-500" : "text-gray-200"}>
                            {has ? "✓" : "✕"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <SectionCard title="Admin Notification Preferences">
          {[
            { key: "emailOnDispute", label: "Email on new dispute", desc: "Receive email when a new dispute is raised" },
            { key: "emailOnSuspension", label: "Email on account suspension", desc: "Notified when AI auto-suspends an account" },
            { key: "emailOnHighRisk", label: "Email on high-risk detection", desc: "Alert when AI detects high-risk user or project" },
            { key: "emailOnPaymentAnomaly", label: "Email on payment anomaly", desc: "Alert for frozen or suspicious transactions" },
            { key: "slackNotifications", label: "Slack notifications", desc: "Send critical alerts to Slack workspace" },
            { key: "dailySummary", label: "Daily platform summary email", desc: "Morning briefing of platform health" },
          ].map((item) => (
            <SettingRow key={item.key} label={item.label} desc={item.desc}>
              <Toggle value={notifications[item.key]} onChange={(val) => setNotifications({ ...notifications, [item.key]: val })} />
            </SettingRow>
          ))}
        </SectionCard>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SectionCard title="Admin Security">
            <SettingRow label="2FA Required for Admins" desc="All admins must use two-factor authentication">
              <Toggle value={security.twoFactorRequired} onChange={(val) => setSecurity({ ...security, twoFactorRequired: val })} />
            </SettingRow>
            <SettingRow label="Session Timeout" desc="Hours of inactivity before admin is logged out">
              <select value={security.sessionTimeout} onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
                <option value="1">1 hour</option>
                <option value="4">4 hours</option>
                <option value="8">8 hours</option>
                <option value="24">24 hours</option>
              </select>
            </SettingRow>
            <SettingRow label="IP Whitelist for Admin Panel" desc="Only allow access from specific IP addresses">
              <Toggle value={security.ipWhitelist} onChange={(val) => setSecurity({ ...security, ipWhitelist: val })} />
            </SettingRow>
            <SettingRow label="Login audit logging" desc="Log every admin login attempt">
              <Toggle value={security.loginAudit} onChange={(val) => setSecurity({ ...security, loginAudit: val })} />
            </SettingRow>
            <SettingRow label="API rate limiting" desc="Protect admin APIs from brute force">
              <Toggle value={security.rateLimit} onChange={(val) => setSecurity({ ...security, rateLimit: val })} />
            </SettingRow>
          </SectionCard>

          <SectionCard title="Danger Zone">
            <div className="space-y-3">
              {[
                { label: "Force logout all admins", desc: "Invalidate all active admin sessions immediately", variant: "warning" },
                { label: "Enable maintenance mode", desc: "Immediately hide platform from all users", variant: "warning" },
                { label: "Freeze all payments", desc: "Stop all escrow releases and payouts platform-wide", variant: "danger" },
                { label: "Export full platform backup", desc: "Download complete data backup for compliance", variant: "default" },
              ].map((a) => (
                <div key={a.label} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{a.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
                  </div>
                  <ActionBtn label="Execute" variant={a.variant} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Legal Tab */}
      {activeTab === "legal" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[
            { title: "Privacy Policy", lastUpdated: "Jan 1, 2026", status: "Active" },
            { title: "Terms of Service", lastUpdated: "Jan 1, 2026", status: "Active" },
            { title: "Refund Policy", lastUpdated: "Jan 1, 2026", status: "Active" },
            { title: "Cookie Policy", lastUpdated: "Jan 1, 2026", status: "Active" },
          ].map((doc) => (
            <SectionCard key={doc.title} title={doc.title}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-400">Last updated: {doc.lastUpdated}</p>
                  <span className="text-[11px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">
                    {doc.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <ActionBtn label="Edit" />
                  <ActionBtn label="Preview" />
                </div>
              </div>
              <div className="h-16 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
                <p className="text-xs text-gray-400">Document content managed in CMS</p>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <ActionBtn label="Discard Changes" />
        <ActionBtn label={saved ? "✓ Saved!" : "Save All Changes"} variant="primary" size="md" onClick={handleSave} />
      </div>
    </div>
  );
}