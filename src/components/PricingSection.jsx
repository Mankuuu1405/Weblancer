import React, { useState } from "react";
import { FiArrowUpRight, FiCheck, FiZap } from "react-icons/fi";
import { HiOutlineUserGroup, HiOutlineLightningBolt } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";

/* ─────────────────────────────────────────────────────
   WEBLANCE PALETTE (matching Hero.jsx)
   Green  : #6FDA44  →  #42A82D
   Blue   : #1B72C0  →  #0D4A8F
   Navy   : #0D2855
   ───────────────────────────────────────────────────── */

// ── DATA ──────────────────────────────────────────────────────────────────────

const freelancerPlans = {
  monthly: [
    {
      name: "Starter",
      price: 2500,
      projects: 2,
      budget: "₹40,000",
      proposals: 10,
      popular: false,
    },
    {
      name: "Growth",
      price: 5000,
      projects: 5,
      budget: "₹70,000",
      proposals: 20,
      popular: true,
    },
    {
      name: "Pro",
      price: 7500,
      projects: 8,
      budget: "₹1,00,000",
      proposals: 40,
      popular: false,
    },
  ],
  halfYearly: [
    {
      name: "Starter",
      price: 18000,
      projects: 4,
      budget: "₹75,000",
      proposals: 20,
      popular: false,
    },
    {
      name: "Growth",
      price: 24000,
      projects: 8,
      budget: "₹1,50,000",
      proposals: 35,
      popular: true,
    },
    {
      name: "Pro",
      price: 35000,
      projects: 15,
      budget: "Unlimited",
      proposals: 60,
      popular: false,
    },
  ],
  yearly: [
    {
      name: "Starter",
      price: 25000,
      projects: 4,
      budget: "₹75,000",
      proposals: 20,
      popular: false,
    },
    {
      name: "Growth",
      price: 36000,
      projects: 10,
      budget: "₹3,00,000",
      proposals: 40,
      popular: true,
    },
    {
      name: "Pro",
      price: 50000,
      projects: 15,
      budget: "Unlimited",
      proposals: 60,
      popular: false,
    },
  ],
};

const agencyPlans = {
  monthly: [
    {
      name: "Starter",
      price: 3500,
      projects: 3,
      budget: "₹40,000",
      proposals: 15,
      members: 1,
      popular: false,
    },
    {
      name: "Growth",
      price: 6000,
      projects: 6,
      budget: "₹70,000",
      proposals: 25,
      members: 3,
      popular: true,
    },
    {
      name: "Pro",
      price: 8500,
      projects: 10,
      budget: "₹1,00,000",
      proposals: 45,
      members: 5,
      popular: false,
    },
  ],
  halfYearly: [
    {
      name: "Starter",
      price: 20000,
      projects: 5,
      budget: "₹75,000",
      proposals: 25,
      members: 4,
      popular: false,
    },
    {
      name: "Growth",
      price: 26000,
      projects: 10,
      budget: "₹1,50,000",
      proposals: 40,
      members: 7,
      popular: true,
    },
    {
      name: "Pro",
      price: 35000,
      projects: 18,
      budget: "Unlimited",
      proposals: 65,
      members: 10,
      popular: false,
    },
  ],
  yearly: [
    {
      name: "Starter",
      price: 28000,
      projects: 5,
      budget: "₹75,000",
      proposals: 25,
      members: 6,
      popular: false,
    },
    {
      name: "Growth",
      price: 38000,
      projects: 12,
      budget: "₹3,00,000",
      proposals: 45,
      members: 10,
      popular: true,
    },
    {
      name: "Pro",
      price: 55000,
      projects: 18,
      budget: "Unlimited",
      proposals: 65,
      members: 15,
      popular: false,
    },
  ],
};

const extraProposals = [
  {
    type: "Normal",
    qty: 10,
    price: 500,
    altQty: 30,
    altPrice: 700,
    features: ["Standard visibility", "Basic bid support"],
    color: "#1B72C0",
    bg: "#EFF6FF",
    border: "#DBEAFE",
  },
  {
    type: "Pro",
    qty: 10,
    price: 2500,
    features: ["Platform-preferred", "60% project allocation chance"],
    color: "#6FDA44",
    bg: "#F0FDF4",
    border: "#D1FAE5",
  },
  {
    type: "Elite",
    qty: 10,
    price: 5000,
    features: ["Direct internal team referral", "90% project allocation chance"],
    color: "#0D2855",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
];

const extraMembers = [
  { qty: 2, price: "₹700/month" },
  { qty: 5, price: "₹1,000/month" },
  { qty: 10, price: "₹1,500/month" },
];

const billingLabels = {
  monthly: "Monthly",
  halfYearly: "Half Yearly",
  yearly: "Yearly",
};

const savingsBadge = {
  monthly: null,
  halfYearly: "Save ~20%",
  yearly: "Save ~33%",
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// ── PLAN CARD ─────────────────────────────────────────────────────────────────

const PlanCard = ({ plan, billing, isAgency }) => {
  const isPopular = plan.popular;
  const perMonth =
    billing === "monthly"
      ? plan.price
      : billing === "halfYearly"
      ? Math.round(plan.price / 6)
      : Math.round(plan.price / 12);

  return (
    <div
      style={{
        position: "relative",
        background: isPopular
          ? "linear-gradient(145deg,#0D2855 0%,#1B72C0 100%)"
          : "#FFFFFF",
        border: isPopular ? "none" : "1px solid #DBEAFE",
        borderRadius: 20,
        padding: "28px 24px",
        boxShadow: isPopular
          ? "0 8px 32px rgba(13,40,85,0.28)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all .22s ease",
        cursor: "default",
        flex: "1 1 220px",
        minWidth: 0,
      }}
      className="pricing-card"
    >
      {isPopular && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#6FDA44",
            color: "#0D2855",
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 14px",
            borderRadius: 100,
            whiteSpace: "nowrap",
            letterSpacing: 0.5,
            fontFamily: "'Poppins',sans-serif",
          }}
        >
          MOST POPULAR
        </div>
      )}

      <div style={{ marginBottom: 6 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: isPopular ? "rgba(255,255,255,0.7)" : "#6B7280",
            fontFamily: "'Poppins',sans-serif",
            textTransform: "uppercase",
            letterSpacing: 0.8,
          }}
        >
          {plan.name}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 4,
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: isPopular ? "#FFFFFF" : "#0D2855",
            fontFamily: "'Montserrat',sans-serif",
          }}
        >
          {fmt(plan.price)}
        </span>
      </div>
      <div
        style={{
          fontSize: 11,
          color: isPopular ? "rgba(255,255,255,0.55)" : "#9CA3AF",
          marginBottom: 20,
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {billing === "monthly"
          ? "per month"
          : `${billing === "halfYearly" ? "6 months" : "12 months"} · ${fmt(perMonth)}/mo`}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Active Projects",
            value: `Up to ${plan.projects}`,
          },
          {
            label: "Max Budget",
            value: plan.budget,
          },
          {
            label: "Proposals/month",
            value: plan.proposals,
          },
          ...(isAgency
            ? [{ label: "Team Members", value: plan.members }]
            : []),
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: isPopular
                  ? "rgba(111,218,68,0.25)"
                  : "#DCFCE7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FiCheck
                size={9}
                color={isPopular ? "#6FDA44" : "#2A6020"}
                strokeWidth={3}
              />
            </div>
            <span
              style={{
                fontSize: 12,
                color: isPopular ? "rgba(255,255,255,0.82)" : "#374151",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              <strong
                style={{
                  color: isPopular ? "#FFFFFF" : "#0D2855",
                  fontWeight: 600,
                }}
              >
                {value}
              </strong>{" "}
              {label}
            </span>
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          border: isPopular ? "none" : "1.5px solid #DBEAFE",
          cursor: "pointer",
          fontSize: 12.5,
          fontFamily: "'Poppins',sans-serif",
          fontWeight: 600,
          background: isPopular
            ? "#6FDA44"
            : "#FFFFFF",
          color: isPopular ? "#0D2855" : "#1B72C0",
          padding: "11px 20px",
          borderRadius: 100,
          transition: "all .2s",
        }}
        className="plan-btn"
      >
        Get Started <FiArrowUpRight size={12} />
      </button>
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

const PricingSection = () => {
  const [tab, setTab] = useState("freelancer"); // 'freelancer' | 'agency'
  const [billing, setBilling] = useState("monthly");

  const plans = tab === "freelancer" ? freelancerPlans : agencyPlans;
  const activePlans = plans[billing];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

        .pricing-card:hover {
          transform: translateY(-3px);
        }
        .pricing-card:not([data-popular]):hover {
          box-shadow: 0 8px 28px rgba(27,114,192,0.13) !important;
          border-color: #1B72C0 !important;
        }
        .plan-btn:hover {
          transform: translateY(-1px);
          opacity: 0.92;
        }
        .tab-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 9px 20px; border-radius: 100px;
          font-size: 13px; font-family: 'Poppins',sans-serif; font-weight: 600;
          cursor: pointer; border: 1.5px solid transparent;
          transition: all .18s;
        }
        .tab-btn.active {
          background: linear-gradient(135deg,#0D2855 0%,#1B72C0 100%);
          color: #fff;
          box-shadow: 0 3px 18px rgba(13,40,85,0.25);
        }
        .tab-btn.inactive {
          background: #FFFFFF;
          color: #6B7280;
          border-color: #DBEAFE;
        }
        .tab-btn.inactive:hover {
          border-color: #1B72C0;
          color: #0D2855;
        }
        .billing-pill {
          display: flex; align-items: center; gap: 4px;
          padding: 7px 16px; border-radius: 100px;
          font-size: 12px; font-family: 'Poppins',sans-serif; font-weight: 500;
          cursor: pointer; border: 1.5px solid transparent;
          transition: all .18s; position: relative;
        }
        .billing-pill.active {
          background: #EFF6FF;
          color: #0D2855;
          border-color: #BFDBFE;
          font-weight: 600;
        }
        .billing-pill.inactive {
          background: transparent;
          color: #9CA3AF;
          border-color: transparent;
        }
        .billing-pill.inactive:hover { color: #1B72C0 }
        .extra-card {
          transition: all .22s ease;
          cursor: default;
        }
        .extra-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.09) !important;
        }
      `}</style>

      <section
        style={{
          background: "#FFFFFF",
          fontFamily: "'Poppins',sans-serif",
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#6FDA44,#1B72C0)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#1B72C0",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Simple, Transparent Pricing
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(26px,4vw,40px)",
                color: "#0D2855",
                marginBottom: 10,
                lineHeight: 1.15,
              }}
            >
              Choose Your{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg,#6FDA44 0%,#1B72C0 55%,#0D2855 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Growth Plan
              </span>
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#6B7280",
                maxWidth: 420,
                margin: "0 auto",
              }}
            >
              Scale your earnings with the right plan. Upgrade or cancel anytime.
            </p>
          </div>

          {/* ── TAB SWITCHER ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            <button
              className={`tab-btn ${tab === "freelancer" ? "active" : "inactive"}`}
              onClick={() => setTab("freelancer")}
            >
              <FaUser size={11} /> Freelancer
            </button>
            <button
              className={`tab-btn ${tab === "agency" ? "active" : "inactive"}`}
              onClick={() => setTab("agency")}
            >
              <HiOutlineUserGroup size={14} /> Agency
            </button>
          </div>

          {/* ── BILLING SWITCHER ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              marginBottom: 36,
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 100,
              padding: "4px",
              width: "fit-content",
              margin: "0 auto 36px",
            }}
          >
            {(["monthly", "halfYearly", "yearly"]).map((b) => (
              <button
                key={b}
                className={`billing-pill ${billing === b ? "active" : "inactive"}`}
                onClick={() => setBilling(b)}
              >
                {billingLabels[b]}
                {savingsBadge[b] && (
                  <span
                    style={{
                      marginLeft: 4,
                      background: "#DCFCE7",
                      color: "#2A6020",
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 100,
                    }}
                  >
                    {savingsBadge[b]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── PLAN CARDS ── */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "stretch",
              marginBottom: 56,
            }}
          >
            {activePlans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                billing={billing}
                isAgency={tab === "agency"}
              />
            ))}
          </div>

          {/* ── DIVIDER ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#DBEAFE" }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#9CA3AF",
                letterSpacing: 1,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Add-ons &amp; Extras
            </span>
            <div style={{ flex: 1, height: 1, background: "#DBEAFE" }} />
          </div>

          {/* ── EXTRA PROPOSALS ── */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "#EFF6FF",
                  border: "1px solid #DBEAFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiZap size={13} color="#1B72C0" />
              </div>
              <h3
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#0D2855",
                  margin: 0,
                }}
              >
                Extra Proposals
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {extraProposals.map((ep) => (
                <div
                  key={ep.type}
                  className="extra-card"
                  style={{
                    flex: "1 1 180px",
                    minWidth: 0,
                    background: ep.bg,
                    border: `1px solid ${ep.border}`,
                    borderRadius: 16,
                    padding: "18px 20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: ep.color,
                          letterSpacing: 0.8,
                          textTransform: "uppercase",
                          marginBottom: 2,
                        }}
                      >
                        {ep.type}
                      </div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#0D2855",
                          fontFamily: "'Montserrat',sans-serif",
                        }}
                      >
                        {ep.qty} proposals
                      </div>
                    </div>
                    <div
                      style={{
                        background: ep.color,
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 100,
                        fontFamily: "'Poppins',sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmt(ep.price)}
                    </div>
                  </div>

                  {ep.altQty && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6B7280",
                        marginBottom: 10,
                      }}
                    >
                      Also: {ep.altQty} proposals for {fmt(ep.altPrice)}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {ep.features.map((f) => (
                      <div
                        key={f}
                        style={{ display: "flex", alignItems: "flex-start", gap: 6 }}
                      >
                        <FiCheck
                          size={10}
                          color={ep.color}
                          strokeWidth={3}
                          style={{ marginTop: 2, flexShrink: 0 }}
                        />
                        <span style={{ fontSize: 11.5, color: "#374151" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── EXTRA TEAM MEMBERS (agency only hint) ── */}
          <div
            style={{
              marginTop: 24,
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 16,
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "#DCFCE7",
                  border: "1px solid #D1FAE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HiOutlineUserGroup size={14} color="#2A6020" />
              </div>
              <h3
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#0D2855",
                  margin: 0,
                }}
              >
                Extra Agency Team Members
              </h3>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {extraMembers.map(({ qty, price }) => (
                <div
                  key={qty}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #D1FAE5",
                    borderRadius: 12,
                    padding: "10px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <BsShieldCheck size={14} color="#2A6020" />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0D2855" }}>
                    {qty} members
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "#6FDA44",
                      fontWeight: 700,
                      background: "#F0FDF4",
                      padding: "2px 10px",
                      borderRadius: 100,
                    }}
                  >
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            style={{
              marginTop: 48,
              background: "linear-gradient(135deg,#0D2855 0%,#1B72C0 100%)",
              borderRadius: 20,
              padding: "28px 36px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              boxShadow: "0 4px 28px rgba(13,40,85,0.22)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                🚀 Not sure which plan fits you?
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: 0 }}>
                Start free — upgrade when you&apos;re ready.
              </p>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 13.5,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                background: "#6FDA44",
                color: "#0D2855",
                padding: "12px 26px",
                borderRadius: 100,
                boxShadow: "0 3px 16px rgba(111,218,68,0.35)",
                transition: "all .2s",
                flexShrink: 0,
              }}
            >
              Compare All Plans <FiArrowUpRight size={14} />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default PricingSection;