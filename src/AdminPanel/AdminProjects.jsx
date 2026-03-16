import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StatusBadge, StatCard, Avatar, SearchBar,
  FilterSelect, ActionBtn, PageHeader, Table,
  SectionCard, InfoRow
} from "./AdminComponents";

const mockProjects = [
  { id:"PRJ-001", title:"Food Delivery App", client:{name:"ByteEats Co.",id:"CL-004",email:"projects@byteeats.in",type:"Startup"}, talent:{name:"TechNova Solutions",id:"AG-001",type:"Agency",email:"admin@technova.io"}, status:"In Progress", health:"On Track", budget:480000, escrow:240000, commission:28800, milestones:[{name:"UI Design",amount:60000,status:"Completed",dueDate:"Feb 1, 2026",deliveredDate:"Jan 30, 2026"},{name:"Backend API",amount:120000,status:"In Progress",dueDate:"Apr 15, 2026",deliveredDate:null},{name:"Mobile App",amount:180000,status:"Pending",dueDate:"May 10, 2026",deliveredDate:null},{name:"Testing & Launch",amount:120000,status:"Pending",dueDate:"Jun 1, 2026",deliveredDate:null}], deadline:"Jun 1, 2026", startDate:"Jan 10, 2026", riskLevel:"Low", aiFlag:false, progress:55, projectType:"Fixed Price", category:"Mobile App", scopeChanges:1, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Project is progressing normally. Backend API milestone is on schedule. No risk signals detected.", timeline:[{event:"Project created",actor:"ByteEats Co.",time:"Jan 10, 2026",type:"system"},{event:"Escrow funded — ₹2,40,000",actor:"System",time:"Jan 10, 2026",type:"payment"},{event:"Milestone 1 delivered",actor:"TechNova Solutions",time:"Jan 30, 2026",type:"delivery"},{event:"Milestone 1 approved",actor:"ByteEats Co.",time:"Feb 2, 2026",type:"approval"},{event:"Milestone 1 payment released",actor:"System",time:"Feb 2, 2026",type:"payment"}], files:[{name:"UI_Design_v2.fig",size:"8.2 MB",uploadedBy:"TechNova Solutions",date:"Jan 30, 2026",milestone:"Milestone 1",version:2},{name:"API_Documentation.pdf",size:"1.1 MB",uploadedBy:"TechNova Solutions",date:"Mar 5, 2026",milestone:"Milestone 2",version:1}], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"Please ensure all deliverables are uploaded before the deadline.",time:"04:30 PM",type:"Normal"},{sender:"Priya S.",role:"team",color:"yellow",text:"UI screens for milestone 3 are ready for review. Should I share in the client channel?",time:"05:00 PM",type:"Normal"},{sender:"Raj Kumar",role:"agency",color:"blue",text:"Yes Priya, share them in Channel 1 with the client. Good work!",time:"05:15 PM",type:"Normal"}] },
  { id:"PRJ-002", title:"Patient Appointment App", client:{name:"HealthFirst Clinic",id:"CL-001",email:"sneha@healthfirst.in",type:"Startup"}, talent:{name:"Arjun Dev",id:"FL-002",type:"Freelancer",email:"arjun@devcraft.io"}, status:"In Progress", health:"At Risk", budget:320000, escrow:160000, commission:19200, milestones:[{name:"Requirements & Design",amount:48000,status:"Completed",dueDate:"Feb 20, 2026",deliveredDate:"Feb 19, 2026"},{name:"Core Features",amount:144000,status:"In Progress",dueDate:"Apr 5, 2026",deliveredDate:null},{name:"Testing & Launch",amount:128000,status:"Pending",dueDate:"Apr 25, 2026",deliveredDate:null}], deadline:"Apr 25, 2026", startDate:"Feb 3, 2026", riskLevel:"Medium", aiFlag:true, progress:35, projectType:"Fixed Price", category:"Mobile App", scopeChanges:3, clientSilenceDays:8, talentSilenceDays:0, aiHealthSummary:"Client has been unresponsive for 8 days. Scope changed 3 times. Moderate risk of deadline breach. Admin attention recommended.", timeline:[{event:"Project created",actor:"HealthFirst Clinic",time:"Feb 3, 2026",type:"system"},{event:"Milestone 1 delivered",actor:"Arjun Dev",time:"Feb 19, 2026",type:"delivery"},{event:"Scope change request #1",actor:"HealthFirst Clinic",time:"Mar 1, 2026",type:"warning"},{event:"AI flagged: client silent 8 days",actor:"AI System",time:"Mar 10, 2026",type:"alert"}], files:[{name:"Requirements_v1.pdf",size:"2.1 MB",uploadedBy:"HealthFirst Clinic",date:"Feb 5, 2026",milestone:"Milestone 1",version:1}], messages:[{sender:"Arjun Dev",role:"talent",color:"blue",text:"Milestone 2 is 60% done. Waiting for client feedback on appointment flow.",time:"Mar 8, 2026 · 10:00 AM",type:"Update"},{sender:"Weblance Admin",role:"admin",color:"red",text:"⚠ Client has been unresponsive for 8 days. Reminder sent.",time:"Mar 10, 2026 · 09:00 AM",type:"Warning"}] },
  { id:"PRJ-003", title:"E-Commerce Platform Revamp", client:{name:"ShopEasy Retail",id:"CL-002",email:"vikram@shopeasy.com",type:"Enterprise"}, talent:{name:"Rahul Sharma",id:"FL-001",type:"Freelancer",email:"rahul@gmail.com"}, status:"In Progress", health:"Delayed", budget:185000, escrow:92500, commission:11100, milestones:[{name:"Frontend Redesign",amount:55500,status:"Completed",dueDate:"Feb 15, 2026",deliveredDate:"Feb 28, 2026"},{name:"Backend Integration",amount:74000,status:"In Progress",dueDate:"Mar 25, 2026",deliveredDate:null},{name:"QA & Deployment",amount:55500,status:"Pending",dueDate:"Apr 10, 2026",deliveredDate:null}], deadline:"Apr 10, 2026", startDate:"Jan 20, 2026", riskLevel:"High", aiFlag:true, progress:28, projectType:"Fixed Price", category:"Web Development", scopeChanges:5, clientSilenceDays:5, talentSilenceDays:2, aiHealthSummary:"Milestone 1 delivered 13 days late. Scope changed 5 times without approval. Client silence and talent inactivity detected. High risk of dispute.", timeline:[{event:"Project created",actor:"ShopEasy Retail",time:"Jan 20, 2026",type:"system"},{event:"Milestone 1 OVERDUE",actor:"AI System",time:"Feb 15, 2026",type:"alert"},{event:"Milestone 1 delivered (13 days late)",actor:"Rahul Sharma",time:"Feb 28, 2026",type:"delivery"},{event:"Scope change #3 — new features",actor:"ShopEasy Retail",time:"Mar 2, 2026",type:"warning"},{event:"AI flagged: High risk project",actor:"AI System",time:"Mar 10, 2026",type:"alert"}], files:[], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"⚠ High risk project flagged. Scope changes must be formally approved.",time:"Mar 10, 2026 · 08:00 AM",type:"Warning"}] },
  { id:"PRJ-004", title:"HR Automation Dashboard", client:{name:"ByteEats Co.",id:"CL-004",email:"projects@byteeats.in",type:"Startup"}, talent:{name:"BuildRight Agency",id:"AG-002",type:"Agency",email:"ops@buildright.co"}, status:"Completed", health:"Completed", budget:650000, escrow:0, commission:39000, milestones:[{name:"Discovery & Design",amount:97500,status:"Completed",dueDate:"Oct 20, 2025",deliveredDate:"Oct 18, 2025"},{name:"Backend Development",amount:195000,status:"Completed",dueDate:"Nov 30, 2025",deliveredDate:"Nov 28, 2025"},{name:"Frontend Development",amount:162500,status:"Completed",dueDate:"Jan 10, 2026",deliveredDate:"Jan 8, 2026"},{name:"QA & Testing",amount:97500,status:"Completed",dueDate:"Feb 10, 2026",deliveredDate:"Feb 8, 2026"},{name:"Deployment & Handover",amount:97500,status:"Completed",dueDate:"Feb 28, 2026",deliveredDate:"Feb 25, 2026"}], deadline:"Feb 28, 2026", startDate:"Oct 1, 2025", riskLevel:"Low", aiFlag:false, progress:100, projectType:"Fixed Price", category:"Enterprise Software", scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Completed successfully. All milestones on time. Client satisfaction: 4.8/5. No disputes.", timeline:[{event:"Project created",actor:"ByteEats Co.",time:"Oct 1, 2025",type:"system"},{event:"All milestones completed",actor:"BuildRight Agency",time:"Feb 25, 2026",type:"delivery"},{event:"Final payment released — ₹6,50,000",actor:"System",time:"Feb 28, 2026",type:"payment"},{event:"Project closed",actor:"System",time:"Feb 28, 2026",type:"system"}], files:[{name:"Final_Delivery_Package.zip",size:"124 MB",uploadedBy:"BuildRight Agency",date:"Feb 25, 2026",milestone:"Milestone 5",version:1},{name:"Deployment_Guide.pdf",size:"3.4 MB",uploadedBy:"BuildRight Agency",date:"Feb 25, 2026",milestone:"Milestone 5",version:1}], messages:[] },
  { id:"PRJ-005", title:"Brand Identity Design", client:{name:"Meera Joshi",id:"CL-003",email:"meera@startup.co",type:"Individual"}, talent:{name:"Neha Gupta",id:"FL-005",type:"Freelancer",email:"neha@designcraft.in"}, status:"Pending", health:"Pending", budget:45000, escrow:0, commission:2700, milestones:[{name:"Brand Discovery & Moodboard",amount:13500,status:"Pending",dueDate:"Apr 5, 2026",deliveredDate:null},{name:"Final Brand Kit",amount:31500,status:"Pending",dueDate:"Apr 20, 2026",deliveredDate:null}], deadline:"Apr 20, 2026", startDate:"Mar 14, 2026", riskLevel:"Low", aiFlag:false, progress:0, projectType:"Fixed Price", category:"Design", scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Project just started. Waiting for client to fund escrow before work begins.", timeline:[{event:"Project created",actor:"Meera Joshi",time:"Mar 14, 2026",type:"system"},{event:"Neha Gupta accepted invite",actor:"Neha Gupta",time:"Mar 14, 2026",type:"action"},{event:"Waiting for escrow funding",actor:"System",time:"Mar 14, 2026",type:"alert"}], files:[], messages:[] },
  { id:"PRJ-006", title:"Mobile Banking App", client:{name:"Vikram Singh",id:"CL-002",email:"vikram@shopeasy.com",type:"Enterprise"}, talent:{name:"TechNova Solutions",id:"AG-001",type:"Agency",email:"admin@technova.io"}, status:"Disputed", health:"Disputed", budget:280000, escrow:140000, commission:16800, milestones:[{name:"UX Design",amount:42000,status:"Completed",dueDate:"Dec 10, 2025",deliveredDate:"Dec 9, 2025"},{name:"Core Banking API",amount:84000,status:"Completed",dueDate:"Jan 20, 2026",deliveredDate:"Jan 22, 2026"},{name:"Mobile Frontend",amount:84000,status:"Disputed",dueDate:"Mar 10, 2026",deliveredDate:null},{name:"Security & Launch",amount:70000,status:"Pending",dueDate:"Apr 5, 2026",deliveredDate:null}], deadline:"Apr 5, 2026", startDate:"Nov 15, 2025", riskLevel:"High", aiFlag:true, progress:50, projectType:"Fixed Price", category:"Mobile App", scopeChanges:2, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Active dispute on Milestone 3. Escrow ₹1,40,000 frozen. AI verdict: Mixed fault — 60% Agency, 40% Client.", timeline:[{event:"Project created",actor:"Vikram Singh",time:"Nov 15, 2025",type:"system"},{event:"Milestone 3 submitted",actor:"TechNova Solutions",time:"Mar 8, 2026",type:"delivery"},{event:"Client raised dispute DSP-002",actor:"Vikram Singh",time:"Mar 8, 2026",type:"alert"},{event:"Escrow frozen",actor:"System",time:"Mar 8, 2026",type:"payment"},{event:"AI analysis completed",actor:"AI System",time:"Mar 9, 2026",type:"action"}], files:[{name:"Milestone3_Partial_Build.apk",size:"18.3 MB",uploadedBy:"TechNova Solutions",date:"Mar 8, 2026",milestone:"Milestone 3",version:1}], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"🔒 Chat frozen pending dispute resolution. Only official messages allowed.",time:"Mar 8, 2026 · 06:00 PM",type:"Warning"}] },
  { id:"PRJ-007", title:"Logistics Tracking System", client:{name:"Sneha Kapoor",id:"CL-001",email:"sneha@healthfirst.in",type:"Startup"}, talent:{name:"BuildRight Agency",id:"AG-002",type:"Agency",email:"ops@buildright.co"}, status:"Completed", health:"Completed", budget:390000, escrow:0, commission:23400, milestones:[{name:"System Architecture",amount:58500,status:"Completed",dueDate:"Sep 20, 2025",deliveredDate:"Sep 19, 2025"},{name:"Backend & APIs",amount:136500,status:"Completed",dueDate:"Oct 31, 2025",deliveredDate:"Oct 29, 2025"},{name:"Dashboard UI",amount:117000,status:"Completed",dueDate:"Dec 15, 2025",deliveredDate:"Dec 12, 2025"},{name:"Testing & Launch",amount:78000,status:"Completed",dueDate:"Jan 30, 2026",deliveredDate:"Jan 28, 2026"}], deadline:"Jan 30, 2026", startDate:"Sep 5, 2025", riskLevel:"Low", aiFlag:false, progress:100, projectType:"Fixed Price", category:"Enterprise Software", scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Completed. All milestones on time. Client rating: 4.9/5.", timeline:[{event:"Project created",actor:"Sneha Kapoor",time:"Sep 5, 2025",type:"system"},{event:"Project completed",actor:"System",time:"Jan 30, 2026",type:"system"}], files:[], messages:[] },
];

const healthStyle = { "On Track":"bg-green-50 text-green-700 border border-green-200","At Risk":"bg-yellow-50 text-yellow-700 border border-yellow-200","Delayed":"bg-orange-50 text-orange-700 border border-orange-200","Disputed":"bg-red-50 text-red-700 border border-red-200","Completed":"bg-gray-50 text-gray-600 border border-gray-200","Pending":"bg-blue-50 text-blue-700 border border-blue-200" };
const milestoneStyle = { "Completed":"bg-green-50 text-green-700 border border-green-200","In Progress":"bg-blue-50 text-blue-700 border border-blue-200","Pending":"bg-gray-50 text-gray-500 border border-gray-200","Disputed":"bg-red-50 text-red-600 border border-red-200" };
const timelineIcon = { system:{icon:"⊙",bg:"bg-gray-100",text:"text-gray-500"},payment:{icon:"⊕",bg:"bg-green-100",text:"text-green-600"},action:{icon:"◎",bg:"bg-blue-100",text:"text-blue-600"},delivery:{icon:"⊟",bg:"bg-purple-100",text:"text-purple-600"},approval:{icon:"✓",bg:"bg-green-100",text:"text-green-600"},alert:{icon:"⚑",bg:"bg-red-100",text:"text-red-600"},warning:{icon:"⚠",bg:"bg-yellow-100",text:"text-yellow-600"} };
const msgColor = { red:"bg-red-50 border-l-2 border-red-400",blue:"bg-blue-50 border-l-2 border-blue-400",yellow:"bg-yellow-50 border-l-2 border-yellow-400",green:"bg-green-50 border-l-2 border-green-400" };
const msgBadge = { red:"bg-red-100 text-red-700",blue:"bg-blue-100 text-blue-700",yellow:"bg-yellow-100 text-yellow-700",green:"bg-green-100 text-green-700" };

// ── LIST PAGE ─────────────────────────────────────────────────────────────────
export function AdminProjects() {
  const navigate = useNavigate();
  const [search,setSearch]=useState(""); const [statusFilter,setStatus]=useState(""); const [typeFilter,setType]=useState(""); const [riskFilter,setRisk]=useState(""); const [activeTab,setActiveTab]=useState("all");
  const tabFiltered = mockProjects.filter(p=>{ if(activeTab==="active") return p.status==="In Progress"; if(activeTab==="at-risk") return ["At Risk","Delayed","Disputed"].includes(p.health); if(activeTab==="completed") return p.status==="Completed"; return true; });
  const filtered = tabFiltered.filter(p=>{ const q=search.toLowerCase(); return (p.title.toLowerCase().includes(q)||p.client.name.toLowerCase().includes(q)||p.talent.name.toLowerCase().includes(q)||p.id.toLowerCase().includes(q))&&(!statusFilter||p.status===statusFilter)&&(!typeFilter||p.talent.type===typeFilter)&&(!riskFilter||p.riskLevel===riskFilter); });
  const totalEscrow=mockProjects.reduce((s,p)=>s+p.escrow,0); const atRisk=mockProjects.filter(p=>["At Risk","Delayed","Disputed"].includes(p.health)).length;
  return (
    <div className="p-6">
      <PageHeader title="Projects" subtitle="Monitor all active, completed & disputed projects" actions={<ActionBtn label="⬇ Export"/>}/>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total" value={mockProjects.length} color="gray"/>
        <StatCard label="In Progress" value={mockProjects.filter(p=>p.status==="In Progress").length} color="blue"/>
        <StatCard label="Completed" value={mockProjects.filter(p=>p.status==="Completed").length} color="green"/>
        <StatCard label="At Risk / Disputed" value={atRisk} sub="Needs attention" color="orange"/>
        <StatCard label="Escrow Locked" value={`₹${(totalEscrow/100000).toFixed(1)}L`} color="blue"/>
      </div>
      <div className="flex gap-1 border-b border-gray-100 mb-4">
        {[{key:"all",label:`All (${mockProjects.length})`},{key:"active",label:`Active (${mockProjects.filter(p=>p.status==="In Progress").length})`},{key:"at-risk",label:`At Risk (${atRisk})`},{key:"completed",label:`Completed (${mockProjects.filter(p=>p.status==="Completed").length})`}].map(tab=>(
          <button key={tab.key} onClick={()=>setActiveTab(tab.key)} className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${activeTab===tab.key?"text-green-600 border-b-2 border-green-500 -mb-px":"text-gray-500 hover:text-gray-700"}`}>{tab.label}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search project, client, talent...">
            <FilterSelect value={statusFilter} onChange={setStatus} label="All Status" options={[{value:"In Progress",label:"In Progress"},{value:"Completed",label:"Completed"},{value:"Disputed",label:"Disputed"},{value:"Pending",label:"Pending"}]}/>
            <FilterSelect value={typeFilter} onChange={setType} label="All Talent" options={[{value:"Freelancer",label:"Freelancer"},{value:"Agency",label:"Agency"}]}/>
            <FilterSelect value={riskFilter} onChange={setRisk} label="All Risk" options={[{value:"Low",label:"Low"},{value:"Medium",label:"Medium"},{value:"High",label:"High"}]}/>
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} results</span>
        </div>
        <Table headers={["Project","Client","Talent","Health","Progress","Milestones","Budget","Escrow","Deadline","Risk","Actions"]}>
          {filtered.map(p=>(
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={()=>navigate(`/admin/projects/${p.id}`)}>
              <td className="py-3 pr-4">
                <div className="flex items-start gap-1.5">
                  <div><p className="text-sm font-semibold text-gray-800">{p.title}</p><p className="text-[10px] text-gray-300">{p.id} · {p.category}</p></div>
                  {p.aiFlag&&<span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold shrink-0">AI⚑</span>}
                </div>
              </td>
              <td className="py-3 pr-4"><div className="flex items-center gap-2"><Avatar name={p.client.name} size="sm"/><div><p className="text-sm text-gray-700">{p.client.name}</p><p className="text-[10px] text-gray-400">{p.client.type}</p></div></div></td>
              <td className="py-3 pr-4"><p className="text-sm text-gray-700">{p.talent.name}</p><p className="text-[10px] text-gray-400">{p.talent.type}</p></td>
              <td className="py-3 pr-4"><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[p.health]}`}>{p.health}</span></td>
              <td className="py-3 pr-4"><div className="flex items-center gap-2 min-w-[80px]"><div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${p.progress===100?"bg-green-500":p.riskLevel==="High"?"bg-orange-400":"bg-blue-400"}`} style={{width:`${p.progress}%`}}/></div><span className="text-xs font-semibold text-gray-600">{p.progress}%</span></div></td>
              <td className="py-3 pr-4 text-xs text-gray-600 text-center">{p.milestones.filter(m=>m.status==="Completed").length}/{p.milestones.length}</td>
              <td className="py-3 pr-4 text-sm font-semibold text-gray-700">₹{(p.budget/1000).toFixed(0)}k</td>
              <td className="py-3 pr-4">{p.escrow>0?<span className="text-sm font-semibold text-orange-500">₹{(p.escrow/1000).toFixed(0)}k</span>:<span className="text-xs text-gray-300">—</span>}</td>
              <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{p.deadline}</td>
              <td className="py-3 pr-4"><span className={`text-xs font-semibold ${p.riskLevel==="High"?"text-red-500":p.riskLevel==="Medium"?"text-yellow-600":"text-green-600"}`}>{p.riskLevel}</span></td>
              <td className="py-3"><div className="opacity-0 group-hover:opacity-100 transition-opacity"><ActionBtn label="View" variant="primary" onClick={e=>{e.stopPropagation();navigate(`/admin/projects/${p.id}`);}}/></div></td>
            </tr>
          ))}
        </Table>
        {filtered.length===0&&<div className="py-16 text-center"><p className="text-gray-400 text-sm">No projects match your filters</p></div>}
        <div className="px-4 py-3 border-t border-gray-100"><span className="text-xs text-gray-400">Showing {filtered.length} of {mockProjects.length} projects</span></div>
      </div>
    </div>
  );
}

// ── DETAIL PAGE ───────────────────────────────────────────────────────────────
export function AdminProjectDetail() {
  const {id}=useParams(); const navigate=useNavigate();
  const [activeTab,setActiveTab]=useState("overview");
  const [chatFrozen,setChatFrozen]=useState(false);
  const [adminMsg,setAdminMsg]=useState("");
  const p=mockProjects.find(x=>x.id===id);
  if(!p) return(<div className="p-6 text-center py-24 space-y-3"><p className="text-gray-400">Project not found</p><ActionBtn label="← Back to Projects" onClick={()=>navigate("/admin/projects")} size="md"/></div>);
  const completedMilestones=p.milestones.filter(m=>m.status==="Completed").length;
  const tabs=["overview","milestones","projectstream","files","timeline","admin"];
  return (
    <div className="p-6">
      <button onClick={()=>navigate("/admin/projects")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors">← All Projects</button>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            <h1 className="text-xl font-bold text-gray-900">{p.title}</h1>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[p.health]}`}>{p.health}</span>
            <StatusBadge status={p.status}/>
            {p.aiFlag&&<span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-full font-semibold">⚑ AI Flagged</span>}
          </div>
          <p className="text-sm text-gray-500">{p.id} · {p.category} · {p.projectType}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {p.status==="In Progress"&&<ActionBtn label="Freeze Project" variant="warning" size="md" onClick={()=>setChatFrozen(true)}/>}
          {p.status==="In Progress"&&<ActionBtn label="Escalate to Dispute" variant="danger" size="md"/>}
          <ActionBtn label="Send Notice" size="md"/>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        {[{label:"Progress",value:`${p.progress}%`,color:p.progress===100?"text-green-600":"text-blue-600"},{label:"Milestones",value:`${completedMilestones}/${p.milestones.length}`,color:"text-gray-800"},{label:"Budget",value:`₹${(p.budget/1000).toFixed(0)}k`,color:"text-gray-800"},{label:"Escrow",value:p.escrow>0?`₹${(p.escrow/1000).toFixed(0)}k`:"Released",color:p.escrow>0?"text-orange-500":"text-green-600"},{label:"Risk",value:p.riskLevel,color:p.riskLevel==="High"?"text-red-500":p.riskLevel==="Medium"?"text-yellow-600":"text-green-600"}].map(s=>(
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center"><p className="text-xs text-gray-400 mb-1">{s.label}</p><p className={`text-lg font-bold ${s.color}`}>{s.value}</p></div>
        ))}
      </div>
      {/* AI Health Banner */}
      <div className={`p-4 rounded-xl border mb-5 flex items-start gap-3 ${p.riskLevel==="High"?"bg-red-50 border-red-100":p.riskLevel==="Medium"?"bg-yellow-50 border-yellow-100":p.status==="Completed"?"bg-green-50 border-green-100":"bg-blue-50 border-blue-100"}`}>
        <span className={`text-lg mt-0.5 shrink-0 ${p.riskLevel==="High"?"text-red-500":p.riskLevel==="Medium"?"text-yellow-500":p.status==="Completed"?"text-green-500":"text-blue-500"}`}>◎</span>
        <div><p className={`text-sm font-bold mb-0.5 ${p.riskLevel==="High"?"text-red-800":p.riskLevel==="Medium"?"text-yellow-800":p.status==="Completed"?"text-green-800":"text-blue-800"}`}>AI Health Summary</p><p className={`text-xs leading-relaxed ${p.riskLevel==="High"?"text-red-700":p.riskLevel==="Medium"?"text-yellow-700":p.status==="Completed"?"text-green-700":"text-blue-700"}`}>{p.aiHealthSummary}</p></div>
      </div>
      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-100 mb-6 overflow-x-auto">
        {tabs.map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap transition-colors ${activeTab===tab?"text-green-600 border-b-2 border-green-500 -mb-px":"text-gray-500 hover:text-gray-700"}`}>{tab==="projectstream"?"ProjectStream":tab}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab==="overview"&&(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <SectionCard title="Project Details">
              <InfoRow label="Project ID" value={p.id}/><InfoRow label="Category" value={p.category}/><InfoRow label="Type" value={p.projectType}/><InfoRow label="Start Date" value={p.startDate}/><InfoRow label="Deadline" value={p.deadline}/>
              <InfoRow label="Scope Changes" value={p.scopeChanges>0?<span className={p.scopeChanges>2?"text-red-500 font-semibold":"text-yellow-600 font-semibold"}>{p.scopeChanges} changes</span>:<span className="text-green-600 font-semibold">None</span>}/>
            </SectionCard>
            <div className="grid grid-cols-2 gap-5">
              <SectionCard title="Client">
                <div className="flex items-center gap-3 mb-3"><Avatar name={p.client.name} size="md"/><div><p className="text-sm font-bold text-gray-800">{p.client.name}</p><p className="text-xs text-gray-400">{p.client.type}</p></div></div>
                <InfoRow label="Email" value={p.client.email}/><InfoRow label="Client ID" value={p.client.id}/>
                <InfoRow label="Silence" value={p.clientSilenceDays>0?<span className={`font-semibold ${p.clientSilenceDays>5?"text-red-500":"text-yellow-600"}`}>{p.clientSilenceDays}d</span>:<span className="text-green-600">Active</span>}/>
                <div className="mt-3"><ActionBtn label="View Client" onClick={()=>navigate(`/admin/clients/${p.client.id}`)}/></div>
              </SectionCard>
              <SectionCard title={p.talent.type}>
                <div className="flex items-center gap-3 mb-3"><Avatar name={p.talent.name} size="md"/><div><p className="text-sm font-bold text-gray-800">{p.talent.name}</p><p className="text-xs text-gray-400">{p.talent.type}</p></div></div>
                <InfoRow label="Email" value={p.talent.email}/><InfoRow label="Talent ID" value={p.talent.id}/>
                <InfoRow label="Silence" value={p.talentSilenceDays>0?<span className={`font-semibold ${p.talentSilenceDays>2?"text-red-500":"text-yellow-600"}`}>{p.talentSilenceDays}d</span>:<span className="text-green-600">Active</span>}/>
                <div className="mt-3"><ActionBtn label={`View ${p.talent.type}`} onClick={()=>navigate(`/admin/${p.talent.type==="Agency"?"agencies":"freelancers"}/${p.talent.id}`)}/></div>
              </SectionCard>
            </div>
          </div>
          <div className="space-y-5">
            <SectionCard title="Financial Summary">
              {[{label:"Total Budget",value:`₹${p.budget.toLocaleString()}`,color:"text-gray-800"},{label:"Escrow Locked",value:p.escrow>0?`₹${p.escrow.toLocaleString()}`:"Released",color:p.escrow>0?"text-orange-500":"text-green-600"},{label:"Commission (6%)",value:`₹${p.commission.toLocaleString()}`,color:"text-green-600"},{label:"Paid to Talent",value:`₹${p.milestones.filter(m=>m.status==="Completed").reduce((s,m)=>s+m.amount,0).toLocaleString()}`,color:"text-blue-600"}].map(item=>(
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"><span className="text-xs text-gray-400">{item.label}</span><span className={`text-sm font-bold ${item.color}`}>{item.value}</span></div>
              ))}
            </SectionCard>
            <SectionCard title="Progress">
              <div className="mb-4"><div className="flex justify-between text-xs text-gray-500 mb-2"><span>Completion</span><span className="font-bold">{p.progress}%</span></div><div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${p.progress===100?"bg-green-500":p.riskLevel==="High"?"bg-orange-400":"bg-blue-400"}`} style={{width:`${p.progress}%`}}/></div></div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2"><p className="text-xl font-bold text-green-600">{completedMilestones}</p><p className="text-[10px] text-gray-400">Completed</p></div>
                <div className="bg-gray-50 rounded-lg p-2"><p className="text-xl font-bold text-gray-500">{p.milestones.length-completedMilestones}</p><p className="text-[10px] text-gray-400">Remaining</p></div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* MILESTONES */}
      {activeTab==="milestones"&&(
        <div className="space-y-4">
          {p.milestones.map((m,i)=>(
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${m.status==="Completed"?"bg-green-500 text-white":m.status==="In Progress"?"bg-blue-500 text-white":m.status==="Disputed"?"bg-red-500 text-white":"bg-gray-200 text-gray-500"}`}>
                    {m.status==="Completed"?"✓":i+1}
                  </div>
                  <div><p className="text-sm font-bold text-gray-800">{m.name}</p><p className="text-xs text-gray-400">Milestone {i+1} of {p.milestones.length}</p></div>
                </div>
                <div className="flex items-center gap-3"><span className="text-lg font-bold text-gray-700">₹{m.amount.toLocaleString()}</span><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${milestoneStyle[m.status]}`}>{m.status}</span></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{label:"Due Date",value:m.dueDate,color:"text-gray-700"},{label:"Delivered",value:m.deliveredDate||"Not yet",color:m.deliveredDate?"text-gray-700":"text-gray-400"},{label:"Escrow",value:m.status==="Completed"?"Released":m.status==="Disputed"?"Frozen":"Locked",color:m.status==="Completed"?"text-green-600":m.status==="Disputed"?"text-red-500":"text-orange-500"}].map(s=>(
                  <div key={s.label} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 mb-0.5">{s.label}</p><p className={`text-sm font-semibold ${s.color}`}>{s.value}</p></div>
                ))}
              </div>
              {m.status==="In Progress"&&<div className="flex gap-2 mt-3"><ActionBtn label="Force Release" variant="primary"/><ActionBtn label="Extend Deadline"/><ActionBtn label="Freeze" variant="warning"/></div>}
              {m.status==="Disputed"&&<div className="flex gap-2 mt-3"><ActionBtn label="View Dispute" variant="danger" onClick={()=>navigate("/admin/disputes")}/><ActionBtn label="Force Release" variant="primary"/></div>}
            </div>
          ))}
        </div>
      )}

      {/* PROJECTSTREAM */}
      {activeTab==="projectstream"&&(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <div><p className="text-sm font-bold text-gray-800">ProjectStream — {p.title}</p><p className="text-xs text-gray-400 mt-0.5">Read-only admin view</p></div>
                <div className="flex items-center gap-2">
                  {chatFrozen&&<span className="text-[11px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-semibold">🔒 Frozen</span>}
                  <ActionBtn label={chatFrozen?"Unfreeze":"Freeze Chat"} variant={chatFrozen?"default":"warning"} onClick={()=>setChatFrozen(!chatFrozen)}/>
                </div>
              </div>
              {chatFrozen&&<div className="px-5 py-2 bg-red-50 border-b border-red-100"><p className="text-xs text-red-700 font-semibold">⚠ Chat frozen — only admin can send messages</p></div>}
              <div className="p-5 space-y-4 min-h-[280px]">
                {p.messages.length===0?<p className="text-gray-400 text-sm text-center py-10">No messages yet</p>:p.messages.map((msg,i)=>(
                  <div key={i} className={`p-3 rounded-xl ${msgColor[msg.color]}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Avatar name={msg.sender} size="sm"/>
                      <span className="text-sm font-bold text-gray-800">{msg.sender}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${msgBadge[msg.color]}`}>{msg.role==="admin"?"Admin":msg.role==="team"?"Team":msg.role==="agency"?"Agency Admin":"Talent"}</span>
                      <span className="text-[10px] text-gray-400 ml-auto">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 mb-2 font-medium">Send official admin message</p>
                <div className="flex gap-2">
                  <input value={adminMsg} onChange={e=>setAdminMsg(e.target.value)} placeholder="Type official message..." className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"/>
                  <ActionBtn label="Send" variant="primary" size="md" onClick={()=>setAdminMsg("")}/>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <SectionCard title="Chat Controls">
              <div className="space-y-2">
                {[{label:chatFrozen?"Unfreeze Chat":"Freeze Chat",variant:chatFrozen?"default":"warning",action:()=>setChatFrozen(!chatFrozen)},{label:"Export Chat History",variant:"default",action:()=>{}},{label:"Flag Conversation",variant:"danger",action:()=>{}}].map(a=>(
                  <button key={a.label} onClick={a.action} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${a.variant==="warning"?"border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100":a.variant==="danger"?"border-red-200 text-red-600 bg-red-50 hover:bg-red-100":"border-gray-200 text-gray-700 hover:bg-gray-50"}`}>{a.label}</button>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Participants">
              <div className="space-y-2.5">
                {[{name:"Weblance Admin",role:"Platform",color:"bg-red-500"},{name:p.client.name,role:"Client",color:"bg-green-500"},{name:p.talent.name,role:p.talent.type,color:"bg-blue-500"}].map(pt=>(
                  <div key={pt.name} className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${pt.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{pt.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                    <div><p className="text-xs font-semibold text-gray-800">{pt.name}</p><p className="text-[10px] text-gray-400">{pt.role}</p></div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* FILES */}
      {activeTab==="files"&&(
        <SectionCard title={`Files & Deliverables (${p.files.length})`}>
          {p.files.length===0?<p className="text-sm text-gray-400 text-center py-8">No files uploaded yet</p>:(
            <div className="space-y-3">
              {p.files.map((f,i)=>(
                <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-lg shrink-0">{f.name.endsWith(".pdf")?"📄":f.name.endsWith(".fig")?"🎨":f.name.endsWith(".zip")?"🗜":f.name.endsWith(".apk")?"📱":"📁"}</div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-800 truncate">{f.name}</p><p className="text-xs text-gray-400">{f.size} · {f.uploadedBy} · {f.date}</p><p className="text-[10px] text-gray-400">{f.milestone} · v{f.version}</p></div>
                  <div className="flex gap-2 shrink-0"><ActionBtn label="View"/><ActionBtn label="Download"/><ActionBtn label="Flag" variant="danger"/></div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {/* TIMELINE */}
      {activeTab==="timeline"&&(
        <SectionCard title="Project Timeline (Auto-Generated)">
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100"/>
            <div className="space-y-4">
              {p.timeline.map((t,i)=>{
                const cfg=timelineIcon[t.type]||timelineIcon.system;
                return(
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 z-10 ${cfg.bg} ${cfg.text}`}>{cfg.icon}</div>
                    <div className="flex-1 pb-4 border-b border-gray-50 last:border-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-800">{t.event}</p>
                        <span className="text-xs text-gray-400 shrink-0">{t.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">by {t.actor}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
      )}

      {/* ADMIN */}
      {activeTab==="admin"&&(
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SectionCard title="Admin Actions">
            <div className="space-y-2">
              {[{label:"Freeze Project",variant:"warning"},{label:"Force release next milestone",variant:"primary"},{label:"Extend deadline",variant:"default"},{label:"Escalate to Dispute",variant:"danger"},{label:"Send notice to both parties",variant:"default"},{label:"Lock scope",variant:"default"},{label:"Cancel project & trigger refund",variant:"danger"}].map(a=>(
                <button key={a.label} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${a.variant==="danger"?"border-red-200 text-red-600 bg-red-50 hover:bg-red-100":a.variant==="warning"?"border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100":a.variant==="primary"?"border-green-300 text-green-700 bg-green-50 hover:bg-green-100":"border-gray-200 text-gray-700 hover:bg-gray-50"}`}>{a.label}</button>
              ))}
            </div>
          </SectionCard>
          <div className="space-y-5">
            <SectionCard title="Risk Indicators">
              {[{label:"AI Health",value:p.health,warn:["At Risk","Delayed","Disputed"].includes(p.health)},{label:"Risk Level",value:p.riskLevel,warn:p.riskLevel!=="Low"},{label:"Scope Changes",value:`${p.scopeChanges}`,warn:p.scopeChanges>2},{label:"Client Silence",value:p.clientSilenceDays>0?`${p.clientSilenceDays} days`:"Active",warn:p.clientSilenceDays>3},{label:"Talent Silence",value:p.talentSilenceDays>0?`${p.talentSilenceDays} days`:"Active",warn:p.talentSilenceDays>2}].map(r=>(
                <div key={r.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"><span className="text-xs text-gray-400">{r.label}</span><span className={`text-xs font-bold ${r.warn?"text-red-500":"text-green-600"}`}>{r.value}</span></div>
              ))}
            </SectionCard>
            <SectionCard title="Quick Links">
              <div className="space-y-2">
                <ActionBtn label={`View Client — ${p.client.name}`} onClick={()=>navigate(`/admin/clients/${p.client.id}`)}/>
                <ActionBtn label={`View ${p.talent.type} — ${p.talent.name}`} onClick={()=>navigate(`/admin/${p.talent.type==="Agency"?"agencies":"freelancers"}/${p.talent.id}`)}/>
                {p.status==="Disputed"&&<ActionBtn label="View Dispute" variant="danger" onClick={()=>navigate("/admin/disputes")}/>}
                <ActionBtn label="View Payments" onClick={()=>navigate("/admin/payments")}/>
              </div>
            </SectionCard>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjects;