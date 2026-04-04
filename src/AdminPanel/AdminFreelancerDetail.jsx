import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockFreelancers } from "./mockData";
import { TrustScore, RiskFlag, StatusBadge } from "./AdminComponents";
import {
  ArrowLeft, User, Activity, DollarSign, ShieldCheck,
  Brain, Settings2, Star, Award, CheckCircle,
  AlertTriangle, ShieldOff, XCircle, TrendingUp,
  Send, Download, Eye, ExternalLink, Clock,
  Globe, Calendar, Zap, RefreshCw, MessageSquare,
  ChevronRight,
} from "lucide-react";

// ── Theme ────────────────────────────────────────────────────────────────────
const T = {
  navy:     "#0d1b3e",
  teal:     "#1ab5c8",
  green:    "#3ddc84",
  greenTeal:"linear-gradient(135deg, #3ddc84 0%, #1ab5c8 100%)",
  navyTeal: "linear-gradient(135deg, #0d1b3e 0%, #1ab5c8 100%)",
  bg:       "#f0f4ff",
  white:    "#ffffff",
  border:   "#eaeef6",
  muted:    "#8a9ab5",
  textDark: "#0d1b3e",
  textMid:  "#4a5e7a",
};

// ── Reusable pieces ───────────────────────────────────────────────────────────
function Btn({ label, icon: Icon, onClick, variant = "default", size = "md" }) {
  const map = {
    primary: { bg: T.greenTeal, color: "#fff", border: "none", shadow: "0 2px 8px rgba(61,220,132,0.3)" },
    danger:  { bg: "linear-gradient(135deg,#ff4e4e,#e02020)", color: "#fff", border: "none", shadow: "0 2px 8px rgba(255,78,78,0.3)" },
    warning: { bg: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", border: "none", shadow: "0 2px 8px rgba(245,158,11,0.3)" },
    navy:    { bg: T.navyTeal, color: "#fff", border: "none", shadow: "0 2px 8px rgba(10,36,68,0.2)" },
    default: { bg: T.white, color: T.textMid, border: `1px solid ${T.border}`, shadow: "none" },
  };
  const s = map[variant];
  const pad = size==="sm"?"5px 11px":size==="lg"?"10px 22px":"7px 14px";
  return (
    <button onClick={onClick} style={{
      display:"inline-flex",alignItems:"center",gap:6,padding:pad,borderRadius:8,
      cursor:"pointer",fontSize:size==="sm"?11:size==="lg"?14:12,fontWeight:600,
      whiteSpace:"nowrap",background:s.bg,color:s.color,border:s.border,
      boxShadow:s.shadow,transition:"opacity 0.15s",fontFamily:"'DM Sans','Segoe UI',sans-serif",
    }} onMouseOver={e=>e.currentTarget.style.opacity="0.85"} onMouseOut={e=>e.currentTarget.style.opacity="1"}>
      {Icon && <Icon size={size==="sm"?11:13}/>}{label}
    </button>
  );
}

function SectionCard({ title, children, action }) {
  return (
    <div style={{ background:T.white, borderRadius:14, border:`1px solid ${T.border}`, boxShadow:"0 2px 8px rgba(10,36,68,0.05)", overflow:"hidden" }}>
      <div style={{ padding:"13px 18px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8faff" }}>
        <span style={{ fontSize:13, fontWeight:700, color:T.navy }}>{title}</span>
        {action}
      </div>
      <div style={{ padding:"16px 18px" }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value, icon: Icon }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${T.border}` }}>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        {Icon && <Icon size={13} color={T.muted}/>}
        <span style={{ fontSize:12, color:T.muted, fontWeight:500 }}>{label}</span>
      </div>
      <span style={{ fontSize:13, fontWeight:600, color:T.navy }}>{value}</span>
    </div>
  );
}

function UserAvatar({ name, size=56 }) {
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:T.navyTeal, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.28, fontWeight:800, color:"#fff", flexShrink:0, border:"3px solid #fff", boxShadow:"0 4px 16px rgba(10,36,68,0.18)" }}>
      {initials}
    </div>
  );
}

const badgeMeta = {
  "Elite++": { color:"#7c3aed", bg:"#f5f3ff", icon:Star },
  "Pro+":    { color:"#0891b2", bg:"#ecfeff", icon:Award },
  "Verified":{ color:"#059669", bg:"#ecfdf5", icon:CheckCircle },
};
function Badge({ label }) {
  const m = badgeMeta[label]||{color:T.muted,bg:"#f4f7ff",icon:CheckCircle};
  const Icon = m.icon;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, color:m.color, background:m.bg, padding:"3px 9px", borderRadius:20, border:`1px solid ${m.color}22` }}>
      <Icon size={11}/>{label}
    </span>
  );
}

const visMeta = { Boosted:{color:"#059669",bg:"#ecfdf5"}, Normal:{color:T.muted,bg:"#f4f7ff"}, Reduced:{color:"#d97706",bg:"#fffbeb"}, Hidden:{color:"#ef4444",bg:"#fef2f2"} };

function MiniStatCard({ label, value, color }) {
  return (
    <div style={{ padding:"14px 16px", background:"#f8faff", borderRadius:12, border:`1px solid ${T.border}`, textAlign:"center" }}>
      <p style={{ margin:"0 0 3px", fontSize:11, color:T.muted, fontWeight:600, textTransform:"uppercase", letterSpacing:0.6 }}>{label}</p>
      <p style={{ margin:0, fontSize:20, fontWeight:800, color }}>{value}</p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminFreelancerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [note, setNote]           = useState("");
  const [notes, setNotes]         = useState([]);
  const [visibility, setVisibility] = useState(null);

  const f = mockFreelancers.find(x => x.id === id);

  if (!f) return (
    <div style={{ padding:48, textAlign:"center", fontFamily:"'DM Sans',sans-serif" }}>
      <p style={{ color:T.muted }}>Freelancer not found</p>
      <Btn label="← Back" onClick={() => navigate("/admin/freelancers")} />
    </div>
  );

  const currentVis = visibility || f.visibility;
  const addNote = () => {
    if (!note.trim()) return;
    const d = new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
    setNotes([{text:note,admin:"Super Admin",date:d},...notes]);
    setNote("");
  };

  const tabs = [
    { key:"profile",     label:"Profile",     icon:User        },
    { key:"performance", label:"Performance", icon:TrendingUp  },
    { key:"projects",    label:"Projects",    icon:Activity    },
    { key:"financials",  label:"Financials",  icon:DollarSign  },
    { key:"behavior",    label:"Behavior",    icon:Brain       },
    { key:"admin",       label:"Admin",       icon:ShieldCheck },
  ];

  const exportFinancials = () => {
    const csv = `Label,Value\nTotal Earned,${f.totalEarned}\nEscrow Pending,45000\nWithdrawn,120000`;
    const blob = new Blob([csv],{type:"text/csv"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="financials.csv"; a.click();
  };

  return (
    <div style={{ padding:24, background:T.bg, minHeight:"100%", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>

      {/* Back */}
      <button onClick={() => navigate("/admin/freelancers")} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:T.muted, fontWeight:500, cursor:"pointer", background:"none", border:"none", padding:0, marginBottom:18, fontFamily:"'DM Sans',sans-serif" }}
        onMouseOver={e=>e.currentTarget.style.color=T.navy} onMouseOut={e=>e.currentTarget.style.color=T.muted}>
        <ArrowLeft size={15}/> All Freelancers
      </button>

      {/* ── Hero ── */}
      <div style={{ background:T.white, borderRadius:16, border:`1px solid ${T.border}`, boxShadow:"0 2px 12px rgba(10,36,68,0.07)", padding:"22px 24px", marginBottom:18, display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <UserAvatar name={f.name} />
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:4 }}>
              <h1 style={{ margin:0, fontSize:20, fontWeight:800, color:T.navy }}>{f.name}</h1>
              <Badge label={f.badge} />
              <StatusBadge status="Active" />
            </div>
            <p style={{ margin:"0 0 8px", fontSize:12, color:T.muted }}>{f.email} · {f.id} · {f.primarySkill}</p>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
              <TrustScore score={f.trustScore} />
              <RiskFlag level={f.riskFlag} />
              <span style={{ fontSize:11, color:T.muted }}>Joined {f.joinDate}</span>
            </div>
          </div>
        </div>
        {/* Actions — always visible */}
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <Btn label="Boost Visibility" icon={Zap}          variant="primary" />
          <Btn label="Send Warning"     icon={AlertTriangle} variant="warning" />
          <Btn label="Suspend"          icon={XCircle}       variant="danger"  />
        </div>
      </div>

      {/* ── Quick stats bar ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:18 }}>
        <MiniStatCard label="Skill Score"     value={`${f.skillScore}/100`} color="#059669" />
        <MiniStatCard label="Active Projects" value={f.activeProjects}      color={T.teal}  />
        <MiniStatCard label="Completed"       value={f.completedProjects}   color={T.navy}  />
        <MiniStatCard label="Dispute Rate"    value={f.disputeRate}         color={parseInt(f.disputeRate)>10?"#ef4444":"#059669"} />
        <MiniStatCard label="On-Time"         value={f.onTimeDelivery}      color={parseInt(f.onTimeDelivery)>=90?"#059669":"#d97706"} />
      </div>

      {/* ── Tabs ── */}
      <div style={{ display:"flex", gap:2, marginBottom:20, background:T.white, borderRadius:12, padding:4, border:`1px solid ${T.border}`, width:"fit-content", boxShadow:"0 1px 4px rgba(10,36,68,0.05)", overflowX:"auto" }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:9,
              fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap",
              background: active ? T.greenTeal : "transparent",
              color: active ? "#fff" : T.muted, border:"none",
              boxShadow: active ? "0 2px 8px rgba(61,220,132,0.25)" : "none",
              transition:"all 0.15s", fontFamily:"'DM Sans',sans-serif",
            }}>
              <Icon size={13}/>{tab.label}
            </button>
          );
        })}
      </div>

      {/* ── PROFILE ── */}
      {activeTab === "profile" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:18, alignItems:"start" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <SectionCard title="Professional Info">
              <InfoRow label="Full Name"    value={f.name}         icon={User}     />
              <InfoRow label="Email"        value={f.email}        icon={Send}     />
              <InfoRow label="Country"      value={f.country}      icon={Globe}    />
              <InfoRow label="Timezone"     value={f.timezone}     icon={Clock}    />
              <InfoRow label="Availability" value={f.availability} icon={Calendar} />
              <InfoRow label="Joined"       value={f.joinDate}     icon={Calendar} />
            </SectionCard>

            <SectionCard title="Bio">
              <p style={{ margin:0, fontSize:13, color:T.textMid, lineHeight:1.7 }}>{f.bio}</p>
            </SectionCard>

            <SectionCard title="Skills">
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {f.skills.map(s => (
                  <span key={s} style={{ fontSize:12, fontWeight:600, color:"#059669", background:"#ecfdf5", border:"1px solid #a7f3d0", padding:"4px 12px", borderRadius:20 }}>{s}</span>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Portfolio Links">
              {f.portfolio.length > 0 ? f.portfolio.map(p => (
                <div key={p} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", background:"#f8faff", borderRadius:8, border:`1px solid ${T.border}`, marginBottom:6 }}>
                  <ExternalLink size={13} color={T.teal}/>
                  <span style={{ fontSize:13, color:T.teal, cursor:"pointer" }}>{p}</span>
                </div>
              )) : <p style={{ textAlign:"center", color:T.muted, fontSize:13, padding:"16px 0" }}>No portfolio links submitted</p>}
            </SectionCard>
          </div>

          {/* Right */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <SectionCard title="Skill Confidence">
              {f.skills.map((skill, i) => {
                const score = Math.max(50, f.skillScore - i*8);
                return (
                  <div key={skill} style={{ marginBottom:i<f.skills.length-1?12:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ fontSize:12, color:T.textMid }}>{skill}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:T.navy }}>{score}</span>
                    </div>
                    <div style={{ height:6, background:T.border, borderRadius:10, overflow:"hidden" }}>
                      <div style={{ width:`${score}%`, height:"100%", background:T.greenTeal, borderRadius:10 }}/>
                    </div>
                  </div>
                );
              })}
            </SectionCard>

            <SectionCard title="Visibility Control">
              {["Boosted","Normal","Reduced","Hidden"].map(v => {
                const m = visMeta[v];
                const active = currentVis === v;
                return (
                  <button key={v} onClick={() => setVisibility(v)} style={{
                    width:"100%", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"9px 12px", borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer",
                    background: active ? m.bg : T.white,
                    color: active ? m.color : T.muted,
                    border: active ? `1.5px solid ${m.color}44` : `1px solid ${T.border}`,
                    marginBottom:6, transition:"all 0.15s",
                    fontFamily:"'DM Sans',sans-serif",
                  }}>
                    {v}
                    {active && <CheckCircle size={14} color={m.color}/>}
                  </button>
                );
              })}
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── PERFORMANCE ── */}
      {activeTab === "performance" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
          <SectionCard title="Performance Metrics">
            {[
              { label:"Response Time Average", value:f.responseTime },
              { label:"On-Time Delivery",       value:f.onTimeDelivery },
              { label:"Dispute Rate",           value:f.disputeRate },
              { label:"Repeat Hire Rate",       value:f.repeatHireRate },
              { label:"Client Sentiment Score", value:`${f.clientSentiment}/5.0` },
            ].map(m => (
              <div key={m.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${T.border}` }}>
                <span style={{ fontSize:13, color:T.muted }}>{m.label}</span>
                <span style={{ fontSize:13, fontWeight:700, color:T.navy }}>{m.value}</span>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="AI Behavior Analysis">
            {[
              { label:"Communication Tone",   status:"Professional", ok:true  },
              { label:"Activity Consistency", status:f.riskFlag==="High"?"Irregular":"Consistent", ok:f.riskFlag!=="High" },
              { label:"Risk Trajectory",      status:f.riskFlag==="High"?"Deteriorating":"Stable",  ok:f.riskFlag!=="High" },
              { label:"Delivery Velocity",    status:"Normal", ok:true },
            ].map(a => (
              <div key={a.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", background:"#f8faff", borderRadius:9, border:`1px solid ${T.border}`, marginBottom:8 }}>
                <span style={{ fontSize:12, color:T.muted }}>{a.label}</span>
                <span style={{ fontSize:12, fontWeight:700, color:a.ok?"#059669":"#ef4444" }}>{a.status}</span>
              </div>
            ))}
          </SectionCard>
        </div>
      )}

      {/* ── PROJECTS ── */}
      {activeTab === "projects" && (
        <SectionCard title="Project History">
          {[
            { name:"Food Delivery App",    client:"ByteEats Co.",       status:"In Progress", amount:"₹2,40,000", duration:"12 weeks" },
            { name:"E-Commerce Dashboard", client:"ShopEasy Retail",    status:"Completed",   amount:"₹1,85,000", duration:"8 weeks"  },
            { name:"Healthcare Portal",    client:"HealthFirst Clinic",  status:"Completed",   amount:"₹3,20,000", duration:"16 weeks" },
          ].map((p, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px", background:"#f8faff", borderRadius:10, border:`1px solid ${T.border}`, marginBottom:8, cursor:"pointer" }}
              onMouseOver={e=>e.currentTarget.style.background="#f0f4ff"} onMouseOut={e=>e.currentTarget.style.background="#f8faff"}>
              <div>
                <p style={{ margin:"0 0 3px", fontSize:13, fontWeight:700, color:T.navy }}>{p.name}</p>
                <p style={{ margin:0, fontSize:11, color:T.muted }}>{p.client} · {p.duration}</p>
              </div>
              <div style={{ textAlign:"right", display:"flex", alignItems:"center", gap:10 }}>
                <div>
                  <StatusBadge status={p.status}/>
                  <p style={{ margin:"4px 0 0", fontSize:13, fontWeight:700, color:T.navy }}>{p.amount}</p>
                </div>
                <ChevronRight size={14} color={T.muted}/>
              </div>
            </div>
          ))}
        </SectionCard>
      )}

      {/* ── FINANCIALS ── */}
      {activeTab === "financials" && (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <SectionCard title="Financial Overview" action={<Btn label="Export CSV" icon={Download} size="sm" onClick={exportFinancials}/>}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
              {[
                { label:"Total Earned",    value:`₹${f.totalEarned.toLocaleString()}`, color:"#059669" },
                { label:"Escrow Pending",  value:"₹45,000",  color:"#d97706" },
                { label:"Withdrawn",       value:"₹1,20,000", color:T.teal  },
              ].map(s => (
                <div key={s.label} style={{ padding:"16px", background:"#f8faff", borderRadius:12, border:`1px solid ${T.border}` }}>
                  <p style={{ margin:"0 0 4px", fontSize:11, color:T.muted, fontWeight:600, textTransform:"uppercase", letterSpacing:0.6 }}>{s.label}</p>
                  <p style={{ margin:0, fontSize:24, fontWeight:800, color:s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Transaction History">
            <p style={{ textAlign:"center", color:T.muted, fontSize:13, padding:"32px 0" }}>No transaction data available in demo</p>
          </SectionCard>
        </div>
      )}

      {/* ── BEHAVIOR ── */}
      {activeTab === "behavior" && (
        <SectionCard title="AI Behavior Report">
          <div style={{ padding:"14px 16px", background:f.riskFlag==="High"?"#fef2f2":"#f0fdf4", borderRadius:12, border:`1px solid ${f.riskFlag==="High"?"#fecaca":"#a7f3d0"}`, marginBottom:16 }}>
            <p style={{ margin:"0 0 4px", fontSize:13, fontWeight:700, color:f.riskFlag==="High"?"#991b1b":"#14532d" }}>Overall Assessment</p>
            <p style={{ margin:0, fontSize:13, color:f.riskFlag==="High"?"#b91c1c":"#15803d", lineHeight:1.6 }}>
              {f.riskFlag==="High"
                ? "This freelancer shows consistent underperformance. High dispute rate and low delivery scores suggest misrepresentation of skills or capacity overcommitment."
                : "This freelancer demonstrates consistent professional behavior. Communication is positive and delivery performance is strong."}
            </p>
          </div>
          <InfoRow label="Communication Tone"  value="Professional" />
          <InfoRow label="Scope Compliance"    value="High" />
          <InfoRow label="Client Relations"    value={f.clientSentiment>=4?"Excellent":f.clientSentiment>=3?"Average":"Poor"} />
          <InfoRow label="Platform Policy"     value="No violations detected" />
        </SectionCard>
      )}

      {/* ── ADMIN ── */}
      {activeTab === "admin" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, alignItems:"start" }}>
          <SectionCard title="Admin Control Panel">
            {[
              { label:"Override Trust Score",         icon:RefreshCw,      variant:"default", desc:"Manually adjust trust score with reason" },
              { label:"Force Skill Re-verification",  icon:ShieldCheck,    variant:"default", desc:"Require re-submission of skill proofs"    },
              { label:"Boost / Reduce Visibility",    icon:Eye,            variant:"default", desc:"Change search & listing visibility"       },
              { label:"Send Private Warning",          icon:MessageSquare,  variant:"warning", desc:"Send official warning visible to user"    },
              { label:"Suspend Account",               icon:XCircle,        variant:"danger",  desc:"Freeze all activity and payments"         },
            ].map(a => {
              const Icon = a.icon;
              return (
                <div key={a.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:10, border:`1px solid ${T.border}`, background:"#f8faff", marginBottom:8, transition:"background 0.12s" }}
                  onMouseOver={e=>e.currentTarget.style.background="#f0f4ff"} onMouseOut={e=>e.currentTarget.style.background="#f8faff"}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                    <Icon size={14} color={a.variant==="danger"?"#ef4444":a.variant==="warning"?"#f59e0b":T.teal} style={{ marginTop:2, flexShrink:0 }}/>
                    <div>
                      <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:600, color:T.navy }}>{a.label}</p>
                      <p style={{ margin:0, fontSize:11, color:T.muted }}>{a.desc}</p>
                    </div>
                  </div>
                  <Btn label="Execute" variant={a.variant} size="sm"/>
                </div>
              );
            })}
          </SectionCard>

          <SectionCard title="Admin Notes (Internal)">
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
              {notes.length===0
                ? <p style={{ textAlign:"center", color:T.muted, fontSize:12, padding:"12px 0" }}>No notes yet</p>
                : notes.map((n,i) => (
                  <div key={i} style={{ padding:"10px 12px", background:"#f8faff", borderRadius:10, border:`1px solid ${T.border}` }}>
                    <p style={{ margin:"0 0 4px", fontSize:12, color:T.navy }}>{n.text}</p>
                    <p style={{ margin:0, fontSize:10, color:T.muted }}>{n.admin} · {n.date}</p>
                  </div>
                ))}
            </div>
            <textarea value={note} onChange={e=>setNote(e.target.value)}
              placeholder="Add internal note (not visible to freelancer)…"
              style={{ width:"100%", fontSize:12, border:`1px solid ${T.border}`, borderRadius:10, padding:"10px 12px", resize:"none", outline:"none", color:T.navy, background:"#f8faff", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}
              rows={3}
              onFocus={e=>e.target.style.borderColor=T.teal}
              onBlur={e=>e.target.style.borderColor=T.border}
            />
            <Btn label="Save Note" icon={Send} variant="primary" size="sm" onClick={addNote}/>
          </SectionCard>
        </div>
      )}
    </div>
  );
}