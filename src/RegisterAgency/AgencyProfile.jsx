import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsCheckCircleFill, BsFillStarFill, BsGlobe,
  BsLightningChargeFill, BsAward, BsCodeSlash,
  BsPhone, BsPalette, BsServer, BsCloud, BsShield,
  BsBoxArrowUpRight
} from "react-icons/bs";
import { MdLocationOn, MdOutlineVerified } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";

const TABS = ["Overview", "Services", "Portfolio", "Team", "Reviews"];

const agency = {
  name:    "TechVision Software Solutions",
  initials:"TV",
  tagline: "Mobile & Web App Development Agency",
  location:"Mumbai, India",
  teamSize:"25 team members",
  founded: "2019",
  rating:  "4.9",
  projects: 47,
  minBudget:"$5,000",
  badges:  ["Verified Agency","React Elite","Node Pro+"],
  about:   "TechVision Software Solutions is a full-service mobile and web development agency based in Mumbai, India. With a team of 25+ skilled professionals, we've delivered 47 projects across 12 countries with a 4.9-star average rating. We specialize in building production-grade applications for e-commerce, fintech, healthcare, and SaaS industries. Our AI-verified code quality score is 86/100, with expertise spanning React, Node.js, React Native, and cloud infrastructure.",
  techStack:["React","Node.js","TypeScript","PostgreSQL","AWS","Docker","React Native","Figma","GraphQL","Redis"],
  industries:["E-commerce","Fintech","Healthcare","SaaS","EdTech"],
  certifications:["AWS Certified","ISO 27001","Google Cloud Partner"],
};

const services = [
  { icon:<BsCodeSlash className="text-blue-500 text-2xl" />, title:"Web Development",  desc:"React, Vue, Angular, Next.js"                    },
  { icon:<BsPhone    className="text-blue-500 text-2xl" />, title:"Mobile Apps",        desc:"React Native, Flutter, iOS, Android"             },
  { icon:<BsPalette  className="text-blue-500 text-2xl" />, title:"UI/UX Design",       desc:"Figma, Adobe XD, Design Systems"                 },
  { icon:<BsServer   className="text-blue-500 text-2xl" />, title:"Backend & APIs",     desc:"Node.js, Python, PostgreSQL, MongoDB"            },
  { icon:<BsCloud    className="text-blue-500 text-2xl" />, title:"DevOps & Cloud",     desc:"AWS, Docker, CI/CD, Kubernetes"                  },
  { icon:<BsShield   className="text-blue-500 text-2xl" />, title:"Security & QA",      desc:"Pen testing, Code reviews, Testing"              },
];

const portfolio = [
  { title:"Food Delivery App",    client:"ByteEats Co. (verified)", budget:"$42,000", duration:"5.5 months", tags:["React Native","Node","PostgreSQL"], result:"10K+ active users at launch",   rating:5, review:"Exceptional work"          },
  { title:"E-commerce Platform",  client:"GlobalShop (verified)",   budget:"$28,000", duration:"4 months",   tags:["React","Django","AWS"],             result:"50% faster than old system",    rating:5, review:"Highly professional team"   },
  { title:"Healthcare Dashboard", client:"MedTrack (verified)",     budget:"$35,000", duration:"6 months",   tags:["Vue.js","Python","Docker"],          result:"Used by 200+ clinics",          rating:4, review:"Great delivery, minor delays"},
];

const team = [
  { initials:"R", name:"Raj Kumar", role:"Agency Admin · Full Stack", hours:"40h/week", skills:[{name:"React",type:"check"},{name:"Node",type:"check"},{name:"AWS",type:"dot"}]              },
  { initials:"S", name:"Sara M.",   role:"Frontend Specialist",       hours:"30h/week", skills:[{name:"React",type:"dot"},{name:"TypeScript",type:"dot"},{name:"Figma",type:"check"}]         },
  { initials:"D", name:"Dev Mike",  role:"Backend Engineer",          hours:"40h/week", skills:[{name:"Node",type:"check"},{name:"PostgreSQL",type:"dot"},{name:"Docker",type:"check"}]       },
  { initials:"P", name:"Priya S.",  role:"UI/UX Designer",            hours:"35h/week", skills:[{name:"Figma",type:"dot"},{name:"Adobe XD",type:"dot"}]                                      },
  { initials:"J", name:"James L.",  role:"DevOps Engineer",           hours:"40h/week", skills:[{name:"AWS",type:"dot"},{name:"Docker",type:"check"},{name:"K8s",type:"check"}]              },
];

const reviews = [
  { company:"ByteEats Co.", date:"Jan 2026", rating:5, text:"TechVision delivered an outstanding food delivery app. The team was professional, responsive, and delivered on time. Highly recommend!" },
  { company:"GlobalShop",   date:"Dec 2025", rating:5, text:"Exceptional quality and communication throughout the project. The e-commerce platform exceeded our expectations."                      },
  { company:"MedTrack",     date:"Nov 2025", rating:4, text:"Great technical work with a very capable team. Some minor delays but overall an excellent experience."                               },
];

const StarRating = ({ count, max = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <BsFillStarFill key={i} className={i < count ? "text-yellow-400" : "text-gray-200"} />
    ))}
  </div>
);

const SkillBadge = ({ name, type }) => (
  <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${type==="check"?"bg-green-50 text-green-700 border border-green-100":"bg-blue-50 text-blue-600 border border-blue-100"}`}>
    {name}{type==="check" ? " ✅" : " 🔵"}
  </span>
);

const AgencyProfile = () => {
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Navbar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex justify-between items-center">
        <span className="text-blue-600 font-extrabold text-xl tracking-tight">ArcLancer</span>
        <button onClick={() => navigate(-1)} className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1">← Back</button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-5">

        {/* Header Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 mb-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl sm:text-2xl font-extrabold flex-shrink-0">
              TV
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">{agency.name}</h1>
                <BsCheckCircleFill className="text-green-500 text-lg" />
              </div>
              <p className="text-gray-500 text-sm mb-3">{agency.tagline}</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1"><MdLocationOn /> {agency.location}</span>
                <span className="flex items-center gap-1"><HiUserGroup /> {agency.teamSize}</span>
                <span className="hidden sm:inline">Founded: {agency.founded}</span>
                <span className="flex items-center gap-1 font-semibold text-yellow-500">
                  <BsFillStarFill className="text-yellow-400" />{agency.rating}
                  <span className="text-gray-400 font-normal">({agency.projects} projects)</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {agency.badges.map((b, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                    {i===0 && <BsGlobe className="text-blue-400" />} {b}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                <span className="text-gray-600">🔥 Projects from <strong>{agency.minBudget}</strong></span>
                <span className="flex items-center gap-1 text-green-500 font-semibold">
                  <BsLightningChargeFill className="text-yellow-400" /> Available Now
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg transition-colors">
              <FiSend /> Invite to Project
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg border border-gray-200 transition-colors">
              <MdOutlineVerified /> View Portfolio
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg border border-gray-200 transition-colors">
              <BiMessageDetail /> Contact
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3.5 text-sm font-semibold transition-colors border-b-2 -mb-px whitespace-nowrap ${activeTab===tab?"border-blue-600 text-blue-600":"border-transparent text-gray-500 hover:text-gray-800"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab==="Overview" && (
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{agency.about}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {agency.techStack.map(tech => (
                  <span key={tech} className="px-3 sm:px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">{tech}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">Industry Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {agency.industries.map(ind => (
                    <span key={ind} className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600">{ind}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">Certifications</h2>
                <div className="flex flex-col gap-3">
                  {agency.certifications.map(cert => (
                    <div key={cert} className="flex items-center gap-2 text-sm text-gray-600">
                      <BsAward className="text-blue-500 text-base flex-shrink-0" /> {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab==="Services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3">{s.icon}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab==="Portfolio" && (
          <div className="flex flex-col gap-4">
            {portfolio.map((p, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{p.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Client: {p.client}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">{p.budget} · {p.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map(t => <span key={t} className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600">{t}</span>)}
                </div>
                <p className="text-xs text-gray-600 mb-2">📊 Result: {p.result}</p>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <StarRating count={p.rating} />
                  <span className="text-xs text-gray-400 italic">"{p.review}"</span>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                  <BsBoxArrowUpRight className="text-xs" /> View Case Study
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Team Tab */}
        {activeTab==="Team" && (
          <div className="flex flex-col gap-3">
            {team.map((member, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-6 py-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900">{member.name}</div>
                  <p className="text-xs text-gray-400 mb-2">{member.role}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((sk, j) => <SkillBadge key={j} name={sk.name} type={sk.type} />)}
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-400 whitespace-nowrap self-start sm:self-auto">{member.hours}</span>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab==="Reviews" && (
          <div className="flex flex-col gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-900">{r.company}</span>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <StarRating count={r.rating} />
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AgencyProfile;