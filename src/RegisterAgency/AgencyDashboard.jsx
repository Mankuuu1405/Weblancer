import { useState } from "react";

const stats = [
  { icon: "💼", value: "2",     label: "Active Projects", bg: "bg-blue-50",   iconColor: "text-blue-500"   },
  { icon: "👥", value: "5",     label: "Team Members",    bg: "bg-green-50",  iconColor: "text-green-500"  },
  { icon: "$",  value: "$105K", label: "Total Revenue",   bg: "bg-yellow-50", iconColor: "text-yellow-500" },
  { icon: "★",  value: "86",    label: "Trust Score",     bg: "bg-purple-50", iconColor: "text-purple-500" },
];

const tabs = ["Overview", "AI Score", "Team", "Projects", "Proposals", "Finance", "Analytics"];

const teamMembers = [
  { name: "Raj Kumar", role: "ADMIN",     roleColor: "bg-red-100 text-red-500",     initial: "R", bg: "bg-red-100"    },
  { name: "Sara M.",   role: "DEVELOPER", roleColor: "bg-blue-100 text-blue-600",   initial: "S", bg: "bg-blue-100"   },
  { name: "Dev Mike",  role: "DEVELOPER", roleColor: "bg-blue-100 text-blue-600",   initial: "D", bg: "bg-blue-100"   },
  { name: "Priya S.",  role: "DESIGNER",  roleColor: "bg-purple-100 text-purple-600",initial:"P", bg: "bg-purple-100" },
  { name: "James L.",  role: "DEVOPS",    roleColor: "bg-gray-100 text-gray-600",   initial: "J", bg: "bg-gray-100"   },
];

const projects = [
  { name: "Food Delivery App",    client: "ByteEats Co.", budget: "$42K", progress: 65, status: "ON TRACK" },
  { name: "E-commerce Platform",  client: "GlobalShop",   budget: "$28K", progress: 30, status: "ON TRACK" },
];

const fullTeamMembers = [
  { name:"Raj Kumar", initial:"R", bg:"bg-blue-100", initColor:"text-blue-600", title:"Agency Admin · Full Stack Developer", status:"AVAILABLE", statusColor:"text-green-600 bg-green-50 border-green-200", skills:[{name:"React",score:84,dot:"bg-green-500"},{name:"Node",score:71,dot:"bg-green-500"},{name:"AWS",score:68,dot:"bg-blue-500"}], hours:"40h/week", project:null, workload:null },
  { name:"Sara M.",   initial:"S", bg:"bg-blue-100", initColor:"text-blue-600", title:"Developer · Frontend Specialist",       status:"AVAILABLE", statusColor:"text-green-600 bg-green-50 border-green-200", skills:[{name:"React",score:92,dot:"bg-purple-500"},{name:"TypeScript",score:78,dot:"bg-blue-500"},{name:"Figma",score:65,dot:"bg-green-500"}], hours:"30h/week", project:null, workload:null },
  { name:"Dev Mike",  initial:"D", bg:"bg-blue-100", initColor:"text-blue-600", title:"Developer · Backend Engineer",           status:"ON PROJECT",statusColor:"text-blue-600 bg-blue-50 border-blue-200",   skills:[{name:"Node",score:88,dot:"bg-green-500"},{name:"PostgreSQL",score:78,dot:"bg-blue-500"}], hours:"40h/week", project:"Food Delivery App (30h/week)", freeCapacity:"10h/week", workload:65, workloadLabel:"Medium", workloadColor:"text-yellow-500" },
  { name:"Priya S.",  initial:"P", bg:"bg-purple-100",initColor:"text-purple-600",title:"Designer · UI/UX Designer",            status:"AVAILABLE", statusColor:"text-green-600 bg-green-50 border-green-200", skills:[{name:"Figma",score:95,dot:"bg-purple-500"},{name:"Adobe XD",score:82,dot:"bg-blue-500"}], hours:"35h/week", project:null, workload:null },
  { name:"James L.",  initial:"J", bg:"bg-gray-100",  initColor:"text-gray-600",  title:"Developer · DevOps Engineer",          status:"ON PROJECT",statusColor:"text-blue-600 bg-blue-50 border-blue-200",   skills:[{name:"AWS",score:80,dot:"bg-blue-500"},{name:"Docker",score:72,dot:"bg-green-500"},{name:"K8s",score:60,dot:"bg-green-500"}], hours:"40h/week", project:"E-commerce Platform (40h/week)", freeCapacity:"0h/week", workload:95, workloadLabel:"High", workloadColor:"text-red-500" },
];

// SVG Icons
const CheckCircleIcon = () => (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="#10b981" strokeWidth="1.5" fill="none"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const EditIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.333 2a1.886 1.886 0 012.667 2.667L4.667 14H2v-2.667L11.333 2z" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const TrashIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.333 4V2.667a.667.667 0 01.667-.667h4a.667.667 0 01.667.667V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333A.667.667 0 004.667 14h6.666a.667.667 0 00.667-.667L12.667 4" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const ShieldIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.333L2.667 3.667v4C2.667 10.6 5.04 13.24 8 14c2.96-.76 5.333-3.4 5.333-6.333v-4L8 1.333z" stroke="#60a5fa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const ClockIcon = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#9ca3af" strokeWidth="1.2"/><path d="M6.5 3.5v3l2 1.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/></svg>);
const ActivityIcon = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><polyline points="1,7 3.5,4 6,7 8.5,2 11,5.5 13,4" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const PersonAddIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.667 14v-1.333A2.667 2.667 0 008 10H3.333a2.667 2.667 0 00-2.666 2.667V14" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="5.667" cy="5.333" r="2.667" stroke="white" strokeWidth="1.3"/><path d="M13.333 5.333v4M11.333 7.333h4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>);
const EnvelopeIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.333" y="3.333" width="13.333" height="9.333" rx="1.333" stroke="#f59e0b" strokeWidth="1.3"/><path d="M1.333 5.333L8 9l6.667-3.667" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round"/></svg>);

function TeamManagementTab() {
  const [showPermissions, setShowPermissions] = useState(false);
  const [showInviteForm,  setShowInviteForm]  = useState(false);
  const [inviteEmail,     setInviteEmail]     = useState("");
  const [inviteRole,      setInviteRole]      = useState("Developer");
  const [roleDropdownOpen,setRoleDropdownOpen]= useState(false);
  const roles = ["Developer","Designer","Project Manager","QA","Finance"];

  const permissionsData = [
    { permission:"View client chat",    cols:[true,true,true,true,false,false] },
    { permission:"Send client message", cols:[true,true,false,false,false,false] },
    { permission:"Submit milestone",    cols:[true,true,true,true,true,false] },
    { permission:"View financials",     cols:[true,false,false,false,false,true] },
    { permission:"Add team members",    cols:[true,false,false,false,false,false] },
    { permission:"Accept invitations",  cols:[true,false,false,false,false,false] },
  ];
  const permissionRoles = ["Admin","PM","Developer","Designer","QA","Finance"];

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-gray-900 flex items-center gap-2 text-base">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 11.25H6A3.75 3.75 0 002.25 15v.75h13.5V15A3.75 3.75 0 0012 11.25zM9 9a3 3 0 100-6 3 3 0 000 6z" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 6.75v3M13.5 8.25h3" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Team Management
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">5 active · 1 pending invitation</p>
        </div>
        <button onClick={() => setShowInviteForm(!showInviteForm)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors self-start sm:self-auto">
          <PersonAddIcon /> Invite Member
        </button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <div className="border border-gray-200 rounded-xl p-5 bg-white">
          <p className="text-sm font-semibold text-gray-800 mb-4">Invite New Team Member</p>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="flex-1 w-full">
              <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)}
                placeholder="team-member@yourcompany.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400" />
              <p className="text-xs text-gray-400 mt-1.5">Member will create their own ArcLancer account and join with the assigned role.</p>
            </div>
            <div className="relative">
              <button onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-white hover:bg-gray-50 min-w-[130px] justify-between">
                {inviteRole}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {roleDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[160px] py-1">
                  {roles.map(r => (
                    <button key={r} onClick={() => { setInviteRole(r); setRoleDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${inviteRole === r ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
              <EnvelopeIcon /> Send Invite
            </button>
          </div>
        </div>
      )}

      {/* Pending Invitation */}
      <div className="border border-gray-200 rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <EnvelopeIcon />
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
          <span className="text-sm text-gray-600">Pending: jane@techvision.com</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-gray-300 text-gray-700 text-xs font-medium px-3.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Resend</button>
          <button className="text-red-500 text-xs font-medium px-2 py-1.5 hover:text-red-600 transition-colors">Cancel</button>
        </div>
      </div>

      {/* Team Member Cards */}
      {fullTeamMembers.map((m, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-full ${m.bg} flex items-center justify-center text-sm font-bold ${m.initColor} flex-shrink-0`}>{m.initial}</div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 text-sm">{m.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{m.title}</div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {m.skills.map((s, si) => (
                    <span key={si} className="flex items-center gap-1 bg-white border border-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                      {s.name}<span className={`w-2 h-2 rounded-full ${s.dot} inline-block ml-0.5`}></span>
                      <span className="text-gray-500 font-medium">{s.score}/100</span>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500"><ClockIcon /> {m.hours}</span>
                  {m.project && (
                    <>
                      <span className="flex items-center gap-1 text-xs text-gray-500 max-w-[200px] truncate"><ActivityIcon /> On: {m.project}</span>
                      <span className="text-xs text-blue-500 font-medium">Free: {m.freeCapacity}</span>
                    </>
                  )}
                </div>
                {m.workload !== null && (
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs text-gray-500">Workload:</span>
                    <div className="w-28 bg-gray-100 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width:`${m.workload}%` }} />
                    </div>
                    <span className={`text-xs font-semibold flex items-center gap-1 ${m.workloadColor}`}>
                      <span className={`w-2 h-2 rounded-full inline-block ${m.workloadLabel==="Medium"?"bg-yellow-400":"bg-red-500"}`}></span>
                      {m.workloadLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
              <span className={`text-xs font-semibold border px-3 py-1 rounded-full whitespace-nowrap ${m.statusColor}`}>{m.status}</span>
              <div className="flex gap-1">
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"><EditIcon /></button>
                {i !== 0 && <button className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"><TrashIcon /></button>}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Permissions Matrix */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button onClick={() => setShowPermissions(!showPermissions)}
          className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
          <span className="flex items-center gap-2"><ShieldIcon /> Role Permissions Matrix</span>
          <span className="text-gray-500 text-sm font-medium flex items-center gap-1">
            {showPermissions ? <>Hide <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 8l4-4 4 4" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></> : <>Show <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></>}
          </span>
        </button>
        {showPermissions && (
          <div className="border-t border-gray-100 px-4 sm:px-6 py-5 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Permission</th>
                  {permissionRoles.map(r => <th key={r} className="text-center py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {permissionsData.map((row, i) => (
                  <tr key={i} className={i < permissionsData.length-1 ? "border-b border-gray-50" : ""}>
                    <td className="py-3.5 pr-4 text-sm text-gray-700 whitespace-nowrap">{row.permission}</td>
                    {row.cols.map((v, vi) => (
                      <td key={vi} className="text-center py-3.5 px-3">
                        {v ? <span className="flex justify-center"><CheckCircleIcon /></span> : <span className="text-gray-300 text-base font-light">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const skills = [
  { name:"Mobile Development", score:96, status:"green" },
  { name:"Web Frontend",       score:89, status:"green" },
  { name:"Backend / API",      score:84, status:"green" },
  { name:"UI/UX Design",       score:62, status:"yellow" },
  { name:"DevOps / Cloud",     score:55, status:"yellow" },
  { name:"AI/ML",              score:28, status:"yellow" },
];

function CapabilityScoreTab() {
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2"><span className="text-blue-500">🤖</span> Agency Capability Score</h3>
            <p className="text-sm text-gray-400 mt-0.5">TechVision Software Solutions</p>
          </div>
          <div className="sm:text-right">
            <div className="text-2xl font-bold text-blue-500">87<span className="text-gray-400 text-base font-normal">/100</span></div>
            <div className="text-xs font-semibold text-green-600 mt-0.5">ENTERPRISE-READY</div>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:"87%"}} /></div>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-5">Skill Coverage Breakdown</h3>
        <div className="flex flex-col gap-4">
          {skills.map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-700">{s.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-600 font-medium">{s.score}/100</span>
                  {s.status==="green" ? <span className="text-green-500">✅</span> : <span className="text-yellow-500">⚠️</span>}
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width:`${s.score}%`}} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon:"📈", title:"High (8 areas)",  sub:"Skill Diversity · Broad coverage" },
          { icon:"👥", title:"Strong",           sub:"Skill Depth · 3 members 80+ scores" },
          { icon:"✅", title:"8 verified",       sub:"Team Strength · All skills confirmed" },
        ].map((c, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-4">
            <span className="text-lg">{c.icon}</span>
            <div className="font-semibold text-gray-900 text-sm mt-2">{c.title}</div>
            <div className="text-xs text-gray-400 mt-0.5">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="border border-blue-100 bg-blue-50 rounded-xl p-5">
        <div className="flex items-center gap-2 font-semibold text-gray-900 mb-2"><span className="text-blue-500">🤖</span> AI Suggestion</div>
        <p className="text-sm text-gray-600">Adding a DevOps specialist could increase your capability score by <span className="text-blue-500 font-semibold">12 points</span> and unlock enterprise cloud project invitations.</p>
        <button className="mt-3 border border-gray-300 bg-white text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">→ Invite DevOps Member</button>
      </div>
    </div>
  );
}

function DeliveryRiskTab() {
  const riskItems = [
    { text:"Team capacity: 65% utilized (healthy)",                    type:"green"  },
    { text:"2 team members on multiple projects simultaneously",       type:"yellow" },
    { text:"1 deadline in next 10 days (tight window)",                type:"yellow" },
    { text:"Past delivery rate: 96% on-time",                         type:"green"  },
    { text:"No active disputes",                                       type:"green"  },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2"><span className="text-yellow-500">⚠️</span> Delivery Risk Assessment</h3>
          <span className="border border-yellow-400 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">MEDIUM</span>
        </div>
        <div className="flex flex-col gap-3">
          {riskItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              {item.type==="green" ? <span className="text-green-500 text-base flex-shrink-0">✅</span> : <span className="text-yellow-500 text-base flex-shrink-0">⚠️</span>}
              <span className="text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Impact</h3>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">New project invites: <span className="text-yellow-500 font-semibold">Slightly reduced</span> <span className="text-gray-400">(medium risk)</span></p>
          <p className="text-sm text-gray-600">Max new project size: <span className="text-gray-800 font-medium">$25,000</span> <span className="text-gray-400">(temporarily limited)</span></p>
        </div>
      </div>
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Improve Risk Score</h3>
        <div className="flex flex-col gap-2.5">
          {["Completing Milestone 2 (Food App) by May 20","Freeing Dev Mike from current project","Marking 2 team members as available"].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-blue-400 text-sm flex-shrink-0">🕐</span>
              <span className="text-sm text-blue-500">{item}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-5">
          <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">View Team Workload</button>
          <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Reassign Tasks</button>
        </div>
      </div>
    </div>
  );
}

function ProjectsTab() {
  const [projectSubTab, setProjectSubTab] = useState("Task Board");

  const milestones = [
    { id:"M1", label:"M1: Architecture",  amount:"$4,200",  status:"done"       },
    { id:"M2", label:"M2: Core Features", amount:"$8,400",  status:"inprogress", pct:"55%" },
    { id:"M3", label:"M3: Advanced",      amount:"$5,040",  status:"pending"    },
    { id:"M4", label:"M4: Launch",        amount:"$2,360",  status:"pending"    },
  ];
  const taskColumns = [
    { label:"TO DO",       count:2, tasks:[{title:"Cart system",assigned:"Sara M.",priority:"medium",priorityColor:"text-yellow-500",est:"8h"},{title:"Checkout flow",assigned:"Dev Mike",priority:"high",priorityColor:"text-red-500",est:"12h"}] },
    { label:"IN PROGRESS", count:1, tasks:[{title:"Product search API",assigned:"Sara M.",due:"May 15",priority:"high",priorityColor:"text-red-500",est:"12h"}] },
    { label:"IN REVIEW",   count:1, tasks:[{title:"User auth",assigned:"Dev Mike",priority:"medium",priorityColor:"text-yellow-500",reviewer:"Raj Kumar",est:"6h"}] },
    { label:"DONE",        count:3, tasks:[{title:"DB schema",assigned:"Dev Mike",est:"4h"},{title:"Auth endpoints",assigned:"Dev Mike",est:"8h"},{title:"Category API",assigned:"Sara M.",est:"6h"}] },
  ];
  const workloadMembers = [
    { name:"Raj Kumar", pct:95, label:"Overloaded", labelColor:"text-red-500",   dotColor:"bg-red-500"   },
    { name:"Sara M.",   pct:62, label:"Healthy",    labelColor:"text-green-500", dotColor:"bg-green-500" },
    { name:"Dev Mike",  pct:88, label:"High",       labelColor:"text-yellow-500",dotColor:"bg-yellow-400"},
    { name:"UI Priya",  pct:22, label:"Available",  labelColor:"text-green-500", dotColor:"bg-green-500" },
  ];
  const delegations = [
    { task:'"Code review for Auth"',      to:'Sara M. (free capacity)' },
    { task:'"API documentation"',         to:'UI Priya (22% load)'    },
    { task:'"Database optimization"',     to:'Dev Mike (can absorb)'  },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="border border-gray-200 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">E-commerce Platform</h2>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">Client: GlobalShop
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="#10b981" strokeWidth="1.2"/><path d="M4.5 7.5l2 2 4-4" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">IN PROGRESS</span>
            <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> LOW RISK
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
          <span>Budget: $20,000</span><span>Released: $4,200</span><span>Remaining: $15,800</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-sm text-blue-500 mb-5">
          <span>Raj Kumar (Lead)</span><span className="text-gray-400">·</span>
          <span>Sara M. (Frontend)</span><span className="text-gray-400">·</span>
          <span>Dev Mike (Back)</span>
        </div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Milestones</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {milestones.map(m => (
            <div key={m.id} className={`rounded-lg border p-4 text-center ${m.status==="done"?"border-green-200 bg-green-50":m.status==="inprogress"?"border-blue-300 bg-white":"border-gray-200 bg-white"}`}>
              <div className={`text-xs font-semibold ${m.status==="inprogress"?"text-blue-700":"text-gray-800"}`}>{m.label}</div>
              <div className={`text-xs mt-1 ${m.status==="inprogress"?"text-blue-500":"text-gray-400"}`}>{m.amount}</div>
              {m.status==="done" && <div className="flex justify-center mt-2"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="#10b981" strokeWidth="1.4"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
              {m.status==="inprogress" && <div className="text-blue-500 font-bold text-sm mt-1">{m.pct}</div>}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[{label:"Open ProjectStream"},{label:"Submit M2"},{label:"Message Client"}].map((btn,i) => (
            <button key={i} className="border border-gray-200 text-gray-700 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">{btn.label}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {["Task Board","AI Workload"].map(t => (
          <button key={t} onClick={() => setProjectSubTab(t)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${projectSubTab===t?"bg-white border-gray-300 text-gray-900 font-semibold shadow-sm":"border-transparent text-gray-500 hover:text-gray-700"}`}>
            {t}
          </button>
        ))}
      </div>

      {projectSubTab==="Task Board" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {taskColumns.map((col, ci) => (
            <div key={ci}>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-3">{col.label} ({col.count})</div>
              <div className="flex flex-col gap-3">
                {col.tasks.map((task, ti) => (
                  <div key={ti} className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-semibold text-gray-900 text-sm mb-1">{task.title}</div>
                    <div className="text-xs text-gray-500 mb-1">Assigned: {task.assigned}</div>
                    {task.due && <div className="text-xs text-gray-400 mb-1">Due: {task.due}</div>}
                    {task.priority && <div className={`text-xs font-medium ${task.priorityColor} mb-1`}>{task.priority}</div>}
                    {task.reviewer && <div className="text-xs text-gray-400 mb-1">Reviewer: {task.reviewer}</div>}
                    <div className="text-xs text-gray-400">Est: {task.est}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {projectSubTab==="AI Workload" && (
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-5">AI Workload Analysis — This Week</h3>
            <div className="flex flex-col gap-5">
              {workloadMembers.map((w, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-800 font-medium">{w.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-bold ${w.labelColor}`}>{w.pct}%</span>
                      <span className={`w-2.5 h-2.5 rounded-full ${w.dotColor} inline-block`}></span>
                      <span className={`text-sm font-semibold ${w.labelColor}`}>{w.label}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:`${w.pct}%`}} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span>⚠️</span> AI Recommendation</h3>
            <p className="text-sm text-gray-600 mb-4">Raj Kumar is overloaded. 3 tasks can be delegated:</p>
            <div className="flex flex-col gap-2.5 mb-5">
              {delegations.map((d, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-wrap items-center gap-2 text-sm">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#10b981" strokeWidth="1.3"/><path d="M5 8l2 2 4-4" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-medium text-gray-800">{d.task}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-600">{d.to}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg border-2 border-blue-500 transition-colors">Apply AI Suggestions</button>
              <button className="border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Reassign Manually</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProposalsTab() {
  const [aiMode, setAiMode] = useState(true);
  const [openSections, setOpenSections] = useState({1:true,2:true,3:true,4:true});
  const [coverLetter, setCoverLetter] = useState("We at TechVision are excited about your e-commerce project. Our team has delivered 8 similar platforms, including ByteEats (10K+ users) and FashionHub. We propose a milestone-based approach ensuring quality delivery at every stage.");
  const [timelineMilestones, setTimelineMilestones] = useState([
    {id:1,label:"Architecture & Design",weeks:3,cost:4200},
    {id:2,label:"Core Features",weeks:6,cost:8400},
    {id:3,label:"Advanced Features",weeks:3,cost:5040},
    {id:4,label:"Testing & Launch",weeks:2,cost:2360},
  ]);
  const teamAllocation = [
    {initial:"R",bg:"bg-blue-100",color:"text-blue-600",name:"Raj Kumar",role:"Lead / Full Stack",hours:"30h/week"},
    {initial:"S",bg:"bg-blue-100",color:"text-blue-600",name:"Sara M.",role:"Frontend",hours:"25h/week"},
    {initial:"D",bg:"bg-blue-100",color:"text-blue-600",name:"Dev Mike",role:"Backend",hours:"30h/week"},
  ];
  const totalWeeks = timelineMilestones.reduce((s,m) => s+Number(m.weeks),0);
  const totalCost  = timelineMilestones.reduce((s,m) => s+Number(m.cost),0);
  const toggleSection = n => setOpenSections(prev => ({...prev,[n]:!prev[n]}));
  const updateMilestone = (id,field,value) => setTimelineMilestones(prev => prev.map(m => m.id===id?{...m,[field]:value}:m));
  const deleteMilestone = id => setTimelineMilestones(prev => prev.filter(m => m.id!==id));
  const addMilestone = () => setTimelineMilestones(prev => [...prev,{id:Date.now(),label:"New Milestone",weeks:1,cost:0}]);
  const sectionBadge = (label, color) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{label}</span>;
  const ChevronUp   = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 10l4-4 4 4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const ChevronDown = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const TrashSmall  = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.75 3.5h10.5M4.667 3.5V2.333a.583.583 0 01.583-.583h3.5a.583.583 0 01.583.583V3.5M5.833 6.417v3.5M8.167 6.417v3.5M2.917 3.5l.583 8.167a.583.583 0 00.583.583h5.834a.583.583 0 00.583-.583L11.083 3.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-bold text-gray-900 text-base">Build Your Proposal</h2>
            <p className="text-xs text-gray-400 mt-1">E-commerce Platform · Client: GlobalShop Ltd. · Budget: $15,000–$25,000</p>
          </div>
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-lg">V1</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button onClick={() => setAiMode(true)} className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${aiMode?"bg-blue-500 text-white border-blue-500":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-3 1.5.5-3.5L2 4.5l3.5-.5L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Load AI Draft
          </button>
          <button onClick={() => setAiMode(false)} className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${!aiMode?"bg-blue-500 text-white border-blue-500":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>Start from Scratch</button>
        </div>
      </div>

      {[1,2,3,4].map(sNum => (
        <div key={sNum} className="border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => toggleSection(sNum)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 text-xs font-bold flex items-center justify-center flex-shrink-0">{sNum}</span>
              <span className="font-semibold text-gray-900 text-sm">{["Cover Letter","Proposed Timeline","Team Allocation","Cost Breakdown"][sNum-1]}</span>
              {aiMode && sectionBadge(["AI WROTE THIS","AI GENERATED","AI SUGGESTED","AI CALCULATED"][sNum-1],"bg-purple-100 text-purple-600")}
            </div>
            {openSections[sNum] ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSections[sNum] && (
            <div className="border-t border-gray-100 px-5 py-4">
              {sNum===1 && <textarea className="w-full mt-1 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[120px] bg-white" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} />}
              {sNum===2 && (
                <>
                  <div className="flex flex-col gap-3">
                    {timelineMilestones.map((m, i) => (
                      <div key={m.id} className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-lg px-3 py-3">
                        <span className="text-xs font-bold text-blue-500 w-6 flex-shrink-0">M{i+1}</span>
                        <input className="flex-1 min-w-[120px] border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none bg-gray-50" value={m.label} onChange={e => updateMilestone(m.id,"label",e.target.value)} />
                        <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-2 bg-gray-50">
                          <input className="w-8 text-sm text-gray-700 text-center focus:outline-none bg-transparent" type="number" min="1" value={m.weeks} onChange={e => updateMilestone(m.id,"weeks",e.target.value)} />
                          <span className="text-xs text-gray-400">wk</span>
                        </div>
                        <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-2 bg-gray-50">
                          <span className="text-gray-400 text-sm">$</span>
                          <input className="w-16 text-sm text-gray-700 text-right focus:outline-none bg-transparent" type="number" value={m.cost} onChange={e => updateMilestone(m.id,"cost",e.target.value)} />
                        </div>
                        <button onClick={() => deleteMilestone(m.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><TrashSmall /></button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                    <button onClick={addMilestone} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors font-medium">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> Add Milestone
                    </button>
                    <span className="text-sm text-gray-500">Total: <span className="font-bold text-gray-900">{totalWeeks} weeks</span> · <span className="font-bold text-gray-900">${totalCost.toLocaleString()}</span></span>
                  </div>
                </>
              )}
              {sNum===3 && (
                <div className="flex flex-col gap-3">
                  {teamAllocation.map((m, i) => (
                    <div key={i} className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${m.bg} flex items-center justify-center text-xs font-bold ${m.color}`}>{m.initial}</div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                          <div className="text-xs text-gray-400">{m.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{m.hours}</span>
                        <button className="text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {sNum===4 && (
                <div className="flex flex-col">
                  {timelineMilestones.map((m, i) => {
                    const pct = totalCost > 0 ? Math.round((m.cost/totalCost)*100) : 0;
                    return (
                      <div key={m.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-700">M{i+1}: {m.label}</span>
                        <span className="text-sm text-gray-700 font-medium">${Number(m.cost).toLocaleString()} ({pct}%)</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-sm font-bold text-gray-900">Total</span>
                    <span className="text-sm font-bold text-blue-500">${totalCost.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 z-30">
        <span className="text-xs text-gray-400">Version: v1</span>
        <div className="flex items-center gap-2">
          <button className="border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Save Draft</button>
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Submit Proposal</button>
        </div>
      </div>
    </div>
  );
}

function RevenueChart() {
  const data = [{month:"Sep",val:8200},{month:"Oct",val:9100},{month:"Nov",val:11400},{month:"Dec",val:14200},{month:"Jan",val:12800},{month:"Feb",val:11200}];
  const W=900,H=160,PAD=30,minV=0,maxV=16000;
  const xs = data.map((_,i) => PAD+(i/(data.length-1))*(W-PAD*2));
  const ys = data.map(d  => H-PAD-((d.val-minV)/(maxV-minV))*(H-PAD*2));
  const linePath = xs.map((x,i) => `${i===0?"M":"L"}${x},${ys[i]}`).join(" ");
  const areaPath = `${linePath} L${xs[xs.length-1]},${H-PAD} L${xs[0]},${H-PAD} Z`;
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H+40}`} className="w-full" style={{minWidth:320}}>
        <defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient></defs>
        <path d={areaPath} fill="url(#chartGrad)"/>
        <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {data.map((d,i) => (<g key={i}><circle cx={xs[i]} cy={ys[i]} r="4" fill="#3b82f6"/><text x={xs[i]} y={ys[i]-12} textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="sans-serif">${(d.val/1000).toFixed(1)}K</text><text x={xs[i]} y={H+15} textAnchor="middle" fontSize="11" fill="#9ca3af" fontFamily="sans-serif">{d.month}</text></g>))}
      </svg>
    </div>
  );
}

function FinanceTab() {
  const [distMode, setDistMode] = useState("Percentage-Based");
  const financeStats = [
    {icon:"💚",bg:"bg-green-50", value:"$35,800",label:"Total in Escrow"},
    {icon:"📈",bg:"bg-blue-50",  value:"$12,400",label:"Available to Payout"},
    {icon:"🧳",bg:"bg-orange-50",value:"$1,488", label:"Platform Fee (Month)"},
    {icon:"💜",bg:"bg-purple-50",value:"$11,200",label:"Revenue This Month"},
  ];
  const escrowProjects = [
    {name:"E-commerce (GlobalShop)",milestone:"M2 active",amount:"$15,800"},
    {name:"Food App (ByteEats)",    milestone:"M3 active",amount:"$12,600"},
    {name:"Logo Package (StartupX)",milestone:"M1 active",amount:"$7,400"},
  ];
  const members = [
    {initial:"R",bg:"bg-blue-100",  color:"text-blue-600",  name:"Raj Kumar",share:"40% share",amount:"$4,480"},
    {initial:"S",bg:"bg-blue-100",  color:"text-blue-600",  name:"Sara M.",  share:"25% share",amount:"$2,800"},
    {initial:"D",bg:"bg-blue-100",  color:"text-blue-600",  name:"Dev Mike", share:"25% share",amount:"$2,800"},
    {initial:"U",bg:"bg-purple-100",color:"text-purple-600",name:"UI Priya", share:"10% share",amount:"$1,120"},
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {financeStats.map((s,i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 bg-white">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${s.bg} flex items-center justify-center text-base sm:text-lg flex-shrink-0`}>{s.icon}</div>
            <div><div className="font-bold text-gray-900 text-sm sm:text-base">{s.value}</div><div className="text-xs text-gray-400 mt-0.5 leading-tight">{s.label}</div></div>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue Trends (6 Months)</h3>
        <RevenueChart />
      </div>

      <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Project-wise Escrow</h3>
        <div className="flex flex-col gap-3">
          {escrowProjects.map((p,i) => (
            <div key={i} className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3.5">
              <div><div className="text-sm font-semibold text-gray-900">{p.name}</div><div className="text-xs text-blue-400 mt-0.5">{p.milestone}</div></div>
              <span className="font-bold text-gray-900 text-sm">{p.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
          <h3 className="font-semibold text-gray-900">Member Revenue Distribution — Feb 2026</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Configure Rules</button>
        </div>
        <p className="text-sm text-gray-500 mb-4">Total agency revenue: <span className="font-semibold text-gray-800">$11,200</span></p>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {["Percentage-Based","Fixed-Based","Bonus-Based"].map(mode => (
            <button key={mode} onClick={() => setDistMode(mode)}
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full border transition-colors ${distMode===mode?"bg-blue-500 text-white border-blue-500":"bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}>
              {mode}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 mb-5">
          {members.map((m,i) => (
            <div key={i} className="flex flex-wrap items-center justify-between gap-3 border border-gray-100 rounded-lg px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${m.bg} flex items-center justify-center text-xs font-bold ${m.color}`}>{m.initial}</div>
                <div><div className="text-sm font-semibold text-gray-900">{m.name}</div><div className="text-xs text-gray-400">{m.share}</div></div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-bold text-gray-900 text-sm">{m.amount}</span>
                <button className="border border-gray-200 text-gray-700 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Release</button>
                <button className="border border-gray-200 text-gray-700 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Hold</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-gray-400">Agency retained: <span className="text-gray-700 font-medium">$0 (0%)</span></span>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors">Bulk Release All</button>
            <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Export Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const kpis = [
    {value:"68%",    label:"Profit Margin",        sub:"After fees + payouts"           },
    {value:"96%",    label:"Project Success Rate",  sub:"No disputed completions"        },
    {value:"84%",    label:"Team Efficiency",       sub:"On-time milestone delivery"     },
    {value:"$18,400",label:"Avg Project Value",     sub:"↑ from $12,200 (6mo ago)",subColor:"text-green-500"},
  ];
  const performance = [
    {label:"On-time Delivery",     pct:96},
    {label:"Client Satisfaction",  pct:98},
    {label:"Communication Score",  pct:92},
    {label:"Quality Rating",       pct:89},
  ];
  const insights = [
    {text:"You need 1 more DevOps engineer — 3 cloud projects declined due to skill gap in last 30 days",action:"→ Invite DevOps"},
    {text:"Your pricing is 12% below market for mobile apps — consider raising proposal budgets",action:"→ Update Pricing"},
    {text:"UI/UX projects have your highest margin (72%) — consider focusing acquisition here",action:"→ View UI/UX Projects"},
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpis.map((k,i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{k.value}</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">{k.label}</div>
            <div className={`text-xs mt-0.5 leading-tight ${k.subColor||"text-gray-400"}`}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue Trends (6 Months)</h3>
        <RevenueChart />
      </div>
      <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white">
        <h3 className="font-semibold text-gray-900 mb-5">Performance Breakdown</h3>
        <div className="flex flex-col gap-4">
          {performance.map((p,i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-700">{p.label}</span>
                <span className="text-sm font-bold text-gray-900">{p.pct}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width:`${p.pct}%`}} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-gray-100 bg-blue-50 rounded-xl p-5 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">📊 AI Business Insights (Monthly Report)</h3>
        <div className="flex flex-col gap-3">
          {insights.map((ins,i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 sm:px-5 py-4">
              <p className="text-sm text-gray-700">{ins.text}</p>
              <p className="text-sm text-blue-500 font-medium mt-1.5 cursor-pointer hover:text-blue-600">{ins.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AgencyDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [aiSubTab,  setAiSubTab]  = useState("Capability Score");
  const [mobileTabOpen, setMobileTabOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between">
        <span className="text-blue-500 font-bold text-xl tracking-tight">ArcLancer</span>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline border border-gray-300 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">AGENCY</span>
          <span className="hidden sm:flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-blue-500">👁 Public Profile</span>
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">T</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* Welcome */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, TechVision Digital</h1>
          <p className="text-gray-500 text-sm mt-1">Here's your agency overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {stats.map((s,i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-sm">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg ${s.bg} flex items-center justify-center text-base sm:text-lg`}>
                <span className={s.iconColor}>{s.icon}</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Content */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
          {/* Mobile: dropdown tab selector */}
          <div className="sm:hidden px-4 py-3 border-b border-gray-100">
            <button onClick={() => setMobileTabOpen(!mobileTabOpen)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-800 bg-white">
              {activeTab}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5l5 5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {mobileTabOpen && (
              <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1">
                {tabs.map(tab => (
                  <button key={tab} onClick={() => { setActiveTab(tab); setMobileTabOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${activeTab===tab?"bg-blue-50 text-blue-600 font-semibold":"text-gray-700 hover:bg-gray-50"}`}>
                    {tab} {tab==="Team" && <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5">5</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop: horizontal tabs */}
          <div className="hidden sm:flex gap-0 border-b border-gray-100 px-4 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium relative flex items-center gap-1.5 transition-colors whitespace-nowrap ${activeTab===tab?"text-gray-900 border-b-2 border-gray-900":"text-gray-500 hover:text-gray-700"}`}>
                {tab}
                {tab==="Team" && <span className="bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">5</span>}
              </button>
            ))}
          </div>

          {/* AI Score Tab */}
          {activeTab==="AI Score" && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                {["Capability Score","Delivery Risk"].map(t => (
                  <button key={t} onClick={() => setAiSubTab(t)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${aiSubTab===t?"bg-blue-500 text-white":"border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                    {t==="Capability Score"?"🤖":"🎯"} {t}
                  </button>
                ))}
              </div>
              {aiSubTab==="Capability Score" ? <CapabilityScoreTab /> : <DeliveryRiskTab />}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab==="Overview" && (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div>
                    <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[{icon:"📄",label:"Post a Proposal"},{icon:"➕",label:"Invite Member"},{icon:"💬",label:"Messages"},{icon:"⬆️",label:"Upload Deliverable"}].map(action => (
                        <button key={action.label} className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                          <span className="text-gray-400">{action.icon}</span>{action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 mb-4">Active Projects</h2>
                    <div className="flex flex-col gap-3">
                      {projects.map((p,i) => (
                        <div key={i} className="border border-gray-200 rounded-lg px-4 py-4">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">{p.name}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{p.client} · {p.budget}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600 font-medium">{p.progress}%</span>
                              <span className="bg-green-50 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">{p.status}</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width:`${p.progress}%`}} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                    <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><span className="text-gray-500">👥</span> Team</h2>
                    <div className="flex flex-col gap-3">
                      {teamMembers.map((m,i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-full ${m.bg} flex items-center justify-center text-xs font-bold text-gray-600`}>{m.initial}</div>
                            <span className="text-sm text-gray-800">{m.name}</span>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${m.roleColor}`}>{m.role}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 text-sm text-gray-500 hover:text-gray-700 w-full text-center">Manage Team →</button>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                    <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><span className="text-green-500">📈</span> Growth</h2>
                    <div className="flex flex-col gap-2.5">
                      {[{label:"Tier",value:"Professional"},{label:"Project Limit",value:"$100,000"},{label:"Concurrent",value:"Max 10"},{label:"Rating",value:"⭐ 4.9 (47)"}].map((row,i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{row.label}</span>
                          <span className="text-sm text-gray-800 font-medium">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab==="Team"      && <div className="p-4 sm:p-6"><TeamManagementTab /></div>}
          {activeTab==="Projects"  && <div className="p-4 sm:p-6"><ProjectsTab /></div>}
          {activeTab==="Proposals" && <div className="p-4 sm:p-6"><ProposalsTab /></div>}
          {activeTab==="Finance"   && <div className="p-4 sm:p-6"><FinanceTab /></div>}
          {activeTab==="Analytics" && <div className="p-4 sm:p-6"><AnalyticsTab /></div>}
        </div>
      </main>
    </div>
  );
}