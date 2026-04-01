import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Settings,
  Star,
  CheckCircle,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Award,
} from 'lucide-react';

/* ─────────────────────────────────────
   MOCK DATA
───────────────────────────────────────*/
const REVIEWS_GIVEN = [
  {
    id: 1,
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    talent: 'John Smith',
    talentType: 'Freelancer',
    talentInitials: 'JS',
    rating: 5,
    date: 'Dec 20, 2025',
    review: 'John delivered exceptional work. Very responsive, met all deadlines, and the quality exceeded our expectations. Highly recommend for any web design project.',
    categories: { communication: 5, quality: 5, timeliness: 5, professionalism: 5 },
  },
  {
    id: 2,
    project: 'CRM Dashboard for Internal Team',
    projectId: 3,
    talent: 'CodeCraft Agency',
    talentType: 'Agency',
    talentInitials: 'CC',
    rating: 4,
    date: 'Sep 28, 2025',
    review: 'Great team with strong technical skills. Delivered a solid CRM dashboard. Minor delays in milestone 2 but they communicated proactively and resolved it quickly.',
    categories: { communication: 4, quality: 5, timeliness: 3, professionalism: 4 },
  },
  {
    id: 3,
    project: 'Company Brand Identity Design',
    projectId: 5,
    talent: 'Maria Chen',
    talentType: 'Freelancer',
    talentInitials: 'MC',
    rating: 5,
    date: 'Jun 20, 2025',
    review: 'Maria is an absolute professional. She understood our brand vision perfectly and delivered stunning designs. Will definitely work with her again.',
    categories: { communication: 5, quality: 5, timeliness: 5, professionalism: 5 },
  },
];

const REVIEWS_RECEIVED = [
  {
    id: 1,
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    talent: 'John Smith',
    talentType: 'Freelancer',
    talentInitials: 'JS',
    rating: 5,
    date: 'Dec 21, 2025',
    review: 'Excellent client to work with. Clear requirements, prompt feedback, and very professional communication throughout. Payment was always on time. Highly recommended.',
    categories: { clarity: 5, responsiveness: 5, fairness: 5, professionalism: 5 },
  },
  {
    id: 2,
    project: 'CRM Dashboard for Internal Team',
    projectId: 3,
    talent: 'CodeCraft Agency',
    talentType: 'Agency',
    talentInitials: 'CC',
    rating: 4,
    date: 'Sep 29, 2025',
    review: 'Good client with clear business goals. Occasionally changed scope mid-project but communicated clearly. Would work with again.',
    categories: { clarity: 4, responsiveness: 4, fairness: 4, professionalism: 4 },
  },
  {
    id: 3,
    project: 'Company Brand Identity Design',
    projectId: 5,
    talent: 'Maria Chen',
    talentType: 'Freelancer',
    talentInitials: 'MC',
    rating: 5,
    date: 'Jun 21, 2025',
    review: 'One of the best clients I have worked with. Very clear brief, fast approvals, and appreciative of creative work. 10/10 would recommend.',
    categories: { clarity: 5, responsiveness: 5, fairness: 5, professionalism: 5 },
  },
];

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────────*/
function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  );
}

function avgRating(reviews) {
  if (!reviews.length) return 0;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────*/
export default function ClientReviews() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('given');

  const reviews = activeTab === 'given' ? REVIEWS_GIVEN : REVIEWS_RECEIVED;
  const avg = avgRating(reviews);

  const givenCategories  = ['Communication', 'Quality', 'Timeliness', 'Professionalism'];
  const receivedCategories = ['Clarity of Brief', 'Responsiveness', 'Fairness', 'Professionalism'];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="text-xl font-extrabold tracking-tight select-none">
              <span className="text-green-500">Web</span>
              <span className="text-[#1a3a5c]">Lance</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/hire-talent/notifications')}
              className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
              <Settings size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold ml-1">
              CL
            </div>
          </div>
        </div>
</header> */}




<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
    
    {/* Left Side */}
    <div className="flex items-center gap-3">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Logo (WebLance removed) */}
      <img
        src="/image-removebg-preview.png"
        alt="Logo"
        className="h-8 w-auto cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate('/hire-talent/notifications')}
        className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
      >
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
      </button>

      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
        <Settings size={18} />
      </button>

      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold ml-1">
        CL
      </div>
    </div>

  </div>
</header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page heading ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Reviews</h1>
          <p className="text-gray-400 text-sm mt-0.5">Reviews you gave and received across your projects.</p>
        </div>

        {/* ── Summary card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1a3a5c]">{avgRating(REVIEWS_GIVEN)}</p>
              <StarRow rating={Math.round(avgRating(REVIEWS_GIVEN))} size={14} />
              <p className="text-xs text-gray-400 mt-1">Avg given</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1a3a5c]">{avgRating(REVIEWS_RECEIVED)}</p>
              <StarRow rating={Math.round(avgRating(REVIEWS_RECEIVED))} size={14} />
              <p className="text-xs text-gray-400 mt-1">Avg received</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1a3a5c]">{REVIEWS_GIVEN.length}</p>
              <div className="flex justify-center mt-1">
                <ThumbsUp size={14} className="text-blue-500" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Reviews given</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1a3a5c]">{REVIEWS_RECEIVED.length}</p>
              <div className="flex justify-center mt-1">
                <Award size={14} className="text-amber-500" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Reviews received</p>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'given',    label: `Reviews Given`,    count: REVIEWS_GIVEN.length },
            { key: 'received', label: `Reviews Received`, count: REVIEWS_RECEIVED.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border transition ${
                activeTab === tab.key
                  ? 'text-white border-transparent'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
              style={activeTab === tab.key ? { background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' } : {}}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Context note ── */}
        <div className={`flex items-start gap-2.5 p-3.5 rounded-xl border mb-5 ${
          activeTab === 'given'
            ? 'bg-blue-50 border-blue-100'
            : 'bg-amber-50 border-amber-100'
        }`}>
          <MessageSquare size={14} className={activeTab === 'given' ? 'text-blue-600 mt-0.5 flex-shrink-0' : 'text-amber-600 mt-0.5 flex-shrink-0'} />
          <p className={`text-xs ${activeTab === 'given' ? 'text-blue-700' : 'text-amber-700'}`}>
            {activeTab === 'given'
              ? 'These are reviews you wrote for talent after project completion. Your honest feedback helps other clients make better hiring decisions.'
              : 'These are reviews talent wrote about you as a client. A good client reputation helps you attract better talent.'}
          </p>
        </div>

        {/* ── Review cards ── */}
        <div className="space-y-4">
          {reviews.map(review => {
            const cats = activeTab === 'given' ? givenCategories : receivedCategories;
            const catValues = Object.values(review.categories);

            return (
              <div key={review.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-[3px] bg-gradient-to-r from-green-400 to-blue-600" />
                <div className="p-5">

                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {review.talentInitials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1a3a5c]">{review.talent}</p>
                        <p className="text-xs text-gray-400">{review.talentType}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <StarRow rating={review.rating} size={16} />
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 justify-end">
                        <Calendar size={10} /> {review.date}
                      </p>
                    </div>
                  </div>

                  {/* Project link */}
                  <button
                    onClick={() => navigate(`/hire-talent/projects/${review.projectId}`)}
                    className="text-xs text-blue-600 font-medium hover:underline mb-3 block"
                  >
                    📁 {review.project}
                  </button>

                  {/* Review text */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100 italic">
                    "{review.review}"
                  </p>

                  {/* Category breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cats.map((cat, i) => (
                      <div key={cat} className="text-center p-2 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-400 font-medium mb-1 truncate">{cat}</p>
                        <StarRow rating={catValues[i]} size={11} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Pending reviews prompt ── */}
        <div className="mt-6 p-5 bg-white rounded-2xl border border-dashed border-amber-300 text-center">
          <Star size={28} className="text-amber-400 fill-amber-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#1a3a5c] mb-1">Have a pending review?</p>
          <p className="text-xs text-gray-400 mb-3">Go to your completed projects and leave a review for your talent.</p>
          <button
            onClick={() => navigate('/hire-talent/projects')}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition"
            style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
          >
            Go to Projects
          </button>
        </div>

      </main>
    </div>
  );
}