import React from "react";
import { ShieldCheck, DollarSign, Briefcase, Scale, CheckCircle } from "lucide-react";

const LandingPage = ({ onJoinClick }) => {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ================= NAVBAR ================= */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Arc<span className="text-indigo-600">Lancer</span>
          </h1>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-gray-600 hover:text-black">
              Sign In
            </button>

            <button 
              onClick={onJoinClick} 
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Join as Freelancer
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">

          <span className="inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
            FREELANCER PLATFORM
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Get Hired for Work <br />
            You Love
          </h2>

          <p className="mt-6 text-gray-600 text-lg md:text-xl">
            Build your profile, showcase your skills, get matched with verified clients
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            
            {/* ✅ Added onClick here */}
            <button 
              onClick={onJoinClick}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Join as a Freelancer →
            </button>

            <button className="px-8 py-3 border rounded-xl font-medium hover:bg-gray-100 transition">
              ▶ See How It Works
            </button>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Verified Clients Only"
            desc="No fake leads, no wasted time"
          />

          <FeatureCard
            icon={<DollarSign size={28} />}
            title="Secure Milestone Payments"
            desc="Get paid for every milestone you complete"
          />

          <FeatureCard
            icon={<Briefcase size={28} />}
            title="AI-Matched Projects"
            desc="No bidding wars, no spam proposals"
          />

          <FeatureCard
            icon={<Scale size={28} />}
            title="Platform Protection"
            desc="You're protected if a client doesn't pay"
          />
        </div>
      </section>

      {/* ================= WHY SECTION ================= */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-10">
          <h3 className="text-2xl font-bold text-center mb-10">
            Why Freelancers Choose ArcLancer
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <CheckItem text="No hidden fees until you earn" />
            <CheckItem text="Keep up to 90% of every project" />
            <CheckItem text="Cancel or pause anytime" />
            <CheckItem text="Admin support 24/7" />
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          <Stat number="8,500+" label="Verified Professionals" />
          <Stat number="94%" label="Completion Rate" />
          <Stat number="$12M+" label="Paid to Freelancers" />
          <Stat number="4.8 ★" label="Avg Rating" />
        </div>
      </section>

    </div>
  );
};

// ================= REUSABLE COMPONENTS =================

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
        {icon}
      </div>
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
};

const CheckItem = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="text-green-500" size={20} />
      <p>{text}</p>
    </div>
  );
};

const Stat = ({ number, label }) => {
  return (
    <div>
      <h4 className="text-3xl font-bold">{number}</h4>
      <p className="text-gray-500 mt-2">{label}</p>
    </div>
  );
};

export default LandingPage;