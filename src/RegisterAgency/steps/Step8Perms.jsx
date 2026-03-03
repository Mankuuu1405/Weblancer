import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
import { BsShieldCheck, BsPeopleFill } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";

const TEAM_ROLES = [
  {
    id: "project_manager",
    title: "Project Manager",
    desc: "Can manage projects, milestones, and client communication",
    perms: ["View projects", "Post messages", "Approve milestones"],
  },
  {
    id: "finance_admin",
    title: "Finance Admin",
    desc: "Can view invoices, payment history, and escrow status",
    perms: ["View payments", "Download invoices", "View escrow"],
  },
  {
    id: "developer",
    title: "Developer / Team Member",
    desc: "Can access assigned projects and submit deliverables",
    perms: ["View assigned projects", "Upload deliverables", "Post messages"],
  },
  {
    id: "viewer",
    title: "Read-Only Viewer",
    desc: "Can view all agency data but cannot make changes",
    perms: ["View all", "No edit access"],
  },
];

const VISIBILITY_OPTIONS = [
  { id: "public",  label: "Public",  desc: "Visible in search results and discovery" },
  { id: "private", label: "Private", desc: "Only visible to clients you contact directly" },
  { id: "invite",  label: "Invite Only", desc: "Only visible to users you invite" },
];

const NOTIFICATION_SETTINGS = [
  { id: "new_project",   label: "New project invites",       default: true  },
  { id: "milestone",     label: "Milestone approval requests", default: true  },
  { id: "payment",       label: "Payment released",          default: true  },
  { id: "dispute",       label: "Dispute alerts",            default: true  },
  { id: "team_activity", label: "Team member activity",      default: false },
  { id: "weekly_report", label: "Weekly performance report", default: false },
];

const InsightCard = ({ type, children }) => {
  const s = {
    warn:    "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-green-50 border-green-200 text-green-800",
    info:    "bg-blue-50 border-blue-200 text-blue-800",
  };
  return (
    <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>
      {children}
    </div>
  );
};

const Step8Perms = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
  const [enabledRoles,   setEnabledRoles]   = useState(formData.enabledRoles   || ["project_manager", "developer"]);
  const [visibility,     setVisibility]     = useState(formData.visibility     || "public");
  const [notifications,  setNotifications]  = useState(() => {
    if (formData.notifications) return formData.notifications;
    const obj = {};
    NOTIFICATION_SETTINGS.forEach(n => { obj[n.id] = n.default; });
    return obj;
  });

  const toggleRole  = (id) => setEnabledRoles(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  const toggleNotif = (id) => setNotifications(prev => ({ ...prev, [id]: !prev[id] }));

  const rolesConfigured = enabledRoles.length > 0;
  const hasAllCritical  = notifications["new_project"] && notifications["payment"] && notifications["dispute"];

  const handleNext = () => {
    updateData({ enabledRoles, visibility, notifications });
    next();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">

      {/* ── Form ── */}
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Permissions & Visibility</h2>
          <p className="text-sm text-gray-500 mb-7">Control who can do what inside your agency</p>

          {/* ── Section: Team Role Permissions ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BsPeopleFill className="text-blue-500 text-base shrink-0" />
              <span className="text-sm font-bold text-gray-900">Team Role Permissions</span>
            </div>

            <div className="flex flex-col gap-3">
              {TEAM_ROLES.map(role => {
                const enabled = enabledRoles.includes(role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => toggleRole(role.id)}
                    className={`flex items-start gap-4 px-4 py-4 rounded-xl border cursor-pointer transition-all
                      ${enabled
                        ? "border-blue-300 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.08)]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                  >
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded-md shrink-0 mt-0.5 flex items-center justify-center transition-all
                      ${enabled ? "bg-blue-500 border-none" : "bg-white border-2 border-gray-300"}`}>
                      {enabled && <span className="text-white text-xs font-bold">✓</span>}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold mb-0.5 ${enabled ? "text-blue-600" : "text-gray-800"}`}>
                        {role.title}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{role.desc}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {role.perms.map(p => (
                          <span key={p} className={`text-[11px] font-medium px-2 py-0.5 rounded-md
                            ${enabled ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Section: Agency Visibility ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiEye className="text-blue-500 text-base shrink-0" />
              <span className="text-sm font-bold text-gray-900">Agency Visibility</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {VISIBILITY_OPTIONS.map(opt => {
                const selected = visibility === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setVisibility(opt.id)}
                    className={`flex-1 flex flex-col items-start gap-1 px-4 py-4 rounded-xl border cursor-pointer text-left transition-all
                      ${selected
                        ? "border-2 border-blue-400 bg-blue-50"
                        : "border-[1.5px] border-gray-200 bg-white hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className={`w-4 h-4 rounded-full shrink-0 transition-all
                        ${selected ? "border-[5px] border-blue-500 bg-white" : "border-2 border-gray-300 bg-white"}`} />
                      <span className={`text-sm font-semibold ${selected ? "text-blue-600" : "text-gray-800"}`}>
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Section: Notification Preferences ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BsShieldCheck className="text-blue-500 text-base shrink-0" />
              <span className="text-sm font-bold text-gray-900">Notification Preferences</span>
            </div>

            <div className="flex flex-col gap-0">
              {NOTIFICATION_SETTINGS.map((n, i) => {
                const on = notifications[n.id];
                return (
                  <div
                    key={n.id}
                    className={`flex items-center justify-between py-3.5 px-1
                      ${i !== NOTIFICATION_SETTINGS.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <span className="text-sm text-gray-700">{n.label}</span>
                    {/* Toggle */}
                    <button
                      onClick={() => toggleNotif(n.id)}
                      className={`relative w-10 h-5 rounded-full transition-all cursor-pointer border-none shrink-0
                        ${on ? "bg-blue-500" : "bg-gray-200"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200
                        ${on ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-center pt-5">
          <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">
            ← Back
          </button>
          <button
            onClick={handleNext}
            className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all"
          >
            Continue to Go Live →
          </button>
        </div>
      </div>

      {/* ── AI Insights Sidebar ── */}
      <div className="w-full lg:w-[290px] lg:shrink-0 lg:sticky lg:top-6">
        <div className="bg-white border border-violet-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
              <MdAutoAwesome className="text-violet-700 text-sm" />
            </div>
            <span className="text-sm font-bold text-violet-700">AI Insights</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {rolesConfigured && (
              <InsightCard type="success">
                <MdCheckCircleOutline className="shrink-0 text-sm mt-0.5" />
                {enabledRoles.length} role{enabledRoles.length > 1 ? "s" : ""} configured. Team access is ready.
              </InsightCard>
            )}

            {!rolesConfigured && (
              <InsightCard type="warn">
                <MdOutlineWarningAmber className="shrink-0 text-sm mt-0.5" />
                Enable at least one team role to manage your agency effectively.
              </InsightCard>
            )}

            {visibility === "private" && (
              <InsightCard type="info">
                <span className="text-sm shrink-0">💡</span>
                Private mode limits discoverability. Consider "Public" for faster growth.
              </InsightCard>
            )}

            {visibility === "public" && (
              <InsightCard type="success">
                <MdCheckCircleOutline className="shrink-0 text-sm" />
                Public visibility maximizes your agency's reach and discoverability.
              </InsightCard>
            )}

            {!hasAllCritical && (
              <InsightCard type="warn">
                <MdOutlineWarningAmber className="shrink-0 text-sm mt-0.5" />
                Enable critical notifications (payments, disputes) to stay informed.
              </InsightCard>
            )}

            {hasAllCritical && (
              <InsightCard type="success">
                <MdCheckCircleOutline className="shrink-0 text-sm" />
                All critical alerts enabled. You won't miss important updates.
              </InsightCard>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Step8Perms;