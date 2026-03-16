// ─── AGENCY CHANNEL A — PROJECT DATA ──────────────────────────────────────────
// This is the OFFICIAL project channel (Client ↔ Agency Team ↔ Platform Admin)
// Agency team members can participate but only Agency Admin can make binding decisions

export const PROJECT_INFO = {
  name: "E-Commerce Platform",
  startDate: "Mar 1, 2026",
  escrow: {
    total: 85000,
    released: 21250,
  },
  milestone: {
    current: 2,
    total: 4,
    name: "Backend Integration",
    due: "Apr 15",
    daysLeft: 23,
    progress: 35,
  },
};

// ─── ROLES ─────────────────────────────────────────────────────────────────────
export const ROLES = {
  admin: {
    label: "ADMIN",
    badgeClass: "bg-red-100 text-red-700 border border-red-200",
    bubbleClass: "bg-red-50 border-l-4 border-red-400",
    avatarBg: "bg-red-500",
    dotColor: "bg-red-500",
  },
  agency_admin: {
    label: "AGENCY ADMIN",
    badgeClass: "bg-blue-100 text-blue-700 border border-blue-200",
    bubbleClass: "bg-blue-50 border-l-4 border-blue-400",
    avatarBg: "bg-blue-500",
    dotColor: "bg-blue-500",
  },
  agency_team: {
    label: "AGENCY TEAM",
    badgeClass: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    bubbleClass: "bg-yellow-50 border-l-4 border-yellow-400",
    avatarBg: "bg-yellow-500",
    dotColor: "bg-yellow-500",
  },
  client: {
    label: "CLIENT",
    badgeClass: "bg-green-100 text-green-700 border border-green-200",
    bubbleClass: "bg-green-50 border-l-4 border-green-400",
    avatarBg: "bg-green-500",
    dotColor: "bg-green-500",
  },
};

// ─── MESSAGE TYPES ──────────────────────────────────────────────────────────────
export const MESSAGE_TYPES = [
  { label: "Normal", icon: "✓", color: "text-gray-400" },
  { label: "APPROVAL", icon: "✅", color: "text-green-500" },
  { label: "DECISION", icon: "🔒", color: "text-orange-500" },
  { label: "DELIVERY", icon: "📦", color: "text-blue-500" },
  { label: "DISPUTE NOTE", icon: "⚠️", color: "text-red-500" },
  { label: "CLARIFICATION", icon: "❓", color: "text-purple-500" },
];

// ─── PARTICIPANTS (Channel A has all 4 role types) ─────────────────────────────
export const PARTICIPANTS = [
  { name: "Alex R.", role: "client", online: true },
  { name: "TechCorp Agency", role: "agency_admin", online: true },
  { name: "Maya S.", role: "agency_team", online: false },
  { name: "Dev K.", role: "agency_team", online: true },
  { name: "Platform Admin", role: "admin", online: true },
];

// ─── VIEWING AS OPTIONS ────────────────────────────────────────────────────────
export const VIEWER_OPTIONS = [
  { value: "client", label: "Client" },
  { value: "agency_admin", label: "Agency Admin" },
  { value: "agency_team", label: "Agency Team" },
  { value: "admin", label: "Platform Admin" },
];

export const CURRENT_USERS = {
  client: { name: "Alex R.", role: "client", avatar: "AR" },
  agency_admin: { name: "TechCorp Agency", role: "agency_admin", avatar: "TC" },
  agency_team: { name: "Maya S.", role: "agency_team", avatar: "MS" },
  admin: { name: "Platform Admin", role: "admin", avatar: "PA" },
};

// ─── INITIAL MESSAGES ──────────────────────────────────────────────────────────
export const INITIAL_MESSAGES = [
  {
    id: 1,
    type: "system",
    content:
      "🏢 ProjectStream (Channel A) for 'E-Commerce Platform' has been created. This is the official project channel. All requirements, deliverables, approvals, deadlines, and disputes are tracked here. This space is permanent and legally logged.",
    timestamp: "Mar 1, 2026 · 10:00 AM",
  },
  {
    id: 2,
    type: "system",
    content: "💰 Escrow funded: $85,000 secured for this project.",
    timestamp: "Mar 1, 2026 · 10:00 AM",
  },
  {
    id: 3,
    role: "admin",
    sender: "Platform Admin",
    avatar: "PA",
    msgType: "Normal",
    content:
      "Welcome to the E-Commerce Platform project. I'm your platform admin monitoring this official channel. All communication, deliverables, and approvals must happen here. Agency Admin is the single point of authority for the agency team.",
    timestamp: "10:15 AM",
    seenBy: ["Alex R.", "TechCorp Agency"],
    locked: false,
  },
  {
    id: 4,
    role: "client",
    sender: "Alex R.",
    avatar: "AR",
    msgType: "Normal",
    content:
      "Hi TechCorp team! Looking forward to working together. I've uploaded the full requirements document in the Files section. Please review and confirm scope before we proceed.",
    timestamp: "10:30 AM",
    seenBy: ["Agency Admin", "Admin"],
    locked: false,
  },
  {
    id: 5,
    role: "agency_admin",
    sender: "TechCorp Agency",
    avatar: "TC",
    msgType: "Normal",
    content:
      "Hello Alex! We've reviewed the requirements document. Our team lead Maya will handle frontend and Dev K. will manage backend integration. We'll have a detailed breakdown ready by tomorrow.",
    timestamp: "11:00 AM",
    seenBy: ["Alex R.", "Admin"],
    locked: false,
  },
  {
    id: 6,
    role: "agency_team",
    sender: "Maya S.",
    avatar: "MS",
    msgType: "CLARIFICATION",
    content:
      "Hi Alex! I've gone through the UI requirements. Quick clarification — for the product listing page, should filters be persistent across sessions or reset on page refresh?",
    timestamp: "11:45 AM",
    seenBy: ["Alex R.", "Agency Admin"],
    locked: false,
  },
  {
    id: 7,
    role: "client",
    sender: "Alex R.",
    avatar: "AR",
    msgType: "APPROVAL",
    content:
      "Filters should persist across sessions — users expect their preferences saved. This is a priority UX requirement.",
    timestamp: "12:10 PM",
    seenBy: ["Maya S.", "Agency Admin", "Admin"],
    locked: false,
  },
  {
    id: 8,
    role: "agency_admin",
    sender: "TechCorp Agency",
    avatar: "TC",
    msgType: "DECISION",
    content:
      "Understood. Persistent filters confirmed as Milestone 1 requirement. Dev K. will implement session storage for filter state. We commit to delivering the complete frontend prototype by March 20, 2026.",
    timestamp: "12:30 PM",
    seenBy: ["Alex R.", "Admin"],
    locked: true,
    commitmentLogged: true,
    lockedLabel: "LOCKED DECISION — Cannot be edited or reversed",
  },
  {
    id: 9,
    type: "system",
    content: "⚠️ Agency submitted Milestone 1 deliverables. Client has 7 business days to review.",
    timestamp: "Mar 20, 2026 · 5:00 PM",
  },
  {
    id: 10,
    role: "agency_team",
    sender: "Dev K.",
    avatar: "DK",
    msgType: "DELIVERY",
    content:
      "Milestone 1 deliverables submitted. Frontend prototype includes: product listing with persistent filters, cart system, and checkout flow. All 8 screens completed as scoped.",
    timestamp: "5:10 PM",
    seenBy: ["Alex R.", "Agency Admin", "Admin"],
    files: [
      { name: "frontend_prototype_v1.fig", size: "12.4 MB" },
      { name: "component_library.zip", size: "3.1 MB" },
      { name: "milestone1_report.pdf", size: "1.8 MB" },
    ],
    locked: false,
  },
  {
    id: 11,
    role: "client",
    sender: "Alex R.",
    avatar: "AR",
    msgType: "APPROVAL",
    content:
      "The prototype looks excellent! Filters work as expected. Approved to proceed to Milestone 2 — Backend Integration.",
    timestamp: "Mar 22, 2026 · 2:00 PM",
    seenBy: ["TechCorp Agency", "Maya S.", "Admin"],
    locked: false,
  },
  {
    id: 12,
    role: "admin",
    sender: "Platform Admin",
    avatar: "PA",
    msgType: "DECISION",
    content:
      "Milestone 1 officially approved. Payment of $21,250 will release within 24h. This decision is final and non-reversible.",
    timestamp: "Mar 22, 2026 · 2:30 PM",
    seenBy: ["Alex R.", "TechCorp Agency"],
    locked: true,
    lockedLabel: "LOCKED DECISION — Cannot be edited or reversed",
  },
  {
    id: 13,
    type: "system",
    content: "✅ Client approved Milestone 1 — $21,250 released from escrow.",
    timestamp: "Mar 22, 2026 · 2:32 PM",
  },
];

// ─── TIMELINE EVENTS ───────────────────────────────────────────────────────────
export const TIMELINE_EVENTS = [
  {
    date: "March 1, 2026",
    dotColor: "bg-green-500",
    events: [
      {
        content: "ProjectStream (Channel A) for 'E-Commerce Platform' has been created. Official project channel activated.",
        time: "10:00 AM",
        locked: true,
      },
      { content: "Escrow funded: $85,000 secured for this project.", time: "10:00 AM", locked: true },
    ],
  },
  {
    date: "March 1, 2026",
    dotColor: "bg-gray-300",
    events: [
      {
        content: "TechCorp Agency confirmed scope and assigned Maya S. (Frontend) and Dev K. (Backend).",
        time: "11:00 AM",
        by: "TechCorp Agency",
        locked: false,
      },
    ],
  },
  {
    date: "March 2, 2026",
    dotColor: "bg-gray-300",
    events: [
      {
        content: "Persistent filters confirmed as Milestone 1 requirement. Agency Admin commitment logged.",
        time: "12:30 PM",
        by: "TechCorp Agency",
        locked: true,
      },
    ],
  },
  {
    date: "March 20, 2026",
    dotColor: "bg-green-500",
    events: [
      {
        content: "Milestone 1 deliverables submitted by agency. Client has 7 business days to review.",
        time: "5:10 PM",
        by: "Dev K.",
        locked: true,
      },
    ],
  },
  {
    date: "March 22, 2026",
    dotColor: "bg-green-500",
    events: [
      { content: "Client approved Milestone 1 deliverables.", time: "2:00 PM", by: "Alex R.", locked: false },
      {
        content: "Platform Admin: Milestone 1 officially approved. $21,250 released from escrow.",
        time: "2:30 PM",
        locked: true,
      },
    ],
  },
];

// ─── FILES DATA ────────────────────────────────────────────────────────────────
export const FILES_DATA = {
  milestones: [
    {
      label: "MILESTONE 1: DESIGN & PLANNING",
      status: "COMPLETED",
      files: [
        {
          name: "frontend_prototype_v1.fig",
          status: "APPROVED",
          uploader: "Dev K. (agency team)",
          date: "Mar 20, 11:00 AM",
          version: "Version 1 of 1",
          size: "12.4 MB",
        },
        {
          name: "component_library.zip",
          status: "APPROVED",
          uploader: "Maya S. (agency team)",
          date: "Mar 20, 11:05 AM",
          version: "Version 1 of 1",
          size: "3.1 MB",
        },
        {
          name: "milestone1_report.pdf",
          status: "APPROVED",
          uploader: "TechCorp Agency (agency admin)",
          date: "Mar 20, 5:10 PM",
          version: "Version 1 of 1",
          size: "1.8 MB",
        },
      ],
    },
    {
      label: "MILESTONE 2: BACKEND INTEGRATION",
      status: "IN PROGRESS",
      files: [],
    },
    {
      label: "MILESTONE 3: ADVANCED FEATURES",
      status: null,
      files: [],
    },
    {
      label: "MILESTONE 4: TESTING & LAUNCH",
      status: null,
      files: [],
    },
  ],
  documents: [
    { name: "Contract.pdf (signed)" },
    { name: "NDA.pdf (signed)" },
    { name: "Agency_SLA.pdf (signed)" },
  ],
};

// ─── MEETINGS DATA ─────────────────────────────────────────────────────────────
export const MEETINGS_DATA = {
  upcoming: [
    {
      id: 1,
      icon: "⚪",
      title: "Project Discussion — Milestone 2 backend API review",
      date: "Apr 5, 2026 · 2:00 PM IST",
      participants: "Alex R. · TechCorp Agency · Platform Admin",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700",
      actions: ["Join", "View Agenda", "Reschedule", "Cancel"],
    },
    {
      id: 2,
      icon: "🔵",
      title: "Requirement Clarification — Payment gateway integration scope",
      date: "Apr 8, 2026 · 11:00 AM EST",
      participants: "TechCorp Agency · Alex R.",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700",
      actions: ["View Agenda", "Reschedule", "Cancel"],
    },
  ],
  past: [
    {
      id: 3,
      icon: "🟠",
      title: "Delivery Review — Feb 18, 2026",
      duration: "43 min",
      participants: "2",
      summary: "Posted ✓",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },
  ],
};

// ─── SUPPORT DATA ──────────────────────────────────────────────────────────────
export const SUPPORT_DATA = [
  {
    id: "SUP-20260320-0891",
    title: "Payment or escrow issue",
    priority: "High",
    priorityColor: "bg-orange-100 text-orange-700",
    status: "Resolved",
    statusColor: "bg-green-100 text-green-700",
    date: "Mar 20, 2026 · 10:00 AM",
    description: "Milestone 1 payment approved but not yet reflected in agency account.",
    response: {
      by: "Platform Support",
      date: "Mar 20, 2:30 PM",
      content:
        "Hi Alex, we've reviewed your case. The payment release for Milestone 1 is currently processing and will appear in the agency's account within 24 business hours. No action needed on your end.",
      resolvedOn: "Mar 22, 2026",
    },
  },
  {
    id: "SUP-20260401-1042",
    title: "Contract or scope question",
    priority: "Normal",
    priorityColor: "bg-gray-100 text-gray-600",
    status: "Open",
    statusColor: "bg-yellow-100 text-yellow-700",
    date: "Apr 1, 2026 · 3:00 PM",
    description:
      "Need clarification on whether the restaurant management dashboard feature is within the original scope or requires a separate agreement.",
    response: null,
  },
];