import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen, DollarSign, Star, Flag, Shield, MessageSquare,
  TrendingUp, AlertCircle, CheckCircle, ChevronRight, Plus,
  ArrowRight, Zap, Send, X, CreditCard, Bell,
} from 'lucide-react';

const ACCENT_GRAD = 'linear-gradient(135deg, #22c55e, #0ea5e9)';
const NAVY = '#1e3a5f';

const ACTIVE_PROJECTS = [
  { id: 1, title: 'Food Delivery Mobile App', talent: 'TechVision Agency', status: 'On Track', progress: 40, milestone: 'M2/4', escrow: 42000, deadline: 'Jul 25', action: 'Review Milestone' },
];
const RECENT_TRANSACTIONS = [
  { label: 'Escrow funded — Food Delivery App', amount: '-$42,000', time: '3 days ago',    type: 'escrow' },
  { label: 'Refund received — AI Chatbot',      amount: '+$1,500',  time: '3 months ago', type: 'refund' },
  { label: 'Final payment — E-Commerce',        amount: '-$18,500', time: '3 months ago', type: 'released' },
];
const NOTIFICATIONS_DATA = [
  { text: 'Wireframes_v1.pdf ready for review', time: '2h ago', unread: true },
  { text: 'New message from Arjun Mehta',        time: '3h ago', unread: true },
  { text: 'Admin: Project 3 days ahead',         time: '4h ago', unread: true },
  { text: 'Escrow funded successfully',          time: '3d ago', unread: false },
];
const INVITE_TALENTS = [
  { id: 1, name: 'TechVision Agency', type: 'Agency',     match: '98%', rating: 4.9, initials: 'TV', risk: 'LOW' },
  { id: 2, name: 'John Smith',        type: 'Freelancer', match: '91%', rating: 4.8, initials: 'JS', risk: 'LOW' },
];

const styles = `
  *, *::before, *::after { box-sizing: border-box; }

  .htd-stat-card {
    position: relative; overflow: hidden; border-radius: 14px;
    background: #fff; border: 1px solid #e8eef5; padding: 16px; cursor: pointer;
    transition: transform .2s, box-shadow .2s, border-color .2s;
  }
  .htd-stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(30,58,95,.1); }
  .htd-stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; opacity: 0; transition: opacity .2s; }
  .htd-stat-card:hover::before { opacity: 1; }
  .htd-stat-card.green::before  { background: linear-gradient(90deg,#22c55e,#0ea5e9); }
  .htd-stat-card.blue::before   { background: linear-gradient(90deg,#0ea5e9,#1e3a5f); }
  .htd-stat-card.navy::before   { background: linear-gradient(90deg,#1e3a5f,#0ea5e9); }
  .htd-stat-card.red::before    { background: linear-gradient(90deg,#ef4444,#f97316); }
  .htd-stat-card.purple::before { background: linear-gradient(90deg,#8b5cf6,#0ea5e9); }
  .htd-stat-card.amber::before  { background: linear-gradient(90deg,#f59e0b,#22c55e); }

  .htd-panel { background: #fff; border-radius: 16px; border: 1px solid #e8eef5; overflow: hidden; }
  .htd-panel-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 16px; border-bottom: 1px solid #f0f4f8;
  }
  .htd-section-title { font-size: 13px; font-weight: 700; color: #1e3a5f; }
  .htd-section-bar { position: relative; padding-left: 10px; }
  .htd-section-bar::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; border-radius: 99px;
    background: linear-gradient(180deg,#22c55e,#0ea5e9);
  }

  .htd-btn-primary {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 7px 13px; border-radius: 9px; border: none; cursor: pointer;
    color: #fff; font-size: 12px; font-weight: 600;
    background: linear-gradient(135deg,#22c55e,#0ea5e9); transition: opacity .15s, transform .15s;
  }
  .htd-btn-primary:hover { opacity: .9; transform: scale(1.02); }
  .htd-btn-primary:disabled { background: #cbd5e1 !important; cursor: not-allowed; transform: none; opacity: 1; }

  .htd-view-link {
    font-size: 12px; font-weight: 600; color: #0ea5e9; background: none; border: none;
    cursor: pointer; display: flex; align-items: center; gap: 3px; transition: color .15s;
  }
  .htd-view-link:hover { color: #0284c7; }

  .htd-progress-bar { width: 100%; height: 7px; background: #e8eef5; border-radius: 99px; overflow: hidden; }
  .htd-progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg,#22c55e,#0ea5e9); transition: width .5s; }

  .htd-avatar {
    width: 37px; height: 37px; border-radius: 9px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-weight: 700; font-size: 13px;
    background: linear-gradient(135deg,#22c55e,#0ea5e9);
  }

  .htd-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 99px; white-space: nowrap; }
  .htd-badge.green  { background: #dcfce7; color: #16a34a; }
  .htd-badge.blue   { background: #dbeafe; color: #1d4ed8; }

  .htd-pulsedot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: htdp 2s infinite; }
  @keyframes htdp { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }

  .htd-kyc {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 14px; border-radius: 12px;
    background: linear-gradient(135deg,#fffbeb,#fefce8);
    border: 1px solid #fcd34d; margin-bottom: 16px;
  }

  .htd-proj-card { padding: 13px; background: #f8fafc; border-radius: 12px; border: 1px solid #e8eef5; }

  .htd-post-btn {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 11px; border: 2px dashed #cbd5e1; border-radius: 11px;
    background: none; cursor: pointer; font-size: 13px; font-weight: 500;
    color: #94a3b8; transition: all .2s;
  }
  .htd-post-btn:hover { border-color: #22c55e; color: #16a34a; background: #f0fdf4; }

  .htd-talent-row { display: flex; align-items: center; gap: 10px; padding: 10px; background: #f8fafc; border-radius: 11px; border: 1px solid #e8eef5; }

  .htd-insight-card {
    border-radius: 14px; padding: 16px;
    background: linear-gradient(135deg,#f0fdf4 0%,#eff6ff 60%,#f0f9ff 100%);
    border: 1px solid #bfdbfe;
  }

  .htd-qa-btn {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 8px 9px; border-radius: 9px; background: transparent; border: none; cursor: pointer;
    transition: background .15s;
  }
  .htd-qa-btn:hover { background: #f8fafc; }

  .htd-tx-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  .htd-modal-bg {
    position: fixed; inset: 0; background: rgba(15,23,42,.52);
    display: flex; align-items: center; justify-content: center; z-index: 50; padding: 16px;
    backdrop-filter: blur(4px);
  }
  .htd-modal { background: #fff; border-radius: 20px; padding: 24px; max-width: 430px; width: 100%; box-shadow: 0 24px 60px rgba(15,23,42,.2); }

  .htd-input {
    width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 9px;
    font-size: 13px; outline: none; transition: border-color .2s;
  }
  .htd-input:focus { border-color: #0ea5e9; }

  /* Responsive 3-col grid */
  .htd-three-col {
    display: grid;
    grid-template-columns: 1fr 1fr 278px;
    gap: 14px;
  }
  @media (max-width: 1100px) {
    .htd-three-col {
      grid-template-columns: 1fr 1fr;
    }
    .htd-three-col > *:nth-child(3) {
      grid-column: 1 / -1;
    }
  }
  @media (max-width: 700px) {
    .htd-three-col {
      grid-template-columns: 1fr;
    }
    .htd-three-col > *:nth-child(3) {
      grid-column: 1;
    }
  }

  /* Responsive stat grid */
  .htd-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 11px;
    margin-bottom: 18px;
  }
  @media (max-width: 900px) {
    .htd-stat-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px) {
    .htd-stat-grid { grid-template-columns: 1fr 1fr; }
  }
`;

export default function HireTalentDashboard() {
  const navigate = useNavigate();
  const [inviteModal, setInviteModal] = useState(null);
  const [inviteMsg, setInviteMsg]     = useState('');
  const [inviteBudget, setInviteBudget] = useState('');
  const [inviteSent, setInviteSent]   = useState(false);
  const canSend = inviteMsg.trim() && inviteBudget;

  return (
    <>
      <style>{styles}</style>
      <div style={{ padding: '20px 22px' }}>

        {/* KYC Banner */}
        <div className="htd-kyc">
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <AlertCircle size={15} color="#d97706" />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#92400e', margin: 0 }}>Payment verification pending — escrow locked</p>
              <p style={{ fontSize: 11, color: '#b45309', margin: '2px 0 0' }}>Complete billing setup to unlock full payment features</p>
            </div>
          </div>
          <button onClick={() => navigate('/hire-talent/settings')}
            style={{ fontSize: 11, fontWeight: 700, color: '#d97706', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap', marginLeft: 10 }}>
            Complete Setup <ArrowRight size={11} />
          </button>
        </div>

        {/* Stat Grid */}
        <div className="htd-stat-grid">
          {[
            { label: 'ACTIVE PROJECTS', value: '1',       sub: 'On track',       icon: FolderOpen,    color: 'green',  iconBg: '#dcfce7', iconClr: '#16a34a', route: '/hire-talent/projects', valClr: '#16a34a' },
            { label: 'IN ESCROW',       value: '$42,000', sub: 'Protected funds', icon: Shield,        color: 'blue',   iconBg: '#dbeafe', iconClr: '#1d4ed8', route: '/hire-talent/payments', valClr: '#1d4ed8' },
            { label: 'TRUST SCORE',     value: '75/100',  sub: 'Good standing',  icon: TrendingUp,    color: 'navy',   iconBg: '#e0f2fe', iconClr: NAVY,      route: null,                    valClr: NAVY },
            { label: 'OPEN DISPUTES',   value: '1',       sub: 'Under review',   icon: Flag,          color: 'red',    iconBg: '#fee2e2', iconClr: '#dc2626', route: '/hire-talent/disputes', valClr: '#dc2626' },
            { label: 'MESSAGES',        value: '3',       sub: '3 unread',       icon: MessageSquare, color: 'purple', iconBg: '#ede9fe', iconClr: '#7c3aed', route: '/project-stream',       valClr: '#7c3aed' },
            { label: 'AVG RATING',      value: '4.8',     sub: 'Top Rated ⭐',   icon: Star,          color: 'amber',  iconBg: '#fef3c7', iconClr: '#d97706', route: '/hire-talent/reviews',  valClr: '#d97706' },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={`htd-stat-card ${card.color}`} onClick={() => card.route && navigate(card.route)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', margin: 0 }}>{card.label}</p>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={15} color={card.iconClr} />
                  </div>
                </div>
                <p style={{ fontSize: 22, fontWeight: 800, color: card.valClr, margin: 0 }}>{card.value}</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: card.valClr, opacity: .65, margin: '3px 0 0' }}>{card.sub}</p>
              </div>
            );
          })}
        </div>

        {/* 3-column Grid */}
        <div className="htd-three-col">

          {/* ── Col 1 ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Active Projects */}
            <div className="htd-panel">
              <div className="htd-panel-head">
                <div className="htd-section-bar"><span className="htd-section-title">Active Projects</span></div>
                <button className="htd-view-link" onClick={() => navigate('/hire-talent/projects')}>View All <ArrowRight size={11} /></button>
              </div>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {ACTIVE_PROJECTS.map(proj => (
                  <div key={proj.id} className="htd-proj-card">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 9 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: 0 }}>{proj.title}</p>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0' }}>{proj.talent}</p>
                      </div>
                      <div className="htd-badge green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div className="htd-pulsedot" />{proj.status}
                      </div>
                    </div>
                    <div style={{ marginBottom: 9 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: '#64748b' }}>{proj.milestone} · Due {proj.deadline}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{proj.progress}%</span>
                      </div>
                      <div className="htd-progress-bar"><div className="htd-progress-fill" style={{ width: `${proj.progress}%` }} /></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#059669', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Shield size={11} />${proj.escrow.toLocaleString()} in escrow
                      </span>
                      <button className="htd-btn-primary" onClick={() => navigate(`/hire-talent/projects/${proj.id}`)}>
                        {proj.action} <ChevronRight size={11} />
                      </button>
                    </div>
                  </div>
                ))}
                <button className="htd-post-btn" onClick={() => navigate('/hire-talent/post-project')}>
                  <Plus size={14} /> Post New Project
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="htd-panel">
              <div className="htd-panel-head">
                <div className="htd-section-bar"><span className="htd-section-title">Recent Transactions</span></div>
                <button className="htd-view-link" onClick={() => navigate('/hire-talent/payments')}>View All <ArrowRight size={11} /></button>
              </div>
              <div>
                {RECENT_TRANSACTIONS.map((tx, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderBottom: i < RECENT_TRANSACTIONS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div className="htd-tx-icon" style={{ background: tx.type === 'escrow' ? '#dcfce7' : tx.type === 'refund' ? '#fef3c7' : '#dbeafe' }}>
                        <DollarSign size={13} color={tx.type === 'escrow' ? '#16a34a' : tx.type === 'refund' ? '#d97706' : '#1d4ed8'} />
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: NAVY, margin: 0, maxWidth: 165, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.label}</p>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0' }}>{tx.time}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: tx.amount.startsWith('+') ? '#d97706' : NAVY }}>{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Col 2 ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* AI Matched Talent */}
            <div className="htd-panel">
              <div className="htd-panel-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#dbeafe,#dcfce7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={12} color="#0ea5e9" />
                  </div>
                  <div className="htd-section-bar"><span className="htd-section-title">AI Matched Talent</span></div>
                </div>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Food Delivery App</span>
              </div>
              <div style={{ padding: 11, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {INVITE_TALENTS.map(talent => (
                  <div key={talent.id} className="htd-talent-row">
                    <div className="htd-avatar">{talent.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{talent.name}</p>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', flexShrink: 0 }}>{talent.match}</span>
                      </div>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0' }}>{talent.type} · ⭐ {talent.rating}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      <span className="htd-badge green">{talent.risk}</span>
                      <button className="htd-btn-primary" style={{ padding: '5px 9px' }}
                        onClick={() => { setInviteModal(talent); setInviteMsg(''); setInviteBudget(''); setInviteSent(false); }}>
                        <Send size={11} /> Invite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="htd-insight-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg,#22c55e,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={13} color="#fff" />
                </div>
                <span className="htd-section-title">AI Insights</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  { text: 'Project performing excellently',       ok: true },
                  { text: 'Agency is highly responsive',          ok: true },
                  { text: 'Good timeline buffer available',       ok: true },
                  { text: 'Review Milestone 1 deliverables soon', ok: false },
                ].map((ins, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, background: 'rgba(255,255,255,.65)', padding: '7px 9px', borderRadius: 8 }}>
                    {ins.ok ? <CheckCircle size={12} color="#16a34a" style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertCircle size={12} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />}
                    <p style={{ fontSize: 12, color: '#374151', margin: 0 }}>{ins.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Score */}
            <div className="htd-panel" style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                <span className="htd-section-title">Trust Score</span>
                <span style={{ fontSize: 19, fontWeight: 800, color: NAVY }}>75<span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>/100</span></span>
              </div>
              <div style={{ height: 7, background: '#e8eef5', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg,#22c55e,#0ea5e9)', borderRadius: 99 }} />
              </div>
              <p style={{ fontSize: 11, color: '#64748b', margin: '6px 0 0' }}>Good standing · Complete milestones to improve</p>
            </div>
          </div>

          {/* ── Col 3 (right sidebar) ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Notifications */}
            <div className="htd-panel">
              <div className="htd-panel-head">
                <div className="htd-section-bar"><span className="htd-section-title">Notifications</span></div>
                <button className="htd-view-link" onClick={() => navigate('/hire-talent/notifications')}>All <ArrowRight size={11} /></button>
              </div>
              <div>
                {NOTIFICATIONS_DATA.map((n, i) => (
                  <div key={i} onClick={() => navigate('/hire-talent/notifications')}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '10px 13px', borderBottom: i < NOTIFICATIONS_DATA.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer', background: n.unread ? 'rgba(14,165,233,.04)' : 'transparent' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: n.unread ? '#0ea5e9' : '#cbd5e1', flexShrink: 0, marginTop: 5 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: n.unread ? 600 : 400, color: n.unread ? NAVY : '#64748b', margin: 0, lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0' }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="htd-panel">
              <div className="htd-panel-head">
                <div className="htd-section-bar"><span className="htd-section-title">Quick Actions</span></div>
              </div>
              <div style={{ padding: '7px 7px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { label: 'Review Deliverables', icon: CheckCircle,   route: '/hire-talent/projects/1', iconBg: '#dcfce7', iconClr: '#16a34a' },
                  { label: 'Message Team',         icon: MessageSquare, route: '/project-stream',        iconBg: '#dbeafe', iconClr: '#1d4ed8' },
                  { label: 'My Projects',          icon: FolderOpen,    route: '/hire-talent/projects',  iconBg: '#ede9fe', iconClr: '#7c3aed' },
                  { label: 'My Reviews',           icon: Star,          route: '/hire-talent/reviews',   iconBg: '#fef3c7', iconClr: '#d97706' },
                  { label: 'Disputes',             icon: Flag,          route: '/hire-talent/disputes',  iconBg: '#fee2e2', iconClr: '#dc2626' },
                  { label: 'Payments',             icon: CreditCard,    route: '/hire-talent/payments',  iconBg: '#dcfce7', iconClr: '#059669' },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <button key={i} className="htd-qa-btn" onClick={() => navigate(a.route)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div style={{ width: 27, height: 27, borderRadius: 7, background: a.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={13} color={a.iconClr} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{a.label}</span>
                      </div>
                      <ChevronRight size={13} color="#cbd5e1" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ INVITE MODAL ══ */}
      {inviteModal && (
        <div className="htd-modal-bg">
          <div className="htd-modal">
            {!inviteSent ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: 0 }}>Send Invitation</h3>
                  <button onClick={() => setInviteModal(null)}
                    style={{ width: 28, height: 28, borderRadius: 7, background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={14} color="#64748b" />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: '#f8fafc', borderRadius: 11, border: '1px solid #e8eef5', marginBottom: 13 }}>
                  <div className="htd-avatar">{inviteModal.initials}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: 0 }}>{inviteModal.name}</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0' }}>{inviteModal.type} · ⭐ {inviteModal.rating} · {inviteModal.match} match</p>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 5 }}>Proposed Budget</p>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 13 }}>$</span>
                    <input type="number" placeholder="e.g. 42000" value={inviteBudget}
                      onChange={e => setInviteBudget(e.target.value)} className="htd-input" style={{ paddingLeft: 24 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: '4px 0 0' }}>AI suggested: $28,000 – $45,000</p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 5 }}>Message</p>
                  <textarea rows={3} placeholder={`Hi ${inviteModal.name}, I'd love to discuss my project...`}
                    value={inviteMsg} onChange={e => setInviteMsg(e.target.value)}
                    className="htd-input" style={{ resize: 'none', lineHeight: 1.5 }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setInviteModal(null)}
                    style={{ flex: 1, padding: '10px 0', border: '1.5px solid #e2e8f0', borderRadius: 9, fontSize: 13, fontWeight: 600, color: '#64748b', background: '#fff', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button disabled={!canSend} onClick={() => setInviteSent(true)}
                    className="htd-btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', borderRadius: 9, fontSize: 13 }}>
                    <Send size={12} /> Send Invitation
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ width: 58, height: 58, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 13px' }}>
                  <CheckCircle size={28} color="#16a34a" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 7px' }}>Invitation Sent!</h3>
                <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 16px' }}><strong>{inviteModal.name}</strong> has 7 days to respond.</p>
                <button className="htd-btn-primary" onClick={() => setInviteModal(null)}
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 0', borderRadius: 9, fontSize: 13 }}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}