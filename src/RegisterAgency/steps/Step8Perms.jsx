import React, { useState } from "react";
import "./Step8Perms.css";

const PERMS = [
  { key: "projectInvites",      name: "Accept Project Invites",         desc: "Allow clients to send you project invitations directly"        },
  { key: "searchVisible",       name: "Appear in Search Results",        desc: "Let your agency profile show up in client searches"            },
  { key: "autoAcceptMilestone", name: "Auto-Accept Milestones",          desc: "Automatically accept milestones after review period"           },
  { key: "teamPublicProfiles",  name: "Team Member Public Profiles",     desc: "Show team members publicly on your agency profile"             },
  { key: "clientReviews",       name: "Allow Client Reviews",            desc: "Let clients leave public ratings and reviews after projects"   },
  { key: "analyticsTracking",   name: "Analytics & Reporting",           desc: "Enable platform analytics on your agency profile page"         },
];

const Step8Perms = ({ formData, updateData, next, prev }) => {
  const defaultPerms = PERMS.reduce((acc, p) => ({ ...acc, [p.key]: true }), {});
  const [perms, setPerms] = useState(formData.perms || defaultPerms);

  const toggle = (key) => setPerms((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleNext = () => {
    updateData({ perms });
    next();
  };

  return (
    <>
      <div className="s8-card">
        <h2 className="s8-title">Permissions & Preferences</h2>
        <p className="s8-subtitle">Control how your agency interacts with the platform and clients</p>
        <div className="s8-badge">STEP 8 OF 9 – PERMISSIONS</div>

        <div className="s8-perm-list">
          {PERMS.map((p) => (
            <div key={p.key} className="s8-perm-row">
              <div>
                <div className="s8-perm-name">{p.name}</div>
                <div className="s8-perm-desc">{p.desc}</div>
              </div>
              <div
                className={`s8-toggle ${perms[p.key] ? "on" : "off"}`}
                onClick={() => toggle(p.key)}
              >
                <div className="s8-toggle-thumb" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ra-bottom-bar">
        <button className="ra-btn-back" onClick={prev}>← Back</button>
        <button className="ra-btn-next" onClick={handleNext}>Continue to Go Live →</button>
      </div>
    </>
  );
};

export default Step8Perms;