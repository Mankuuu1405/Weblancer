import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-tpr-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-tpr-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

const G = {
  green:       "#22c55e",
  greenDark:   "#16a34a",
  greenBg:     "#f0fdf4",
  greenBorder: "#bbf7d0",
  text:        "#111827",
  sub:         "#6b7280",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
};
const FONT = "'Plus Jakarta Sans', sans-serif";

const PRIORITY_STYLE = {
  high:   { bg:"#fef2f2", text:"#dc2626", dot:"#ef4444", label:"High"   },
  medium: { bg:"#fef3c7", text:"#92400e", dot:"#f59e0b", label:"Medium" },
  low:    { bg:G.greenBg, text:G.greenDark, dot:G.green, label:"Low"    },
};
const TASK_STATUS = {
  todo:        { bg:"#f3f4f6", text:"#6b7280", label:"To Do"       },
  in_progress: { bg:"#eff6ff", text:"#2563eb", label:"In Progress" },
  review:      { bg:"#fef3c7", text:"#92400e", label:"In Review"   },
  done:        { bg:G.greenBg, text:G.greenDark, label:"Done"      },
};
const STAGE_STYLE = {
  active:    { bg:G.greenBg,   text:G.greenDark, dot:G.green,    label:"Active"    },
  on_hold:   { bg:"#fff7ed",   text:"#c2410c",   dot:"#f97316",  label:"On Hold"   },
  completed: { bg:"#eff6ff",   text:"#1d4ed8",   dot:"#3b82f6",  label:"Completed" },
};
const DELIV_STYLE = {
  not_started: { text:G.muted,    bg:"#f3f4f6", label:"Not Started"  },
  in_progress: { text:"#92400e",  bg:"#fef3c7", label:"In Progress"  },
  approved:    { text:G.greenDark, bg:G.greenBg, label:"Approved"    },
};

const PROJECTS = [
  {
    id:"CON-2026-001", name:"E-Commerce Platform Revamp", client:"ShopEasy Retail",
    service:"Web Development", role:"Lead Frontend Developer",
    start:"Mar 10, 2026", end:"Jul 10, 2026", progress:18, status:"active",
    activeMilestone:"Core Backend Build", milestoneDeadline:"Apr 15, 2026",
    tasks:[
      { id:"T01", name:"Build product listing page",   due:"Mar 28, 2026", priority:"high",   status:"in_progress" },
      { id:"T02", name:"Integrate cart & checkout UI", due:"Apr 5, 2026",  priority:"high",   status:"todo"        },
      { id:"T03", name:"Responsive mobile layout",     due:"Apr 10, 2026", priority:"medium", status:"todo"        },
      { id:"T04", name:"Component library setup",      due:"Mar 22, 2026", priority:"low",    status:"done"        },
      { id:"T05", name:"Unit tests for cart module",   due:"Apr 12, 2026", priority:"medium", status:"todo"        },
    ],
    deliverables:[
      { name:"UX Wireframes & Prototype", status:"approved"    },
      { name:"Product Listing Module",    status:"in_progress" },
      { name:"Checkout & Payment Flow",   status:"not_started" },
    ],
    channel:"/agency/channel2/1",
  },
  {
    id:"CON-2026-003", name:"Travel Booking Platform", client:"TravelNest",
    service:"Web Development", role:"Frontend Developer",
    start:"Mar 12, 2026", end:"Aug 15, 2026", progress:8, status:"active",
    activeMilestone:"Discovery & Architecture", milestoneDeadline:"Mar 26, 2026",
    tasks:[
      { id:"T06", name:"Hotel search UI component",    due:"Apr 20, 2026", priority:"high",   status:"in_progress" },
      { id:"T07", name:"Flight search integration UI", due:"May 5, 2026",  priority:"high",   status:"todo"        },
      { id:"T08", name:"Booking confirmation flow",    due:"Jun 10, 2026", priority:"medium", status:"todo"        },
      { id:"T09", name:"Architecture document review", due:"Mar 22, 2026", priority:"low",    status:"done"        },
    ],
    deliverables:[
      { name:"Architecture Document",     status:"approved"    },
      { name:"Hotel Search Module",       status:"in_progress" },
      { name:"Flight Search Integration", status:"not_started" },
    ],
    channel:"/agency/channel2/3",
  },
  {
    id:"CON-2025-011", name:"LMS Platform Build", client:"EduSpark",
    service:"Web Development", role:"Senior Frontend Developer",
    start:"Sep 5, 2025", end:"Nov 20, 2025", progress:100, status:"completed",
    activeMilestone:null, milestoneDeadline:null,
    tasks:[
      { id:"T10", name:"Course listing page",  due:"Sep 25, 2025", priority:"high",   status:"done" },
      { id:"T11", name:"Quiz engine UI",       due:"Oct 10, 2025", priority:"high",   status:"done" },
      { id:"T12", name:"Progress tracking UI", due:"Oct 25, 2025", priority:"medium", status:"done" },
      { id:"T13", name:"Admin dashboard",      due:"Nov 10, 2025", priority:"medium", status:"done" },
    ],
    deliverables:[
      { name:"UI Design System",       status:"approved" },
      { name:"Course Module",          status:"approved" },
      { name:"Quiz & Progress Module", status:"approved" },
    ],
    channel:null,
  },
];

export default function TeamProjects() {
  const [filter,   setFilter]   = useState("all");
  const [detail,   setDetail]   = useState(null);
  const [projects, setProjects] = useState(PROJECTS);

  const stats = useMemo(() => ({
    active:     projects.filter(p => p.status === "active").length,
    completed:  projects.filter(p => p.status === "completed").length,
    milestones: projects.reduce((s, p) => s + p.deliverables.filter(d => d.status === "approved").length, 0),
    pending:    projects.reduce((s, p) => s + p.tasks.filter(t => t.status !== "done").length, 0),
    nextDue:    projects.filter(p => p.status === "active").flatMap(p => p.tasks.filter(t => t.status !== "done")).sort((a, b) => a.due.localeCompare(b.due))[0]?.due || "—",
  }), [projects]);

  const rows = useMemo(() => filter === "all" ? projects : projects.filter(p => p.status === filter), [projects, filter]);

  const allPendingTasks = useMemo(() =>
    projects.filter(p => p.status === "active")
      .flatMap(p => p.tasks.filter(t => t.status !== "done").map(t => ({ ...t, project:p.name, projectId:p.id })))
      .sort((a, b) => a.due.localeCompare(b.due))
  , [projects]);

  const markDone = (projectId, taskId) => {
    setProjects(prev => prev.map(p => p.id === projectId
      ? { ...p, tasks:p.tasks.map(t => t.id === taskId ? { ...t, status:"done" } : t) }
      : p));
    if (detail?.id === projectId)
      setDetail(prev => ({ ...prev, tasks:prev.tasks.map(t => t.id === taskId ? { ...t, status:"done" } : t) }));
  };

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar />

      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ padding:"20px 0 0" }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>My Projects</h1>
            <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Projects assigned to you by the agency</p>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, marginTop:18, paddingTop:18, borderTop:"1px solid #f3f4f6" }}>
            {[
              { label:"Active Projects",   val:stats.active,    accent:G.greenDark  },
              { label:"Completed",         val:stats.completed, accent:"#2563eb"    },
              { label:"Deliverables Done", val:stats.milestones,accent:G.green      },
              { label:"Pending Tasks",     val:stats.pending,   accent:"#d97706"    },
              { label:"Next Deadline",     val:stats.nextDue,   accent:"#dc2626"    },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex:1, paddingBottom:16,
                borderRight:i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
                paddingLeft:i === 0 ? 0 : 20 }}>
                <p style={{ fontSize:10, color:G.muted, fontWeight:700, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.label}</p>
                <p style={{ fontSize:20, fontWeight:800, color:s.accent, margin:0, letterSpacing:"-0.3px" }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:0, marginTop:4, borderTop:"1px solid #f3f4f6" }}>
            {[["all","All"],["active","Active"],["completed","Completed"],["on_hold","On Hold"]].map(([id, label]) => {
              const cnt    = id === "all" ? projects.length : projects.filter(p => p.status === id).length;
              const active = filter === id;
              return (
                <button key={id} onClick={() => setFilter(id)}
                  style={{ display:"flex", alignItems:"center", gap:5, padding:"10px 12px",
                    fontSize:13, fontWeight:active ? 700 : 400,
                    color:active ? G.greenDark : G.sub, background:"none", border:"none",
                    borderBottom:active ? `2px solid ${G.green}` : "2px solid transparent",
                    cursor:"pointer", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT }}>
                  {label}
                  <span style={{ fontSize:11, fontWeight:700, background:active ? G.green : "#f3f4f6", color:active ? G.white : G.muted, padding:"1px 7px", borderRadius:99 }}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1160, margin:"0 auto", padding:"24px 28px 64px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>

          {/* Project cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {rows.map(p => <ProjectCard key={p.id} project={p} onOpen={() => setDetail(p)} onMarkDone={markDone} />)}
            {rows.length === 0 && (
              <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, textAlign:"center", padding:"48px 20px" }}>
                <p style={{ fontSize:32, marginBottom:8 }}>📂</p>
                <p style={{ fontSize:14, fontWeight:600, color:G.text }}>No projects found</p>
              </div>
            )}
          </div>

          {/* Pending tasks sidebar */}
          <div>
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden", position:"sticky", top:72 }}>
              <div style={{ padding:"14px 18px", borderBottom:"1px solid #f9fafb" }}>
                <p style={{ fontSize:14, fontWeight:700, color:G.text }}>All Pending Tasks</p>
                <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>Across all active projects, by deadline</p>
              </div>
              <div style={{ maxHeight:520, overflowY:"auto" }}>
                {allPendingTasks.length === 0 ? (
                  <div style={{ padding:"32px 18px", textAlign:"center" }}>
                    <p style={{ fontSize:28, marginBottom:6 }}>🎉</p>
                    <p style={{ fontSize:13, color:G.sub }}>All tasks done!</p>
                  </div>
                ) : allPendingTasks.map((t, i) => {
                  const ps = PRIORITY_STYLE[t.priority] || PRIORITY_STYLE.low;
                  return (
                    <div key={t.id} style={{ padding:"11px 18px",
                      borderBottom:i < allPendingTasks.length - 1 ? "1px solid #f9fafb" : "none",
                      display:"flex", alignItems:"flex-start", gap:10 }}>
                      <button onClick={() => markDone(t.projectId, t.id)}
                        style={{ width:18, height:18, borderRadius:5, border:`2px solid ${G.greenBorder}`,
                          background:G.white, cursor:"pointer", flexShrink:0, marginTop:2,
                          display:"flex", alignItems:"center", justifyContent:"center" }} />
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:12, fontWeight:600, color:G.text, lineHeight:1.4, marginBottom:3 }}>{t.name}</p>
                        <p style={{ fontSize:11, color:G.muted, marginBottom:4 }}>{t.project}</p>
                        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                          <span style={{ fontSize:10, fontWeight:700, background:ps.bg, color:ps.text, padding:"1px 7px", borderRadius:99 }}>{ps.label}</span>
                          <span style={{ fontSize:10, fontWeight:600, color:G.muted }}>📅 {t.due}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {detail && <DetailModal project={detail} onClose={() => setDetail(null)} onMarkDone={markDone} />}
    </div>
  );
}

/* ── Project Card ───────────────────────────────────────────── */
function ProjectCard({ project:p, onOpen, onMarkDone }) {
  const [hov, setHov] = useState(false);
  const ss          = STAGE_STYLE[p.status] || STAGE_STYLE.active;
  const pendingTasks = p.tasks.filter(t => t.status !== "done");
  const doneTasks    = p.tasks.filter(t => t.status === "done");

  return (
    <div style={{ background:G.white, border:`1.5px solid ${hov ? G.greenBorder : G.border}`,
      borderRadius:14, overflow:"hidden", transition:"all 0.15s",
      boxShadow:hov ? "0 4px 20px rgba(34,197,94,0.1)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ padding:"18px 20px" }}>
        {/* Top row */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <p style={{ fontSize:15, fontWeight:700, color:G.text }}>{p.name}</p>
              <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:600,
                padding:"2px 9px", borderRadius:99, background:ss.bg, color:ss.text }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:ss.dot }} />
                {ss.label}
              </span>
            </div>
            <p style={{ fontSize:12, color:G.sub }}>{p.client} · {p.service}</p>
          </div>
          <span style={{ fontSize:11, fontWeight:700, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, padding:"3px 10px", borderRadius:99 }}>{p.role}</span>
        </div>

        {/* Progress */}
        <div style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:11, color:G.muted }}>Project progress</span>
            <span style={{ fontSize:11, fontWeight:700, color:G.greenDark }}>{p.progress}%</span>
          </div>
          <div style={{ background:"#f3f4f6", borderRadius:99, height:6, overflow:"hidden" }}>
            <div style={{ width:`${p.progress}%`, height:"100%", background:`linear-gradient(90deg,${G.green},#86efac)`, borderRadius:99, transition:"width 0.3s" }} />
          </div>
        </div>

        {/* Meta */}
        <div style={{ display:"flex", gap:16, marginBottom:14 }}>
          <div>
            <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>Timeline</p>
            <p style={{ fontSize:12, color:G.sub }}>{p.start} → {p.end}</p>
          </div>
          {p.activeMilestone && (
            <div>
              <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>Active Milestone</p>
              <p style={{ fontSize:12, color:G.greenDark, fontWeight:600 }}>{p.activeMilestone} · {p.milestoneDeadline}</p>
            </div>
          )}
          <div>
            <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>Tasks</p>
            <p style={{ fontSize:12, color:G.sub }}>{doneTasks.length}/{p.tasks.length} done</p>
          </div>
        </div>

        {/* Pending tasks preview */}
        {pendingTasks.length > 0 && (
          <div style={{ background:G.bg, borderRadius:10, padding:"10px 12px", marginBottom:14 }}>
            <p style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>Pending Tasks</p>
            {pendingTasks.slice(0, 3).map(t => {
              const ps = PRIORITY_STYLE[t.priority] || PRIORITY_STYLE.low;
              return (
                <div key={t.id} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <button onClick={e => { e.stopPropagation(); onMarkDone(p.id, t.id); }}
                    style={{ width:16, height:16, borderRadius:4, border:`2px solid ${G.greenBorder}`, background:G.white, cursor:"pointer", flexShrink:0 }} />
                  <p style={{ flex:1, fontSize:12, color:G.sub }}>{t.name}</p>
                  <span style={{ fontSize:10, fontWeight:700, background:ps.bg, color:ps.text, padding:"1px 6px", borderRadius:99 }}>{ps.label}</span>
                  <span style={{ fontSize:11, color:G.muted }}>{t.due}</span>
                </div>
              );
            })}
            {pendingTasks.length > 3 && <p style={{ fontSize:11, color:G.muted, marginTop:4 }}>+{pendingTasks.length - 3} more tasks</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            {p.channel && (
              <a href={p.channel} onClick={e => e.stopPropagation()}
                style={{ fontSize:12, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"6px 12px", textDecoration:"none" }}>
                💬 Channel 2
              </a>
            )}
          </div>
          <button onClick={onOpen}
            style={{ fontSize:12, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"6px 14px", cursor:"pointer", fontFamily:FONT }}>
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Detail Modal ───────────────────────────────────────────── */
function DetailModal({ project:p, onClose, onMarkDone }) {
  const [tab, setTab] = useState("tasks");

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(17,24,39,0.45)", backdropFilter:"blur(4px)", padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width:"100%", maxWidth:680, maxHeight:"88vh", background:G.white, borderRadius:18, display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 32px 80px rgba(0,0,0,0.2)" }}>

        {/* Dark green gradient header */}
        <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", padding:"20px 24px 0" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
            <div>
              <p style={{ fontSize:18, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>{p.name}</p>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:4 }}>{p.client} · {p.role}</p>
            </div>
            <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.6)" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Progress */}
          <div style={{ background:"rgba(255,255,255,0.07)", borderRadius:10, padding:"10px 14px", marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:600 }}>Project Progress</span>
              <span style={{ fontSize:12, color:"#86efac", fontWeight:700 }}>{p.progress}%</span>
            </div>
            <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:99, height:6, overflow:"hidden" }}>
              <div style={{ width:`${p.progress}%`, height:"100%", background:`linear-gradient(90deg,${G.green},#86efac)`, borderRadius:99 }} />
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display:"flex" }}>
            {["tasks","deliverables","timeline"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding:"10px 14px", fontSize:13, fontWeight:tab === t ? 700 : 400,
                  color:tab === t ? G.white : "rgba(255,255,255,0.4)",
                  background:"none", border:"none",
                  borderBottom:tab === t ? `2px solid ${G.green}` : "2px solid transparent",
                  cursor:"pointer", textTransform:"capitalize", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>

          {tab === "tasks" && (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {p.tasks.map(t => {
                const ps   = PRIORITY_STYLE[t.priority] || PRIORITY_STYLE.low;
                const ts   = TASK_STATUS[t.status] || TASK_STATUS.todo;
                const done = t.status === "done";
                return (
                  <div key={t.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                    border:`1px solid ${done ? G.greenBorder : G.border}`, borderRadius:10,
                    background:done ? G.greenBg : G.white }}>
                    <button onClick={() => !done && onMarkDone(p.id, t.id)}
                      style={{ width:20, height:20, borderRadius:6,
                        border:`2px solid ${done ? G.green : G.greenBorder}`,
                        background:done ? G.green : G.white,
                        cursor:done ? "default" : "pointer", flexShrink:0,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:G.white, fontSize:12 }}>{done && "✓"}</button>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, fontWeight:600, color:done ? G.muted : G.text, textDecoration:done ? "line-through" : "none" }}>{t.name}</p>
                      <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>Due {t.due}</p>
                    </div>
                    <span style={{ fontSize:11, fontWeight:600, background:ps.bg, color:ps.text, padding:"2px 8px", borderRadius:99 }}>{ps.label}</span>
                    <span style={{ fontSize:11, fontWeight:600, background:ts.bg, color:ts.text, padding:"2px 8px", borderRadius:99 }}>{ts.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "deliverables" && (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {p.deliverables.map((d, i) => {
                const ds = DELIV_STYLE[d.status] || DELIV_STYLE.not_started;
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"14px 16px", border:`1px solid ${G.border}`, borderRadius:10, borderLeft:`3px solid ${ds.text}` }}>
                    <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{d.name}</p>
                    <span style={{ fontSize:11, fontWeight:600, background:ds.bg, color:ds.text, padding:"3px 10px", borderRadius:99 }}>{ds.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "timeline" && (
            <div style={{ position:"relative", paddingLeft:24 }}>
              <div style={{ position:"absolute", left:8, top:0, bottom:0, width:2, background:"#f3f4f6" }} />
              {[
                { event:"Assigned to project",       date:p.start,        by:"Raj Kumar (Admin)" },
                { event:"Kickoff meeting done",      date:p.start,        by:"Team"              },
                { event:"First task completed",      date:"Mar 15, 2026", by:"Sara M."           },
                { event:"Architecture doc reviewed", date:"Mar 16, 2026", by:"Sara M."           },
              ].map((a, i) => (
                <div key={i} style={{ paddingBottom:20, position:"relative" }}>
                  <div style={{ width:12, height:12, borderRadius:"50%", background:G.green,
                    border:"3px solid #fff", boxShadow:`0 0 0 2px ${G.green}`,
                    position:"absolute", left:-20, top:2, zIndex:1 }} />
                  <p style={{ fontSize:13, fontWeight:600, color:G.text, marginBottom:2 }}>{a.event}</p>
                  <p style={{ fontSize:12, color:G.muted }}>{a.date} · {a.by}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:"12px 24px", borderTop:"1px solid #f3f4f6",
          display:"flex", justifyContent:"space-between", alignItems:"center", background:G.bg }}>
          <p style={{ fontSize:12, color:G.muted }}>{p.tasks.filter(t => t.status === "done").length}/{p.tasks.length} tasks completed</p>
          {p.channel && (
            <a href={p.channel} style={{ fontSize:13, fontWeight:700, background:G.green, color:G.white, border:"none", borderRadius:9, padding:"8px 16px", textDecoration:"none" }}>
              💬 Open Channel 2 →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav style={{ height:52, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:12, position:"sticky", top:0, zIndex:40 }}>
      <span style={{ fontWeight:800, fontSize:18, color:G.text, letterSpacing:"-0.5px", fontFamily:FONT }}>
        <span style={{ color:G.green }}>web</span>lance
      </span>
      <div style={{ width:1, height:20, background:G.border }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Team</span>
      <span style={{ fontSize:12, color:G.border }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Projects</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <span style={{ fontSize:10 }}>👤</span>
        <span style={{ fontSize:11, color:G.greenDark, fontWeight:700 }}>Team Member</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:32, height:32, borderRadius:"50%", background:G.greenBg, border:`1.5px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G.greenDark, marginLeft:8, fontFamily:FONT }}>SM</div>
    </nav>
  );
}