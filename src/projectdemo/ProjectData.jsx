// ── ProjectData.js ────────────────────────────────────
// No visual changes needed — data only file.
// Updated roleColor values to match G token classes used in ProjectStreamDemo.

export const participants = [
  { name: "John D.",        role: "CLIENT",     online: true  },
  { name: "Sara M.",        role: "FREELANCER", online: true  },
  { name: "Platform Admin", role: "ADMIN",      online: true  },
];

export const quickActions = [
  { label: "Submit Milestone" },
  { label: "Request Meeting"  },
  { label: "Get Support"      },
];

export const pinnedMessages = [
  {
    id: 1,
    body: "Reviewed all 12 wireframe screens for the food delivery app. Client provided feedback on navigation flow and visual design preferences.",
    decisions: [
      "Wireframes approved with 2 minor changes",
      "Color scheme Option B selected",
    ],
    actions: [
      { text: "Sara M. → Update wireframe screens 5 and 9", due: "Feb 20, 2026" },
      { text: "Sara M. → Begin Design phase after Feb 20",  due: "Feb 21, 2026" },
    ],
    seenBy: ["John D.", "Sara M."],
  },
];

export const timelineGroups = [
  { date: "February 11, 2026", events: [
    { id:1, icon:"📌", text:'ProjectStream for "Food Delivery App" has been created. All communication, deliverables, decisions, and payments for this project will be tracked here. This space is permanent and legally logged.', time:"2:14 PM", locked:true, by:null },
    { id:2, icon:"💰", text:"Escrow funded: $42,000 secured for this project.", time:"2:14 PM", locked:true, by:null },
  ]},
  { date: "February 12, 2026", events: [
    { id:3, icon:"💬", text:"I will deliver the complete UI designs by this Friday, Feb 14 by 6pm EST. All 12 screens will be included.", time:"10:30 AM", locked:false, by:"Sara M." },
  ]},
  { date: "March 11, 2026", events: [
    { id:4, icon:"📦", text:"Milestone 1 deliverables have been submitted for your review. Please find the wireframes, UI designs, and technical architecture document attached.", time:"4:20 PM", locked:false, by:"Sara M." },
    { id:5, icon:"📦", text:"Freelancer submitted Milestone 1 deliverables. Client has 7 business days to review.", time:"4:20 PM", locked:true, by:null },
  ]},
  { date: "March 13, 2026", events: [
    { id:6, icon:"✅", text:"The wireframes look great! Approved. Please proceed to the design phase.", time:"3:45 PM", locked:false, by:"John D." },
    { id:7, icon:"🔒", text:"Milestone 1 has been officially approved. Payment of $8,400 will release within 24h. This decision is final and non-reversible.", time:"4:00 PM", locked:true, by:"Platform Admin" },
    { id:8, icon:"💰", text:"Client approved Milestone 1 — $8,400 released from escrow.", time:"4:02 PM", locked:true, by:null },
  ]},
  { date: "March 15, 2026", events: [
    { id:9, icon:"⚠️", text:'Your project "Food Delivery App" has been flagged for scope creep. The following requests fall outside the original agreement: 1. Restaurant management dashboard 2. Real-time analytics panel Please review and confirm you understand.', time:"2:00 PM", locked:false, by:"Platform Admin" },
  ]},
  { date: "March 18, 2026", events: [
    { id:10, icon:"📝", text:"Working on the order tracking module now. The API integration is going smoothly. Should have a demo ready by end of this week.", time:"11:00 AM", locked:false, by:"Sara M." },
  ]},
];