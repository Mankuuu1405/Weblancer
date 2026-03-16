import { useState } from "react";
import { ActionBtn, PageHeader, StatCard, SectionCard } from "./AdminComponents";

const mockAnnouncements = [
  { id: "ANN-001", title: "Platform Maintenance — Mar 20, 2026", body: "The platform will undergo scheduled maintenance on March 20th from 2:00 AM to 4:00 AM IST. All services will be temporarily unavailable.", target: "All Users", status: "Scheduled", scheduledAt: "Mar 19, 2026 · 11:00 PM", publishedAt: null, reach: 0, readRate: 0, createdBy: "Super Admin", createdAt: "Mar 14, 2026" },
  { id: "ANN-002", title: "New Feature: AI Meeting Scheduler Live!", body: "We've launched in-project meeting scheduling. Book, record, and log meetings directly inside ProjectStream. Available for all active projects.", target: "All Users", status: "Published", scheduledAt: null, publishedAt: "Mar 10, 2026", reach: 847, readRate: 62, createdBy: "Platform Admin", createdAt: "Mar 9, 2026" },
  { id: "ANN-003", title: "Commission Rate Update — Effective Apr 1", body: "Platform commission will remain at 6% for all plans. Elite++ freelancers will receive a reduced rate of 4% starting April 1st.", target: "Freelancers", status: "Published", scheduledAt: null, publishedAt: "Mar 8, 2026", reach: 312, readRate: 78, createdBy: "Super Admin", createdAt: "Mar 7, 2026" },
  { id: "ANN-004", title: "Agency Capacity Limits — Policy Update", body: "Agencies with teams under 5 members will be limited to 3 concurrent projects. This policy takes effect from March 25th.", target: "Agencies", status: "Draft", scheduledAt: null, publishedAt: null, reach: 0, readRate: 0, createdBy: "Platform Admin", createdAt: "Mar 13, 2026" },
  { id: "ANN-005", title: "KYC Verification Now Mandatory for Payouts > ₹50k", body: "Effective immediately, all payouts above ₹50,000 require verified KYC. Please ensure your documents are up to date.", target: "Freelancers", status: "Published", scheduledAt: null, publishedAt: "Feb 28, 2026", reach: 289, readRate: 91, createdBy: "Finance Admin", createdAt: "Feb 27, 2026" },
];

const statusStyle = {
  Published: "bg-green-50 text-green-700 border border-green-200",
  Scheduled: "bg-blue-50 text-blue-700 border border-blue-200",
  Draft:     "bg-gray-50 text-gray-500 border border-gray-200",
  Archived:  "bg-gray-50 text-gray-400 border border-gray-200",
};

const targetStyle = {
  "All Users":   "bg-purple-50 text-purple-700 border border-purple-200",
  "Freelancers": "bg-blue-50 text-blue-700 border border-blue-200",
  "Agencies":    "bg-orange-50 text-orange-700 border border-orange-200",
  "Clients":     "bg-green-50 text-green-700 border border-green-200",
};

const targetIcon = {
  "All Users": "◈", "Freelancers": "⟡", "Agencies": "⬡", "Clients": "◉",
};

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [activeTab, setActiveTab] = useState("all");
  const [showCompose, setShowCompose] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    title: "", body: "", target: "All Users", scheduleType: "now", scheduleDate: "", scheduleTime: "",
  });

  const filtered = announcements.filter((a) => {
    if (activeTab === "all") return true;
    if (activeTab === "published") return a.status === "Published";
    if (activeTab === "scheduled") return a.status === "Scheduled";
    if (activeTab === "draft") return a.status === "Draft";
    return true;
  });

  const handlePublish = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    const newAnn = {
      id: `ANN-00${announcements.length + 1}`,
      title: form.title,
      body: form.body,
      target: form.target,
      status: form.scheduleType === "now" ? "Published" : "Scheduled",
      scheduledAt: form.scheduleType === "schedule" ? `${form.scheduleDate} · ${form.scheduleTime}` : null,
      publishedAt: form.scheduleType === "now" ? "Mar 14, 2026" : null,
      reach: 0, readRate: 0,
      createdBy: "Super Admin",
      createdAt: "Mar 14, 2026",
    };
    setAnnouncements([newAnn, ...announcements]);
    setForm({ title: "", body: "", target: "All Users", scheduleType: "now", scheduleDate: "", scheduleTime: "" });
    setShowCompose(false);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Announcements"
        subtitle="Broadcast platform-wide messages to users"
        actions={
          <ActionBtn
            label="+ New Announcement"
            variant="primary"
            size="md"
            onClick={() => { setShowCompose(true); setSelected(null); }}
          />
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total" value={announcements.length} color="gray" />
        <StatCard label="Published" value={announcements.filter(a => a.status === "Published").length} color="green" />
        <StatCard label="Scheduled" value={announcements.filter(a => a.status === "Scheduled").length} color="blue" />
        <StatCard label="Drafts" value={announcements.filter(a => a.status === "Draft").length} color="orange" />
      </div>

      <div className="flex gap-5">
        {/* Left — List */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-100 mb-4">
            {[
              { key: "all", label: "All" },
              { key: "published", label: "Published" },
              { key: "scheduled", label: "Scheduled" },
              { key: "draft", label: "Drafts" },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.key ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((ann) => (
              <div
                key={ann.id}
                onClick={() => { setSelected(ann); setShowCompose(false); }}
                className={`bg-white rounded-xl border transition-all cursor-pointer ${selected?.id === ann.id ? "border-green-300 shadow-md" : "border-gray-100 shadow-sm hover:border-gray-200"}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[ann.status]}`}>
                        {ann.status}
                      </span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${targetStyle[ann.target]}`}>
                        {targetIcon[ann.target]} {ann.target}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">{ann.createdAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 mb-1">{ann.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{ann.body}</p>

                  {ann.status === "Published" && (
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-400">Reach</span>
                        <span className="text-xs font-bold text-gray-700">{ann.reach.toLocaleString()} users</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-400">Read rate</span>
                        <div className="flex items-center gap-1">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${ann.readRate}%` }} />
                          </div>
                          <span className="text-xs font-bold text-green-600">{ann.readRate}%</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 ml-auto">Published {ann.publishedAt}</span>
                    </div>
                  )}

                  {ann.status === "Scheduled" && (
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <p className="text-xs text-blue-600 font-medium">🕐 Scheduled for {ann.scheduledAt}</p>
                    </div>
                  )}

                  {ann.status === "Draft" && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                      <ActionBtn label="Edit Draft" size="sm" onClick={(e) => { e.stopPropagation(); setSelected(ann); setShowCompose(false); }} />
                      <ActionBtn label="Publish Now" variant="primary" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        setAnnouncements(prev => prev.map(a => a.id === ann.id ? { ...a, status: "Published", publishedAt: "Mar 14, 2026", reach: 0 } : a));
                      }} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
                <p className="text-gray-400 text-sm">No announcements in this tab</p>
              </div>
            )}
          </div>
        </div>

        {/* Right — Detail / Compose */}
        <div className="w-80 shrink-0">

          {/* Compose Panel */}
          {showCompose && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">New Announcement</h3>
                <button onClick={() => setShowCompose(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Announcement title..."
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Message *</label>
                  <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
                    placeholder="Write your announcement..."
                    rows={5}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-400" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Target Audience</label>
                  <select value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
                    <option>All Users</option>
                    <option>Freelancers</option>
                    <option>Agencies</option>
                    <option>Clients</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Publish</label>
                  <div className="space-y-2">
                    {["now", "schedule", "draft"].map((type) => (
                      <label key={type} className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors ${form.scheduleType === type ? "border-green-300 bg-green-50" : "border-gray-200 hover:bg-gray-50"}`}>
                        <input type="radio" name="scheduleType" value={type} checked={form.scheduleType === type}
                          onChange={() => setForm({ ...form, scheduleType: type })} className="accent-green-500" />
                        <span className="text-sm text-gray-700 capitalize">
                          {type === "now" ? "Publish immediately" : type === "schedule" ? "Schedule for later" : "Save as draft"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {form.scheduleType === "schedule" && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Date</label>
                      <input type="date" value={form.scheduleDate} onChange={(e) => setForm({ ...form, scheduleDate: e.target.value })}
                        className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Time</label>
                      <input type="time" value={form.scheduleTime} onChange={(e) => setForm({ ...form, scheduleTime: e.target.value })}
                        className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>
                )}

                {/* Preview */}
                {form.title && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-[10px] text-gray-400 mb-1.5 font-semibold uppercase tracking-wide">Preview</p>
                    <p className="text-xs font-bold text-gray-800 mb-1">{form.title}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">{form.body || "Message will appear here..."}</p>
                    {form.target && (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-2 inline-block ${targetStyle[form.target]}`}>
                        {targetIcon[form.target]} {form.target}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <ActionBtn label="Cancel" onClick={() => setShowCompose(false)} />
                  <button onClick={handlePublish}
                    disabled={!form.title.trim() || !form.body.trim()}
                    className="flex-1 py-2 text-sm font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    {form.scheduleType === "now" ? "Publish Now" : form.scheduleType === "schedule" ? "Schedule" : "Save Draft"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Detail View */}
          {selected && !showCompose && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">Details</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[selected.status]}`}>{selected.status}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${targetStyle[selected.target]}`}>{selected.target}</span>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">{selected.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{selected.body}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-50">
                  {[
                    { label: "ID", value: selected.id },
                    { label: "Created by", value: selected.createdBy },
                    { label: "Created", value: selected.createdAt },
                    selected.publishedAt && { label: "Published", value: selected.publishedAt },
                    selected.scheduledAt && { label: "Scheduled for", value: selected.scheduledAt },
                  ].filter(Boolean).map((item) => (
                    <div key={item.label} className="flex justify-between text-xs">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="font-medium text-gray-700">{item.value}</span>
                    </div>
                  ))}
                </div>

                {selected.status === "Published" && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Reach & Engagement</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Total reached</span>
                        <span className="font-bold text-gray-800">{selected.reach.toLocaleString()} users</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Read rate</span>
                          <span className="font-bold text-green-600">{selected.readRate}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${selected.readRate}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-1">
                  {selected.status === "Draft" && (
                    <ActionBtn label="Publish Now" variant="primary" size="md"
                      onClick={() => { setAnnouncements(prev => prev.map(a => a.id === selected.id ? { ...a, status: "Published", publishedAt: "Mar 14, 2026" } : a)); setSelected(null); }} />
                  )}
                  {selected.status === "Scheduled" && (
                    <ActionBtn label="Cancel Schedule" variant="warning" size="md"
                      onClick={() => { setAnnouncements(prev => prev.map(a => a.id === selected.id ? { ...a, status: "Draft", scheduledAt: null } : a)); setSelected(null); }} />
                  )}
                  {selected.status === "Published" && (
                    <ActionBtn label="Archive" variant="default" size="md"
                      onClick={() => { setAnnouncements(prev => prev.map(a => a.id === selected.id ? { ...a, status: "Archived" } : a)); setSelected(null); }} />
                  )}
                  <ActionBtn label="Delete" variant="danger" size="md"
                    onClick={() => { setAnnouncements(prev => prev.filter(a => a.id !== selected.id)); setSelected(null); }} />
                </div>
              </div>
            </div>
          )}

          {/* Default empty right panel */}
          {!selected && !showCompose && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-400">📢</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">Select an announcement to view details</p>
              <ActionBtn label="+ New Announcement" variant="primary" onClick={() => setShowCompose(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}