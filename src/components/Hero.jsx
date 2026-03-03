import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { FaUser } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import { BsShieldCheck } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { BsShield } from "react-icons/bs";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-badge">
          AI-POWERED FREELANCE INTELLIGENCE
        </div>

        <h1 className="hero-title">
          Verified Talent.<br />
          Governed Projects.<br />
          <span>Guaranteed Results.</span>
        </h1>

        <p className="hero-subtitle">
          ArcLancer connects you with AI-verified professionals, governs every project
          with smart automation, and protects every dollar in escrow.
        </p>

        <div className="hero-buttons">
          <button className="btn primary">
            <FaUser />
            Join as Freelancer
            <FiArrowRight />
          </button>

          <button className="btn secondary">
            <HiOutlineOfficeBuilding />
            Hire Talent
          </button>

          <button className="btn text-btn" onClick={() => navigate("/register-agency")}>
            <HiOutlineOfficeBuilding />
            Register Agency
          </button>
        </div>

        <div className="hero-links">
          <div className="link-item" onClick={() => navigate("/admin")}>
            <RiShieldCheckLine />
            Admin Panel
          </div>
          <div className="link-item" onClick={() => navigate("/project-stream")}>
  <BiMessageSquareDetail />
  ProjectStream Demo
</div>
        </div>

        <div className="comparison-box">
          <h2 className="comparison-title">ArcLancer vs The Rest</h2>
          <div className="comparison-list">
            <div className="comparison-row">
              <div className="comp-item comp-competitor">
                <span className="comp-name">Upwork:</span>
                <span className="comp-desc">Post & hope</span>
              </div>
              <FiArrowRight className="comp-arrow" />
              <div className="comp-item comp-arclancer">
                <span>AI-guided always</span>
              </div>
            </div>
            <div className="comparison-row">
              <div className="comp-item comp-competitor">
                <span className="comp-name">Fiverr:</span>
                <span className="comp-desc">Gig browsing</span>
              </div>
              <FiArrowRight className="comp-arrow" />
              <div className="comp-item comp-arclancer">
                <span>Curated matching</span>
              </div>
            </div>
            <div className="comparison-row">
              <div className="comp-item comp-competitor">
                <span className="comp-name">Truelancer:</span>
                <span className="comp-desc">Manual trust</span>
              </div>
              <FiArrowRight className="comp-arrow" />
              <div className="comp-item comp-arclancer">
                <span>AI-verified trust</span>
              </div>
            </div>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-box"><BsRobot /></div>
            <div>
              <h3>AI-Powered Matching</h3>
              <p>No bidding wars — AI matches verified talent to your exact project needs</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="icon-box"><BsShieldCheck /></div>
            <div>
              <h3>Verified Professionals</h3>
              <p>Every freelancer and agency is AI-tested and identity-verified</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="icon-box"><BsCurrencyDollar /></div>
            <div>
              <h3>Secure Escrow Payments</h3>
              <p>Money is protected until milestones are approved — no risk</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="icon-box"><BsShield /></div>
            <div>
              <h3>Platform-Governed Projects</h3>
              <p>Admin-backed dispute resolution, silence timers, and full audit trail</p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <h3>8,500+</h3>
            <p>Verified Professionals</p>
          </div>
          <div className="stat-item">
            <h3>94%</h3>
            <p>Completion Rate</p>
          </div>
          <div className="stat-item">
            <h3>$12M+</h3>
            <p>Paid to Talent</p>
          </div>
          <div className="stat-item rating">
            <h3>4.8 <span className="star">★</span></h3>
            <p>Avg Rating</p>
          </div>
        </div>

        <div className="cta-box">
          <p>🚀 Ready to build your verified professional profile?</p>
          <button className="btn primary">
            Get Started Free
            <span style={{ marginLeft: "8px" }}>→</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;