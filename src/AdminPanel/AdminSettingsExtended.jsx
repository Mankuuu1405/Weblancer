import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, SectionCard, ActionBtn } from "./AdminComponents";

const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",

  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",

  gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",

  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  amberText:   "#92400e",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  redText:     "#dc2626",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  blueText:    "#1d4ed8",
};
const FONT = "'Poppins', sans-serif";

const btnNavy = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy, color: G.white,
  border: "none", borderRadius: 100,
  padding: "8px 18px", cursor: "pointer",
  boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
  whiteSpace: "nowrap",
};
const btnGreen = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradGreen, color: G.white,
  border: "none", borderRadius: 100,
  padding: "8px 18px", cursor: "pointer",
  boxShadow: "0 2px 10px rgba(46,125,31,0.22)",
  whiteSpace: "nowrap",
};
const btnOutline = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.greenBg, color: G.greenDeep,
  border: `1px solid ${G.greenBorder}`,
  borderRadius: 100, padding: "8px 18px", cursor: "pointer",
  whiteSpace: "nowrap",
};
const btnWarning = {
  ...btnOutline,
  background: G.amberBg, color: G.amberText, border: `1px solid ${G.amberBorder}`,
};
const btnDanger = {
  ...btnOutline,
  background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}`,
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
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
      className={`relative w-10 h-5 rounded-full transition-colors ${value ? "bg-green-5  00" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-0.5" : "-translate-x-[18px]"}`} />
    </button>
  );
}

function TextInput({ value, onChange, placeholder, className = "" }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={`text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 ${className}`} />
  );
}

function SaveBar({ onSave, saved }) {
  return (
    <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
      <ActionBtn label="Discard" style={btnDanger}/>
      <ActionBtn
        label={saved ? "✓ Saved!" : "Save Changes"}
        variant="primary" size="md"
        style={btnGreen}
        onClick={onSave}
      />
    </div>
  );
}

// ─── SHARED SETTINGS NAV ──────────────────────────────────────────────────────
function SettingsNav({ active }) {
  const navigate = useNavigate();
  const tabs = [
    { key: "general",    label: "General",     path: "/admin/settings/general"    },
    { key: "commission", label: "Commission",  path: "/admin/settings/commission" },
    { key: "policies",   label: "Policies",    path: "/admin/settings/policies"   },
    { key: "email",      label: "Email Templates", path: "/admin/settings/email"  },
    { key: "rules",      label: "Automation Rules", path: "/admin/settings/rules" },
  ];
  return (
    <div className="flex gap-1 border-b border-gray-100 mb-6 overflow-x-auto">
      {tabs.map(tab => (
        <button key={tab.key} onClick={() => navigate(tab.path)}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${active === tab.key ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ─── PAGE 1: /admin/settings/general ─────────────────────────────────────────
export function AdminSettingsGeneral() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    platformName: "Weblance",
    tagline: "AI-powered freelance platform",
    platformEmail: "admin@weblance.com",
    supportEmail: "support@weblance.com",
    legalEmail: "legal@weblance.com",
    noreplyEmail: "noreply@weblance.com",
    timezone: "Asia/Kolkata",
    currency: "INR",
    language: "English",
    registrationOpen: true,
    maintenanceMode: false,
    twoFactorRequired: true,
    sessionTimeout: "8",
  });

  const set = key => val => setForm(p => ({ ...p, [key]: val }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-6">
      <PageHeader title="Settings" subtitle="Platform configuration & system preferences" />
      <SettingsNav active="general" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Platform Identity">
          <SettingRow label="Platform Name" desc="Shown in emails and UI">
            <TextInput value={form.platformName} onChange={set("platformName")} className="w-40" />
          </SettingRow>
          <SettingRow label="Tagline" desc="Short description of the platform">
            <TextInput value={form.tagline} onChange={set("tagline")} className="w-52" />
          </SettingRow>
          <SettingRow label="Default Currency" desc="Used for all transactions">
            <select value={form.currency} onChange={e => set("currency")(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
              <option value="INR">INR — Indian Rupee</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
            </select>
          </SettingRow>
          <SettingRow label="Default Language" desc="Platform UI language">
            <select value={form.language} onChange={e => set("language")(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </SettingRow>
          <SettingRow label="Timezone" desc="Server and notification timezone">
            <select value={form.timezone} onChange={e => set("timezone")(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
              <option value="Asia/Kolkata">IST (UTC+5:30)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">EST (UTC-5)</option>
            </select>
          </SettingRow>
        </SectionCard>

        <SectionCard title="Contact Emails">
          <SettingRow label="Admin Email" desc="Primary ops contact">
            <TextInput value={form.platformEmail} onChange={set("platformEmail")} className="w-48" />
          </SettingRow>
          <SettingRow label="Support Email" desc="Shown to users for help">
            <TextInput value={form.supportEmail} onChange={set("supportEmail")} className="w-48" />
          </SettingRow>
          <SettingRow label="Legal Email" desc="For compliance & legal notices">
            <TextInput value={form.legalEmail} onChange={set("legalEmail")} className="w-48" />
          </SettingRow>
          <SettingRow label="No-Reply Email" desc="System transactional emails">
            <TextInput value={form.noreplyEmail} onChange={set("noreplyEmail")} className="w-48" />
          </SettingRow>
        </SectionCard>

        <SectionCard title="Access Control">
          <SettingRow label="New Registrations" desc="Allow new users to sign up">
            <Toggle value={form.registrationOpen} onChange={set("registrationOpen")} />
          </SettingRow>
          <SettingRow label="Maintenance Mode" desc="Platform hidden from all users">
            <Toggle value={form.maintenanceMode} onChange={set("maintenanceMode")} />
          </SettingRow>
          <SettingRow label="2FA Required for Admins" desc="Enforce 2FA on all admin accounts">
            <Toggle value={form.twoFactorRequired} onChange={set("twoFactorRequired")} />
          </SettingRow>
          <SettingRow label="Admin Session Timeout" desc="Hours before auto logout">
            <select value={form.sessionTimeout} onChange={e => set("sessionTimeout")(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
              <option value="1">1 hour</option>
              <option value="4">4 hours</option>
              <option value="8">8 hours</option>
              <option value="24">24 hours</option>
            </select>
          </SettingRow>
          {form.maintenanceMode && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-600 font-semibold">⚠ Maintenance mode is ON — platform hidden from all users</p>
            </div>
          )}
        </SectionCard>

        <SectionCard title="Danger Zone">
          <div className="space-y-2">
            {[
              { label:"Force logout all admins",     desc:"Invalidate all active admin sessions", variant:"warning" },
              { label:"Clear all cached data",       desc:"Flush platform cache",                 variant:"default" },
              { label:"Export full data backup",     desc:"Download compliance backup",           variant:"default" },
              { label:"Freeze all platform activity",desc:"Emergency stop — all payments frozen", variant:"danger"  },
            ].map(a => (
              <div key={a.label} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.label}</p>
                  <p className="text-xs text-gray-400">{a.desc}</p>
                </div>
                <ActionBtn label="Execute" variant={a.variant} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ─── PAGE 2: /admin/settings/commission ──────────────────────────────────────
export function AdminSettingsCommission() {
  const [saved, setSaved] = useState(false);
  const [baseRate, setBaseRate] = useState("6");
  const [tiers, setTiers] = useState([
    { id:1, name:"Standard",    condition:"All plans",                rate:"6", active:true  },
    { id:2, name:"Elite++",     condition:"Freelancers with Elite++ badge", rate:"4", active:true  },
    { id:3, name:"Enterprise",  condition:"Projects above ₹5,00,000", rate:"5", active:true  },
    { id:4, name:"Agency Pro",  condition:"Verified agencies, 10+ projects", rate:"5", active:false },
  ]);
  const [history] = useState([
    { date:"Jan 1, 2026",  rate:"6%",  changedBy:"Super Admin", note:"Annual review — no change"         },
    { date:"Jul 1, 2025",  rate:"6%",  changedBy:"Super Admin", note:"Launch rate confirmed"              },
    { date:"Mar 1, 2025",  rate:"8%",  changedBy:"Super Admin", note:"Beta period reduced rate"           },
  ]);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-6">
      <PageHeader title="Settings" subtitle="Platform configuration & system preferences" />
      <SettingsNav active="commission" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Base Rate */}
          <SectionCard title="Base Commission Rate">
            <div className="flex items-center gap-6 py-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 mb-0.5">Platform Commission</p>
                <p className="text-xs text-gray-400">Applied to all completed milestone payments unless a tier override applies</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" value={baseRate} onChange={e => setBaseRate(e.target.value)} min="1" max="20"
                  className="w-20 text-2xl font-black text-green-600 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-center" />
                <span className="text-2xl font-black text-green-600">%</span>
              </div>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 mt-2">
              <p className="text-xs text-green-700">
                At current rate, a ₹1,00,000 project generates <span className="font-bold">₹{(100000 * Number(baseRate) / 100).toLocaleString()}</span> in platform commission.
              </p>
            </div>
          </SectionCard>

          {/* Commission Tiers */}
          <SectionCard title="Commission Tiers">
            <p className="text-xs text-gray-400 mb-4">Tier overrides are applied instead of the base rate when conditions are met.</p>
            <div className="space-y-3">
              {tiers.map((tier, i) => (
                <div key={tier.id} className={`p-4 rounded-xl border transition-colors ${tier.active ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50 opacity-60"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-gray-800">{tier.name}</p>
                        {tier.id === 1 && <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full font-semibold">Default</span>}
                      </div>
                      <p className="text-xs text-gray-400">{tier.condition}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1">
                        <input type="number" value={tier.rate} min="1" max="20"
                          onChange={e => setTiers(prev => prev.map(t => t.id === tier.id ? {...t, rate:e.target.value} : t))}
                          className="w-16 text-lg font-black text-green-600 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                          disabled={!tier.active} />
                        <span className="text-lg font-black text-green-600">%</span>
                      </div>
                      <Toggle value={tier.active}
                        onChange={val => setTiers(prev => prev.map(t => t.id === tier.id ? {...t, active:val} : t))} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors">
              + Add Commission Tier
            </button>
          </SectionCard>
        </div>

        <div className="space-y-5">
          {/* Summary */}
          <SectionCard title="Rate Summary">
            <div className="space-y-2">
              {tiers.filter(t => t.active).map(tier => (
                <div key={tier.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-600">{tier.name}</span>
                  <span className="text-sm font-black text-green-600">{tier.rate}%</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Rate History */}
          <SectionCard title="Rate Change History">
            <div className="space-y-3">
              {history.map((h, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="font-bold text-gray-800">{h.rate}</span>
                    <span className="text-gray-400">{h.date}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{h.note}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">by {h.changedBy}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ─── PAGE 3: /admin/settings/policies ────────────────────────────────────────
export function AdminSettingsPolicies() {
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [policies, setPolicies] = useState([
    { id:"POL-001", name:"Privacy Policy",   version:"v2.1", status:"Published", updatedBy:"Super Admin", updatedAt:"Jan 1, 2026",  content:"This Privacy Policy describes how Weblance collects, uses, and protects your personal information when you use our platform..." },
    { id:"POL-002", name:"Terms of Service", version:"v3.0", status:"Published", updatedBy:"Super Admin", updatedAt:"Jan 1, 2026",  content:"By accessing or using Weblance, you agree to be bound by these Terms of Service and all applicable laws and regulations..." },
    { id:"POL-003", name:"Refund Policy",    version:"v1.2", status:"Published", updatedBy:"Finance Admin",updatedAt:"Mar 1, 2026",  content:"Weblance operates an escrow-based payment system. Refunds are processed based on dispute resolution outcomes and the following guidelines..." },
    { id:"POL-004", name:"Cookie Policy",    version:"v1.0", status:"Published", updatedBy:"Super Admin", updatedAt:"Jan 1, 2026",  content:"Weblance uses cookies and similar tracking technologies to enhance your experience on our platform..." },
    { id:"POL-005", name:"Freelancer Policy",version:"v2.0", status:"Published", updatedBy:"Platform Admin",updatedAt:"Feb 15, 2026",content:"Freelancers on Weblance must comply with the following professional standards, delivery requirements, and code of conduct..." },
    { id:"POL-006", name:"Agency Policy",    version:"v2.0", status:"Published", updatedBy:"Platform Admin",updatedAt:"Feb 15, 2026",content:"Agencies registered on Weblance are held to enterprise-grade standards including team verification, capacity management, and delivery accountability..." },
    { id:"POL-007", name:"Community Guidelines",version:"v1.1",status:"Draft",  updatedBy:"Super Admin", updatedAt:"Mar 10, 2026", content:"Draft: Community guidelines for professional conduct across all communication channels on the platform..." },
  ]);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-6">
      <PageHeader title="Settings" subtitle="Platform configuration & system preferences"
        actions={<ActionBtn label="+ New Policy" variant="primary" size="md" style={btnNavy} />}
      />
      <SettingsNav active="policies" />

      <div className="flex gap-5">
        {/* Policy List */}
        <div className="w-64 shrink-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Documents ({policies.length})
          </p>
          <div className="space-y-2">
            {policies.map(p => (
              <button key={p.id} onClick={() => { setSelected(p); setEditMode(false); }}
                className={`w-full text-left p-3 rounded-xl border transition-all ${selected?.id === p.id ? "border-green-300 bg-green-50 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${p.status === "Published" ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-50 text-gray-500 border border-gray-200"}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">{p.version} · {p.updatedAt}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Policy Editor */}
        <div className="flex-1 min-w-0">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900">{selected.name}</h3>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${selected.status === "Published" ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-50 text-gray-500 border border-gray-200"}`}>
                      {selected.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {selected.version} · Updated {selected.updatedAt} by {selected.updatedBy}
                  </p>
                </div>
                <div className="flex gap-2">
                  {editMode ? (
                    <>
                      <ActionBtn label="Cancel" onClick={() => setEditMode(false)} />
                      <ActionBtn label="Save Draft" />
                      <ActionBtn label="Publish" variant="primary" onClick={save} />
                    </>
                  ) : (
                    <>
                      <ActionBtn label="Edit" onClick={() => setEditMode(true)} />
                      {selected.status === "Draft" && (
                        <ActionBtn label="Publish" variant="primary" onClick={() => {
                          setPolicies(prev => prev.map(p => p.id === selected.id ? {...p, status:"Published"} : p));
                          setSelected(prev => ({...prev, status:"Published"}));
                        }} />
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="p-5">
                {editMode ? (
                  <textarea
                    defaultValue={selected.content}
                    rows={16}
                    className="w-full text-sm border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-700 leading-relaxed"
                  />
                ) : (
                  <div className="prose max-w-none">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.content}</p>
                    <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-400">
                        This is a preview. Click <strong>Edit</strong> to modify the content.
                        All published policies are visible to users on the platform.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-64 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl mb-3 block">📄</span>
                <p className="text-sm text-gray-500">Select a policy to view or edit</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 4: /admin/settings/email ───────────────────────────────────────────
export function AdminSettingsEmail() {
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [templates] = useState([
    { id:"ET-001", name:"Welcome Email",         trigger:"On signup",                  category:"Onboarding", subject:"Welcome to Weblance, {{user_name}}!",                 lastUpdated:"Jan 1, 2026",  active:true  },
    { id:"ET-002", name:"Email Verification",    trigger:"On signup",                  category:"Onboarding", subject:"Verify your email — {{otp_code}}",                   lastUpdated:"Jan 1, 2026",  active:true  },
    { id:"ET-003", name:"Password Reset",        trigger:"On request",                 category:"Auth",       subject:"Reset your Weblance password",                       lastUpdated:"Jan 1, 2026",  active:true  },
    { id:"ET-004", name:"KYC Approved",          trigger:"On KYC approval",            category:"KYC",        subject:"Your KYC is verified — you're all set!",             lastUpdated:"Feb 1, 2026",  active:true  },
    { id:"ET-005", name:"KYC Rejected",          trigger:"On KYC rejection",           category:"KYC",        subject:"KYC verification failed — action required",          lastUpdated:"Feb 1, 2026",  active:true  },
    { id:"ET-006", name:"Escrow Funded",         trigger:"On escrow deposit",          category:"Payments",   subject:"Escrow funded — project can begin",                  lastUpdated:"Jan 15, 2026", active:true  },
    { id:"ET-007", name:"Milestone Released",    trigger:"On milestone approval",      category:"Payments",   subject:"Payment received — ₹{{amount}} released",           lastUpdated:"Jan 15, 2026", active:true  },
    { id:"ET-008", name:"Dispute Raised",        trigger:"On dispute creation",        category:"Disputes",   subject:"Dispute {{dispute_id}} raised — admin notified",     lastUpdated:"Jan 20, 2026", active:true  },
    { id:"ET-009", name:"Dispute Resolved",      trigger:"On dispute resolution",      category:"Disputes",   subject:"Dispute {{dispute_id}} resolved",                    lastUpdated:"Jan 20, 2026", active:true  },
    { id:"ET-010", name:"Admin Warning",         trigger:"On admin action",            category:"Warnings",   subject:"⚠ Official warning from Weblance Admin",            lastUpdated:"Feb 5, 2026",  active:true  },
    { id:"ET-011", name:"Silence Reminder",      trigger:"After 72h inactivity",       category:"Automation", subject:"Action required — your project needs attention",     lastUpdated:"Feb 10, 2026", active:true  },
    { id:"ET-012", name:"Daily Admin Summary",   trigger:"Daily at 8:00 AM",           category:"Reports",    subject:"Weblance Daily Summary — {{date}}",                  lastUpdated:"Mar 1, 2026",  active:true  },
    { id:"ET-013", name:"Payout Processed",      trigger:"On payout completion",       category:"Payments",   subject:"Payout of ₹{{amount}} processed successfully",      lastUpdated:"Jan 15, 2026", active:true  },
    { id:"ET-014", name:"Account Suspended",     trigger:"On suspension",              category:"Warnings",   subject:"Your Weblance account has been suspended",           lastUpdated:"Feb 5, 2026",  active:false },
  ]);

  const categories = [...new Set(templates.map(t => t.category))];
  const [activeCategory, setCategory] = useState("All");

  const filtered = templates.filter(t => activeCategory === "All" || t.category === activeCategory);

  const categoryColor = {
    Onboarding:"bg-blue-50 text-blue-700 border border-blue-200",
    Auth:       "bg-purple-50 text-purple-700 border border-purple-200",
    KYC:        "bg-green-50 text-green-700 border border-green-200",
    Payments:   "bg-orange-50 text-orange-700 border border-orange-200",
    Disputes:   "bg-red-50 text-red-600 border border-red-200",
    Warnings:   "bg-yellow-50 text-yellow-700 border border-yellow-200",
    Automation: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    Reports:    "bg-gray-50 text-gray-600 border border-gray-200",
  };

  const sampleBody = `Hi {{user_name}},

This is an automated message from Weblance.

Your project {{project_name}} requires your attention.

Please log in to take action:
{{action_url}}

If you have any questions, contact us at support@weblance.com.

— The Weblance Team`;

  return (
    <div className="p-6">
      <PageHeader title="Settings" subtitle="Platform configuration & system preferences" />
      <SettingsNav active="email" />

      <div className="flex gap-5">
        {/* Left: List */}
        <div className="flex-1 min-w-0">
          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {["All", ...categories].map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${activeCategory === cat ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {filtered.map(t => (
                <div key={t.id}
                  onClick={() => { setSelected(t); setEditMode(false); setPreviewMode(false); }}
                  className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-gray-50/50 transition-colors ${selected?.id === t.id ? "bg-green-50/40" : ""}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${categoryColor[t.category]}`}>
                        {t.category}
                      </span>
                      {!t.active && <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">Disabled</span>}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{t.subject}</p>
                    <p className="text-[10px] text-gray-300 mt-0.5">{t.trigger}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`w-2 h-2 rounded-full ${t.active ? "bg-green-400" : "bg-gray-300"}`} />
                    <span className="text-[10px] text-gray-400">{t.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Editor */}
        <div className="w-80 shrink-0">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-800">{selected.name}</p>
                  <p className="text-xs text-gray-400">{selected.id}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex gap-2 mb-3">
                  <button onClick={() => setPreviewMode(false)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${!previewMode ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200"}`}>
                    Edit
                  </button>
                  <button onClick={() => setPreviewMode(true)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${previewMode ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200"}`}>
                    Preview
                  </button>
                </div>

                {!previewMode ? (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1.5">Subject</label>
                      <input defaultValue={selected.subject}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1.5">Body</label>
                      <textarea defaultValue={sampleBody} rows={10}
                        className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-mono leading-relaxed" />
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-[10px] font-semibold text-blue-700 mb-1.5">Available variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {["{{user_name}}", "{{project_name}}", "{{amount}}", "{{date}}", "{{action_url}}", "{{otp_code}}", "{{dispute_id}}"].map(v => (
                          <span key={v} className="text-[10px] bg-white border border-blue-200 text-blue-600 px-1.5 py-0.5 rounded font-mono">{v}</span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2.5">
                      <p className="text-xs text-gray-300">Subject: <span className="text-white font-medium">{selected.subject.replace("{{user_name}}", "Rahul Sharma").replace("{{amount}}", "₹85,000").replace("{{date}}", "Mar 14, 2026")}</span></p>
                    </div>
                    <div className="p-4 bg-gray-50">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="w-16 h-6 bg-green-500 rounded mb-4 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">weblance</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {sampleBody.replace(/{{user_name}}/g, "Rahul Sharma").replace(/{{project_name}}/g, "Food Delivery App").replace(/{{action_url}}/g, "https://weblance.com/dashboard")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <ActionBtn label="Test Send" />
                  <ActionBtn label="Save" variant="primary" onClick={() => { setSaved(true); setTimeout(()=>setSaved(false),2000); }} />
                </div>
                {saved && <p className="text-xs text-green-600 font-semibold text-center">✓ Template saved</p>}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center sticky top-6">
              <span className="text-3xl mb-3 block">✉️</span>
              <p className="text-sm text-gray-500">Select a template to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 5: /admin/settings/rules ───────────────────────────────────────────
export function AdminSettingsRules() {
  const [saved, setSaved] = useState(false);
  const [rules, setRules] = useState([
    { id:"RULE-001", name:"High dispute rate → Reduce visibility", category:"User",    trigger:"Freelancer dispute rate > 20%",        action:"Reduce visibility to 'Reduced'",          active:true,  confidence:88, executions:3  },
    { id:"RULE-002", name:"Silence timeout → Auto approve",        category:"Project", trigger:"Client silent for 7 days after delivery", action:"Auto-approve milestone & release payment", active:true,  confidence:95, executions:2  },
    { id:"RULE-003", name:"3 missed deadlines → Flag account",     category:"User",    trigger:"Freelancer misses 3+ deadlines",          action:"Flag account + reduce job invitations",    active:true,  confidence:91, executions:1  },
    { id:"RULE-004", name:"Agency overload → Limit projects",      category:"User",    trigger:"Agency team capacity > 90%",              action:"Block new project invitations",           active:true,  confidence:89, executions:4  },
    { id:"RULE-005", name:"High risk project → Notify admin",      category:"Project", trigger:"Project health score < 40%",              action:"Notify admin + send warning to parties",  active:true,  confidence:85, executions:6  },
    { id:"RULE-006", name:"Fake account detected → Auto ban",      category:"User",    trigger:"AI fraud score > 95%",                    action:"Permanent ban + freeze pending payments",  active:false, confidence:97, executions:2  },
    { id:"RULE-007", name:"Payout KYC missing → Hold payout",      category:"Payment", trigger:"Payout requested, KYC not verified",       action:"Hold payout + send KYC reminder",         active:true,  confidence:99, executions:5  },
    { id:"RULE-008", name:"Elite++ auto-boost",                    category:"User",    trigger:"Freelancer earns Elite++ badge",           action:"Boost visibility + reduce commission to 4%",active:true, confidence:93, executions:1  },
  ]);

  const [editingRule, setEditingRule] = useState(null);
  const categories = ["All", "User", "Project", "Payment"];
  const [activeCategory, setCategory] = useState("All");

  const filtered = rules.filter(r => activeCategory === "All" || r.category === activeCategory);
  const categoryColor = {
    User:    "bg-green-50 text-green-700 border border-green-200",
    Project: "bg-purple-50 text-purple-700 border border-purple-200",
    Payment: "bg-blue-50 text-blue-700 border border-blue-200",
  };

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-6">
      <PageHeader
        title="Settings"
        subtitle="Platform configuration & system preferences"
        actions={<ActionBtn label="+ New Rule" variant="primary" size="md" style={btnNavy}/>}
      />
      <SettingsNav active="rules" />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-gray-800">{rules.length}</p>
          <p className="text-xs text-gray-400">Total Rules</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-green-600">{rules.filter(r=>r.active).length}</p>
          <p className="text-xs text-gray-400">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-blue-600">{rules.reduce((s,r)=>s+r.executions,0)}</p>
          <p className="text-xs text-gray-400">Total Executions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-orange-500">{Math.round(rules.reduce((s,r)=>s+r.confidence,0)/rules.length)}%</p>
          <p className="text-xs text-gray-400">Avg Confidence</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 mb-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${activeCategory === cat ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(rule => (
          <div key={rule.id}
            className={`bg-white rounded-xl border shadow-sm transition-all ${rule.active ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
            <div className="p-4">
              <div className="flex items-start gap-4">
                {/* Toggle */}
                <div className="mt-0.5 shrink-0">
                  <Toggle value={rule.active}
                    onChange={val => setRules(prev => prev.map(r => r.id === rule.id ? {...r, active:val} : r))} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <p className="text-sm font-bold text-gray-800">{rule.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${categoryColor[rule.category]}`}>
                      {rule.category}
                    </span>
                    <span className="text-[10px] text-gray-400">{rule.executions} executions</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2 p-2.5 bg-yellow-50 rounded-lg border border-yellow-100">
                      <span className="text-yellow-500 text-xs shrink-0 mt-0.5">IF</span>
                      <p className="text-xs text-yellow-800 font-medium">{rule.trigger}</p>
                    </div>
                    <div className="flex items-start gap-2 p-2.5 bg-green-50 rounded-lg border border-green-100">
                      <span className="text-green-500 text-xs shrink-0 mt-0.5">THEN</span>
                      <p className="text-xs text-green-800 font-medium">{rule.action}</p>
                    </div>
                  </div>
                </div>

                {/* Confidence + Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${rule.confidence >= 90 ? "bg-green-500" : "bg-yellow-400"}`}
                          style={{ width: `${rule.confidence}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-600">{rule.confidence}%</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">AI confidence</p>
                  </div>
                  <ActionBtn label="Edit" onClick={() => setEditingRule(editingRule === rule.id ? null : rule.id)} />
                </div>
              </div>

              {/* Edit Mode */}
              {editingRule === rule.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">IF condition</label>
                    <input defaultValue={rule.trigger}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">THEN action</label>
                    <input defaultValue={rule.action}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <ActionBtn label="Cancel" onClick={() => setEditingRule(null)} />
                    <ActionBtn label="Save Rule" variant="primary" onClick={() => { setEditingRule(null); save(); }} />
                    <ActionBtn label="Delete Rule" variant="danger" onClick={() => { setRules(prev => prev.filter(r => r.id !== rule.id)); setEditingRule(null); }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}