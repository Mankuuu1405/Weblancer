import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StatCard, Avatar, SearchBar, FilterSelect,
  ActionBtn, PageHeader, Table, SectionCard, InfoRow
} from "./AdminComponents";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockKYC = [
  {
    id: "KYC-001", userId: "FL-001", name: "Rahul Sharma", email: "rahul@gmail.com",
    type: "Freelancer", subType: "Individual",
    status: "Pending", priority: "Normal",
    submittedDate: "Mar 12, 2026", waitDays: 2,
    documents: [
      { name: "Aadhaar Card",   docType: "Government ID",    status: "Submitted", aiCheck: "Pass",   aiScore: 94, note: "" },
      { name: "PAN Card",       docType: "Tax ID",           status: "Submitted", aiCheck: "Pass",   aiScore: 91, note: "" },
      { name: "Bank Statement", docType: "Financial Proof",  status: "Submitted", aiCheck: "Review", aiScore: 72, note: "Low resolution — may need re-upload" },
    ],
    aiOverallScore: 86, aiRecommendation: "Approve",
    previousAttempts: 0, country: "India", payoutBlocked: false,
  },
  {
    id: "KYC-002", userId: "AG-003", name: "PixelCraft Studio", email: "hello@pixelcraft.design",
    type: "Agency", subType: "Design Studio",
    status: "Pending", priority: "High",
    submittedDate: "Mar 10, 2026", waitDays: 4,
    documents: [
      { name: "Business Registration Certificate", docType: "Business Proof",      status: "Submitted", aiCheck: "Pass",   aiScore: 88, note: "" },
      { name: "GST Certificate",                   docType: "Tax Registration",     status: "Submitted", aiCheck: "Pass",   aiScore: 85, note: "" },
      { name: "Director Aadhaar",                  docType: "Authorized Person ID", status: "Submitted", aiCheck: "Review", aiScore: 68, note: "Name mismatch with company records — verify manually" },
      { name: "Address Proof",                     docType: "Business Address",     status: "Submitted", aiCheck: "Pass",   aiScore: 90, note: "" },
    ],
    aiOverallScore: 72, aiRecommendation: "Manual Review",
    previousAttempts: 0, country: "India", payoutBlocked: true,
  },
  {
    id: "KYC-003", userId: "FL-003", name: "Karan Malhotra", email: "karan.m@tech.com",
    type: "Freelancer", subType: "Individual",
    status: "Pending", priority: "Normal",
    submittedDate: "Mar 13, 2026", waitDays: 1,
    documents: [
      { name: "Aadhaar Card", docType: "Government ID", status: "Submitted", aiCheck: "Pass", aiScore: 96, note: "" },
      { name: "PAN Card",     docType: "Tax ID",        status: "Submitted", aiCheck: "Pass", aiScore: 93, note: "" },
    ],
    aiOverallScore: 95, aiRecommendation: "Approve",
    previousAttempts: 0, country: "India", payoutBlocked: false,
  },
  {
    id: "KYC-004", userId: "FL-004", name: "Priya Menon", email: "priya.m@freelance.com",
    type: "Freelancer", subType: "Individual",
    status: "Re-upload Required", priority: "Low",
    submittedDate: "Mar 1, 2026", waitDays: 13,
    documents: [
      { name: "Aadhaar Card", docType: "Government ID", status: "Rejected", aiCheck: "Fail", aiScore: 31, note: "Document appears tampered — rejected" },
      { name: "PAN Card",     docType: "Tax ID",        status: "Rejected", aiCheck: "Fail", aiScore: 28, note: "Name does not match account registration" },
    ],
    aiOverallScore: 29, aiRecommendation: "Reject",
    previousAttempts: 2, country: "India", payoutBlocked: true,
  },
  {
    id: "KYC-005", userId: "FL-005", name: "Neha Gupta", email: "neha@designcraft.in",
    type: "Freelancer", subType: "Individual",
    status: "Approved", priority: "Normal",
    submittedDate: "Jun 8, 2024", waitDays: 0,
    documents: [
      { name: "Aadhaar Card", docType: "Government ID", status: "Approved", aiCheck: "Pass", aiScore: 97, note: "" },
      { name: "PAN Card",     docType: "Tax ID",        status: "Approved", aiCheck: "Pass", aiScore: 95, note: "" },
    ],
    aiOverallScore: 96, aiRecommendation: "Approve",
    previousAttempts: 0, country: "India", payoutBlocked: false,
  },
  {
    id: "KYC-006", userId: "AG-001", name: "TechNova Solutions", email: "admin@technova.io",
    type: "Agency", subType: "Pvt Ltd",
    status: "Approved", priority: "Normal",
    submittedDate: "Mar 6, 2025", waitDays: 0,
    documents: [
      { name: "Certificate of Incorporation", docType: "Business Proof",      status: "Approved", aiCheck: "Pass", aiScore: 99, note: "" },
      { name: "GST Certificate",              docType: "Tax Registration",     status: "Approved", aiCheck: "Pass", aiScore: 97, note: "" },
      { name: "Director PAN",                 docType: "Authorized Person ID", status: "Approved", aiCheck: "Pass", aiScore: 98, note: "" },
      { name: "Bank Statement",               docType: "Financial Proof",      status: "Approved", aiCheck: "Pass", aiScore: 94, note: "" },
    ],
    aiOverallScore: 97, aiRecommendation: "Approve",
    previousAttempts: 0, country: "India", payoutBlocked: false,
  },
  {
    id: "KYC-007", userId: "CL-005", name: "FakeUser999", email: "fakeuser@temp.xyz",
    type: "Freelancer", subType: "Individual",
    status: "Rejected", priority: "High",
    submittedDate: "Feb 28, 2026", waitDays: 0,
    documents: [
      { name: "ID Document", docType: "Government ID", status: "Rejected", aiCheck: "Fail", aiScore: 8, note: "Fake document detected by AI — possible fraud" },
    ],
    aiOverallScore: 8, aiRecommendation: "Reject + Flag",
    previousAttempts: 3, country: "Unknown", payoutBlocked: true,
  },
];

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────
const statusStyle = {
  "Pending":            "bg-yellow-50 text-yellow-700 border border-yellow-200",
  "Approved":           "bg-green-50 text-green-700 border border-green-200",
  "Rejected":           "bg-red-50 text-red-700 border border-red-200",
  "Re-upload Required": "bg-orange-50 text-orange-700 border border-orange-200",
  "Under Review":       "bg-blue-50 text-blue-700 border border-blue-200",
};

const aiCheckStyle = {
  Pass:   "bg-green-50 text-green-700 border border-green-200",
  Review: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Fail:   "bg-red-50 text-red-700 border border-red-200",
};

const priorityDot = { High: "bg-red-500", Normal: "bg-gray-300", Low: "bg-gray-200" };

// ─── SHARED TABLE ─────────────────────────────────────────────────────────────
function KYCTable({ data, onSelect }) {
  return (
    <Table headers={["Applicant", "Type", "Status", "AI Score", "AI Rec.", "Docs", "Wait", "Attempts", "Priority", "Actions"]}>
      {data.map((k) => (
        <tr key={k.id}
          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
          onClick={() => onSelect(k)}>
          <td className="py-3 pr-4">
            <div className="flex items-center gap-2.5">
              <Avatar name={k.name} size="sm" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{k.name}</p>
                <p className="text-xs text-gray-400">{k.email}</p>
                <p className="text-[10px] text-gray-300">{k.id}</p>
              </div>
            </div>
          </td>
          <td className="py-3 pr-4">
            <p className="text-xs font-semibold text-gray-700">{k.type}</p>
            <p className="text-[10px] text-gray-400">{k.subType}</p>
          </td>
          <td className="py-3 pr-4">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[k.status]}`}>
              {k.status}
            </span>
          </td>
          <td className="py-3 pr-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${k.aiOverallScore >= 80 ? "bg-green-500" : k.aiOverallScore >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                  style={{ width: `${k.aiOverallScore}%` }}
                />
              </div>
              <span className={`text-xs font-bold ${k.aiOverallScore >= 80 ? "text-green-600" : k.aiOverallScore >= 60 ? "text-yellow-600" : "text-red-500"}`}>
                {k.aiOverallScore}
              </span>
            </div>
          </td>
          <td className="py-3 pr-4">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              k.aiRecommendation === "Approve" ? "bg-green-50 text-green-700 border border-green-200"
              : k.aiRecommendation.includes("Reject") ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-yellow-50 text-yellow-700 border border-yellow-200"
            }`}>
              {k.aiRecommendation}
            </span>
          </td>
          <td className="py-3 pr-4 text-center text-sm font-semibold text-gray-700">{k.documents.length}</td>
          <td className="py-3 pr-4">
            <span className={`text-xs font-semibold ${k.waitDays > 3 ? "text-red-500" : k.waitDays > 1 ? "text-yellow-600" : "text-gray-500"}`}>
              {k.waitDays === 0 ? "—" : `${k.waitDays}d`}
            </span>
          </td>
          <td className="py-3 pr-4 text-center">
            <span className={`text-xs font-semibold ${k.previousAttempts > 1 ? "text-red-500" : "text-gray-600"}`}>
              {k.previousAttempts}
            </span>
          </td>
          <td className="py-3 pr-4">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${priorityDot[k.priority]}`} />
              <span className="text-xs text-gray-500">{k.priority}</span>
            </div>
          </td>
          <td className="py-3">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ActionBtn label="Review" variant="primary" onClick={(e) => { e.stopPropagation(); onSelect(k); }} />
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
}

// ─── DETAIL DRAWER ────────────────────────────────────────────────────────────
function KYCDrawer({ kyc, onClose, onAction }) {
  const [decision, setDecision] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [reuploadNote, setReuploadNote] = useState("");

  if (!kyc) return null;

  const isPending = kyc.status === "Pending" || kyc.status === "Under Review";

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>

        {/* Sticky Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900">{kyc.name}</h2>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[kyc.status]}`}>{kyc.status}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{kyc.id} · {kyc.type} · {kyc.email}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
        </div>

        <div className="p-5 space-y-5">

          {/* AI Score Banner */}
          <div className={`p-4 rounded-xl border ${
            kyc.aiOverallScore >= 80 ? "bg-green-50 border-green-100"
            : kyc.aiOverallScore >= 60 ? "bg-yellow-50 border-yellow-100"
            : "bg-red-50 border-red-100"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-bold ${kyc.aiOverallScore >= 80 ? "text-green-800" : kyc.aiOverallScore >= 60 ? "text-yellow-800" : "text-red-800"}`}>
                ◎ AI Pre-Check Result
              </span>
              <span className={`text-2xl font-black ${kyc.aiOverallScore >= 80 ? "text-green-600" : kyc.aiOverallScore >= 60 ? "text-yellow-600" : "text-red-500"}`}>
                {kyc.aiOverallScore}
                <span className="text-sm font-normal">/100</span>
              </span>
            </div>
            <div className="h-2 bg-white/70 rounded-full overflow-hidden mb-2">
              <div className={`h-full rounded-full transition-all ${kyc.aiOverallScore >= 80 ? "bg-green-500" : kyc.aiOverallScore >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                style={{ width: `${kyc.aiOverallScore}%` }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className={kyc.aiOverallScore >= 80 ? "text-green-600" : kyc.aiOverallScore >= 60 ? "text-yellow-600" : "text-red-600"}>
                AI Recommendation
              </span>
              <span className={`font-bold ${kyc.aiOverallScore >= 80 ? "text-green-700" : kyc.aiOverallScore >= 60 ? "text-yellow-700" : "text-red-600"}`}>
                {kyc.aiRecommendation}
              </span>
            </div>
          </div>

          {/* Applicant Info */}
          <SectionCard title="Applicant Information">
            <InfoRow label="Full Name"    value={kyc.name} />
            <InfoRow label="Email"        value={kyc.email} />
            <InfoRow label="Type"         value={`${kyc.type} — ${kyc.subType}`} />
            <InfoRow label="Country"      value={kyc.country} />
            <InfoRow label="Submitted"    value={kyc.submittedDate} />
            <InfoRow label="Past Attempts" value={
              kyc.previousAttempts > 0
                ? <span className="text-red-500 font-bold">{kyc.previousAttempts} failed</span>
                : "First submission"
            } />
            <InfoRow label="Payout Status" value={
              kyc.payoutBlocked
                ? <span className="text-red-500 font-semibold">Blocked — pending KYC</span>
                : <span className="text-green-600 font-semibold">Unlocked</span>
            } />
          </SectionCard>

          {/* Documents */}
          <SectionCard title={`Documents — ${kyc.documents.length} submitted`}>
            <div className="space-y-3">
              {kyc.documents.map((doc, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-400">{doc.docType}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${aiCheckStyle[doc.aiCheck]}`}>
                        {doc.aiCheck}
                      </span>
                      <span className={`text-xs font-bold ${doc.aiScore >= 80 ? "text-green-600" : doc.aiScore >= 60 ? "text-yellow-600" : "text-red-500"}`}>
                        {doc.aiScore}%
                      </span>
                    </div>
                  </div>

                  {/* Doc preview placeholder */}
                  <div className="h-16 bg-white rounded-lg border border-gray-200 border-dashed flex items-center justify-center mb-2">
                    <div className="text-center">
                      <span className="text-xl">📄</span>
                      <p className="text-[10px] text-gray-400 mt-0.5">{doc.name}</p>
                    </div>
                  </div>

                  {doc.note && (
                    <div className="flex items-start gap-1.5 p-2 bg-yellow-50 rounded-lg border border-yellow-100 mb-2">
                      <span className="text-yellow-500 text-xs mt-0.5 shrink-0">⚠</span>
                      <p className="text-xs text-yellow-700">{doc.note}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <button className="text-xs text-blue-600 hover:underline font-medium">View Full</button>
                    <button className="text-xs text-blue-600 hover:underline font-medium">Download</button>
                    {doc.status !== "Approved" && (
                      <button className="text-xs text-red-400 hover:underline font-medium ml-auto">Flag</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Decision Panel */}
          {isPending ? (
            <SectionCard title="Admin Decision">
              <div className="space-y-2 mb-4">
                {[
                  { key: "approve",  label: "✓ Approve KYC",          desc: "All docs verified — account fully unlocked",         color: "green"  },
                  { key: "reject",   label: "✕ Reject KYC",           desc: "Documents invalid or fraudulent",                    color: "red"    },
                  { key: "reupload", label: "↩ Request Re-upload",    desc: "Some documents need to be resubmitted",              color: "orange" },
                  { key: "review",   label: "⏳ Mark Under Review",   desc: "Flag for deeper manual review",                      color: "blue"   },
                ].map((d) => (
                  <button key={d.key} onClick={() => setDecision(decision === d.key ? "" : d.key)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border transition-colors ${
                      decision === d.key
                        ? d.color === "green"  ? "border-green-400 bg-green-50"
                        : d.color === "red"    ? "border-red-400 bg-red-50"
                        : d.color === "orange" ? "border-orange-400 bg-orange-50"
                        : "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}>
                    <p className={`text-sm font-semibold ${
                      decision === d.key
                        ? d.color === "green"  ? "text-green-700"
                        : d.color === "red"    ? "text-red-700"
                        : d.color === "orange" ? "text-orange-700"
                        : "text-blue-700"
                        : "text-gray-700"
                    }`}>{d.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{d.desc}</p>
                  </button>
                ))}
              </div>

              {decision === "reject" && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Select rejection reason *</p>
                  <div className="space-y-1.5">
                    {[
                      "Document appears tampered or forged",
                      "Name mismatch with account",
                      "Expired document submitted",
                      "Poor image quality — unreadable",
                      "Wrong document type",
                      "Other",
                    ].map((r) => (
                      <label key={r} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${rejectReason === r ? "border-red-300 bg-red-50 text-red-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                        <input type="radio" name="rejectReason" value={r} checked={rejectReason === r} onChange={() => setRejectReason(r)} className="accent-red-500" />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {decision === "reupload" && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1.5">Re-upload instructions for user *</p>
                  <textarea value={reuploadNote} onChange={(e) => setReuploadNote(e.target.value)}
                    placeholder="Explain what needs to be re-uploaded and why..."
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-400"
                    rows={3} />
                </div>
              )}

              {decision && (
                <button
                  onClick={() => { onAction(kyc.id, decision, rejectReason || reuploadNote); onClose(); }}
                  className={`w-full py-2.5 text-sm font-bold rounded-lg transition-colors ${
                    decision === "approve" ? "bg-green-500 text-white hover:bg-green-600"
                    : decision === "reject" ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Confirm — {
                    decision === "approve"  ? "Approve KYC" :
                    decision === "reject"   ? "Reject KYC" :
                    decision === "reupload" ? "Send Re-upload Request" :
                    "Mark Under Review"
                  }
                </button>
              )}
            </SectionCard>
          ) : (
            <div className={`p-4 rounded-xl border ${kyc.status === "Approved" ? "bg-green-50 border-green-200" : kyc.status === "Rejected" ? "bg-red-50 border-red-200" : "bg-orange-50 border-orange-200"}`}>
              <p className={`text-sm font-bold ${kyc.status === "Approved" ? "text-green-700" : kyc.status === "Rejected" ? "text-red-700" : "text-orange-700"}`}>
                {kyc.status === "Approved" ? "✓ KYC Approved" : kyc.status === "Rejected" ? "✕ KYC Rejected" : "↩ Re-upload Requested"}
              </p>
              <p className="text-xs text-gray-500 mt-1">This KYC has already been processed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SHARED LIST PAGE COMPONENT ───────────────────────────────────────────────
function KYCListPage({ filterType }) {
  const navigate = useNavigate();
  const [kycData, setKycData]       = useState(mockKYC);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("");
  const [selected, setSelected]     = useState(null);

  const isAll      = !filterType;
  const isAgency   = filterType === "Agency";

  const base = isAll ? kycData : kycData.filter(k => k.type === filterType);

  const filtered = base.filter((k) => {
    const q = search.toLowerCase();
    return (
      (k.name.toLowerCase().includes(q) || k.email.toLowerCase().includes(q) || k.id.toLowerCase().includes(q)) &&
      (!statusFilter || k.status === statusFilter)
    );
  });

  const handleAction = (id, decision) => {
    const map = { approve: "Approved", reject: "Rejected", reupload: "Re-upload Required", review: "Under Review" };
    setKycData(prev => prev.map(k => k.id === id ? { ...k, status: map[decision] } : k));
    setSelected(prev => prev ? { ...prev, status: map[decision] } : null);
  };

  const pending     = base.filter(k => k.status === "Pending").length;
  const approved    = base.filter(k => k.status === "Approved").length;
  const rejected    = base.filter(k => k.status === "Rejected" || k.status === "Re-upload Required").length;
  const highPri     = base.filter(k => k.priority === "High" && k.status === "Pending").length;

  return (
    <div className="p-6">
      <PageHeader
        title={isAll ? "KYC & Verification" : isAgency ? "Agency KYC" : "Freelancer KYC"}
        subtitle={
          isAll    ? "Review identity & business documents before unlocking accounts" :
          isAgency ? "Business document verification for agencies & companies" :
                     "Identity verification for individual freelancers"
        }
        actions={
          <div className="flex gap-2">
            {!isAll && <ActionBtn label="← All KYC" onClick={() => navigate("/admin/kyc")} />}
            {isAll && <ActionBtn label="Freelancer KYC" onClick={() => navigate("/admin/kyc/freelancers")} />}
            {isAll && <ActionBtn label="Agency KYC"     onClick={() => navigate("/admin/kyc/agencies")} />}
            {isAgency   && <ActionBtn label="Freelancer KYC →" onClick={() => navigate("/admin/kyc/freelancers")} />}
            {!isAgency && filterType && <ActionBtn label="Agency KYC →" onClick={() => navigate("/admin/kyc/agencies")} />}
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Pending Review"    value={pending}  sub="Awaiting decision"  color="orange" />
        <StatCard label="High Priority"     value={highPri}  sub="Waiting > 3 days"   color="red"    />
        <StatCard label="Approved"          value={approved}                           color="green"  />
        <StatCard label="Rejected / Issues" value={rejected}                           color="gray"   />
      </div>

      {/* Agency-specific info */}
      {isAgency && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 flex items-start gap-2.5">
          <span className="text-blue-500 text-sm mt-0.5 shrink-0">ℹ</span>
          <p className="text-xs text-blue-700 leading-relaxed">
            Agency KYC requires: Business Registration Certificate, GST/VAT, Authorized Person ID, and Address Proof.
            All documents must match the legal entity name.
          </p>
        </div>
      )}

      {/* Tab nav */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { label: "All KYC",      path: "/admin/kyc",             active: isAll      },
          { label: "Freelancers",  path: "/admin/kyc/freelancers", active: !isAll && !isAgency },
          { label: "Agencies",     path: "/admin/kyc/agencies",    active: isAgency   },
        ].map((tab) => (
          <button key={tab.label} onClick={() => navigate(tab.path)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${tab.active ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search name, email, KYC ID...">
            {isAll && (
              <FilterSelect value={""} onChange={() => {}} label="All Types"
                options={[{ value: "Freelancer", label: "Freelancer" }, { value: "Agency", label: "Agency" }]} />
            )}
            <FilterSelect value={statusFilter} onChange={setStatus} label="All Status"
              options={[
                { value: "Pending",            label: "Pending"            },
                { value: "Under Review",       label: "Under Review"       },
                { value: "Approved",           label: "Approved"           },
                { value: "Rejected",           label: "Rejected"           },
                { value: "Re-upload Required", label: "Re-upload Required" },
              ]} />
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} results</span>
        </div>

        <KYCTable data={filtered} onSelect={setSelected} />

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-sm">No KYC records match your filters</p>
          </div>
        )}
        <div className="px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {base.length} submissions</span>
        </div>
      </div>

      <KYCDrawer kyc={selected} onClose={() => setSelected(null)} onAction={handleAction} />
    </div>
  );
}

// ─── PAGE: /admin/kyc ─────────────────────────────────────────────────────────
export function AdminKYC() {
  return <KYCListPage filterType={null} />;
}

// ─── PAGE: /admin/kyc/:id ─────────────────────────────────────────────────────
export function AdminKYCDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kycData, setKycData] = useState(mockKYC);

  const kyc = kycData.find(k => k.id === id);

  const handleAction = (kycId, decision) => {
    const map = { approve: "Approved", reject: "Rejected", reupload: "Re-upload Required", review: "Under Review" };
    setKycData(prev => prev.map(k => k.id === kycId ? { ...k, status: map[decision] } : k));
  };

  if (!kyc) return (
    <div className="p-6 text-center py-24 space-y-3">
      <p className="text-gray-400">KYC record not found</p>
      <ActionBtn label="← Back to KYC" onClick={() => navigate("/admin/kyc")} size="md" />
    </div>
  );

  return (
    <div className="p-6">
      <button onClick={() => navigate("/admin/kyc")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5">
        ← All KYC
      </button>
      {/* Render as full-page by opening drawer immediately */}
      <div className="relative">
        <KYCDrawer
          kyc={kycData.find(k => k.id === id)}
          onClose={() => navigate("/admin/kyc")}
          onAction={handleAction}
        />
      </div>
    </div>
  );
}

// ─── PAGE: /admin/kyc/agencies ────────────────────────────────────────────────
export function AdminKYCAgencies() {
  return <KYCListPage filterType="Agency" />;
}

// ─── PAGE: /admin/kyc/freelancers ─────────────────────────────────────────────
export function AdminKYCFreelancers() {
  return <KYCListPage filterType="Freelancer" />;
}