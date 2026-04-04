// import React, { useState } from 'react';
// import {
//   User,
//   Bell,
//   Shield,
//   CreditCard,
//   AlertTriangle,
//   ChevronLeft,
//   ChevronDown,
//   CheckCircle,
//   Clock,
//   Eye,
//   EyeOff,
//   Upload,
//   Smartphone,
//   Globe,
//   Building2,
//   MapPin,
//   Camera,
//   Monitor,
//   LogOut,
//   Trash2,
//   Plus,
//   X,
// } from 'lucide-react';

// const SettingsPage = ({ onBack }) => {
//   const [activeSection, setActiveSection] = useState('account');
//   const [showPassword, setShowPassword] = useState(false);
//   const [twoFAEnabled, setTwoFAEnabled] = useState(false);

//   const [notifications, setNotifications] = useState({
//     emailAll: true,
//     inAppAll: true,
//     milestones: true,
//     messages: true,
//     disputes: false,
//     payments: true,
//     projectUpdates: true,
//     marketing: false,
//   });

//   const toggleNotif = (key) =>
//     setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

//   const navItems = [
//     { id: 'account',      label: 'Account Settings',    icon: User },
//     { id: 'profile',      label: 'Profile Settings',     icon: Building2 },
//     { id: 'kyc',          label: 'KYC / Verification',   icon: Shield },
//     { id: 'payment',      label: 'Payment Settings',     icon: CreditCard },
//     { id: 'notifications',label: 'Notifications',        icon: Bell },
//     { id: 'privacy',      label: 'Privacy & Security',   icon: Shield },
//     { id: 'danger',       label: 'Danger Zone',          icon: AlertTriangle, danger: true },
//   ];

//   const Toggle = ({ enabled, onToggle }) => (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//         enabled ? 'bg-blue-600' : 'bg-gray-300'
//       }`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
//           enabled ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );

//   const SectionHeader = ({ title, subtitle }) => (
//     <div className="mb-6 pb-4 border-b border-gray-200">
//       <h2 className="text-xl font-bold text-gray-900">{title}</h2>
//       {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
//     </div>
//   );

//   const FieldLabel = ({ children }) => (
//     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//       {children}
//     </label>
//   );

//   const InputField = ({ value, type = 'text', placeholder, onChange, disabled, children }) => (
//     <div className="relative">
//       <input
//         type={type}
//         defaultValue={value}
//         placeholder={placeholder}
//         disabled={disabled}
//         onChange={onChange}
//         className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition"
//       />
//       {children}
//     </div>
//   );

//   const SaveButton = () => (
//     <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
//       <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
//         Save Changes
//       </button>
//     </div>
//   );

//   /* ─── SECTIONS ─────────────────────────────────────────── */

//   const renderAccount = () => (
//     <div>
//       <SectionHeader
//         title="Account Settings"
//         subtitle="Manage your login credentials and regional preferences"
//       />

//       <div className="space-y-6">
//         {/* Email */}
//         <div>
//           <FieldLabel>Email Address</FieldLabel>
//           <div className="flex gap-3">
//             <div className="flex-1">
//               <InputField value="john@weblance.com" />
//             </div>
//             <button className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
//               Change Email
//             </button>
//           </div>
//           <p className="text-xs text-gray-400 mt-1.5">A verification link will be sent to your new email.</p>
//         </div>

//         {/* Password */}
//         <div>
//           <FieldLabel>Password</FieldLabel>
//           <div className="flex gap-3">
//             <div className="flex-1 relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 defaultValue="••••••••••••"
//                 className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
//               />
//               <button
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//             <button className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
//               Change Password
//             </button>
//           </div>
//           <p className="text-xs text-gray-400 mt-1.5">Last changed 3 months ago.</p>
//         </div>

//         {/* Phone */}
//         <div>
//           <FieldLabel>Phone Number</FieldLabel>
//           <div className="flex gap-3">
//             <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition whitespace-nowrap">
//               <span>🇮🇳</span>
//               <span>+91</span>
//               <ChevronDown size={14} className="text-gray-400" />
//             </div>
//             <div className="flex-1">
//               <InputField value="98765 43210" />
//             </div>
//             <button className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
//               Verify
//             </button>
//           </div>
//         </div>

//         {/* Language */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <FieldLabel>Language</FieldLabel>
//             <div className="relative">
//               <select className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-8">
//                 <option>English (US)</option>
//                 <option>Hindi</option>
//                 <option>English (UK)</option>
//               </select>
//               <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//           <div>
//             <FieldLabel>Timezone</FieldLabel>
//             <div className="relative">
//               <select className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-8">
//                 <option>Asia/Kolkata (IST)</option>
//                 <option>Asia/Dubai (GST)</option>
//                 <option>America/New_York (EST)</option>
//                 <option>Europe/London (GMT)</option>
//               </select>
//               <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <SaveButton />
//     </div>
//   );

//   const renderProfile = () => (
//     <div>
//       <SectionHeader
//         title="Profile Settings"
//         subtitle="Public-facing profile information visible to freelancers"
//       />

//       {/* Photo */}
//       <div className="flex items-center gap-5 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
//         <div className="relative">
//           <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
//             J
//           </div>
//           <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-700 transition">
//             <Camera size={12} className="text-white" />
//           </button>
//         </div>
//         <div>
//           <p className="font-semibold text-gray-900 text-sm mb-1">Profile Photo</p>
//           <p className="text-xs text-gray-500 mb-3">PNG or JPG, max 2MB · Square image recommended</p>
//           <div className="flex gap-2">
//             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition">
//               <Upload size={12} /> Upload Photo
//             </button>
//             <button className="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-100 transition">
//               Remove
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-5">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <FieldLabel>Full Name</FieldLabel>
//             <InputField value="John Smith" />
//           </div>
//           <div>
//             <FieldLabel>Company Name</FieldLabel>
//             <InputField value="Weblance Studios" placeholder="Your company name" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <FieldLabel>Industry</FieldLabel>
//             <div className="relative">
//               <select className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-8">
//                 <option>Technology</option>
//                 <option>E-Commerce</option>
//                 <option>Healthcare</option>
//                 <option>Finance</option>
//                 <option>Education</option>
//                 <option>Real Estate</option>
//               </select>
//               <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//           <div>
//             <FieldLabel>Country</FieldLabel>
//             <div className="relative">
//               <select className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-8">
//                 <option>🇮🇳 India</option>
//                 <option>🇺🇸 United States</option>
//                 <option>🇬🇧 United Kingdom</option>
//                 <option>🇸🇬 Singapore</option>
//               </select>
//               <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         <div>
//           <FieldLabel>About / Bio</FieldLabel>
//           <textarea
//             defaultValue="Client at ArcLancer building innovative digital products for our growing business."
//             rows={4}
//             className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
//           />
//           <p className="text-xs text-gray-400 mt-1">This will be shown on your public profile.</p>
//         </div>

//         <div>
//           <FieldLabel>Website</FieldLabel>
//           <InputField value="https://johnsmith.dev" placeholder="https://yourwebsite.com" />
//         </div>
//       </div>

//       <SaveButton />
//     </div>
//   );

//   const renderKYC = () => {
//     const items = [
//       {
//         title: 'Government ID',
//         subtitle: 'Aadhaar / Passport / Driver\'s License',
//         status: 'verified',
//         badge: 'Verified',
//         action: 'View Document',
//       },
//       {
//         title: 'Billing Address',
//         subtitle: '12 MG Road, Bengaluru, Karnataka 560001',
//         status: 'verified',
//         badge: 'Verified',
//         action: 'Update Address',
//       },
//       {
//         title: 'GST / PAN',
//         subtitle: 'Required for Indian business accounts',
//         status: 'pending',
//         badge: 'Pending',
//         action: 'Upload Now',
//       },
//     ];

//     return (
//       <div>
//         <SectionHeader
//           title="KYC / Verification"
//           subtitle="Complete verification to unlock higher project limits and trust badges"
//         />

//         {/* Overall badge */}
//         <div className="mb-6 p-4 rounded-xl border-2 border-blue-200 bg-blue-50 flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//             <Shield size={22} className="text-blue-600" />
//           </div>
//           <div className="flex-1">
//             <p className="font-bold text-gray-900 text-sm">Partially Verified</p>
//             <p className="text-xs text-gray-600 mt-0.5">2 of 3 verifications complete · Complete GST/PAN to become fully verified</p>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
//             <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
//             <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {items.map((item, idx) => (
//             <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border ${
//               item.status === 'verified'
//                 ? 'border-green-200 bg-green-50'
//                 : 'border-yellow-200 bg-yellow-50'
//             }`}>
//               <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                 item.status === 'verified' ? 'bg-green-100' : 'bg-yellow-100'
//               }`}>
//                 {item.status === 'verified'
//                   ? <CheckCircle size={20} className="text-green-600" />
//                   : <Clock size={20} className="text-yellow-600" />
//                 }
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-0.5">
//                   <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
//                   <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
//                     item.status === 'verified'
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-yellow-100 text-yellow-700'
//                   }`}>
//                     {item.status === 'verified' ? '✅ ' : '⏳ '}{item.badge}
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-500">{item.subtitle}</p>
//               </div>
//               <button className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition whitespace-nowrap ${
//                 item.status === 'verified'
//                   ? 'border-gray-300 text-gray-700 hover:bg-white bg-white'
//                   : 'border-yellow-400 text-yellow-700 bg-white hover:bg-yellow-50'
//               }`}>
//                 {item.action}
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//           <p className="text-xs text-gray-500 font-medium mb-1">Why verify?</p>
//           <p className="text-xs text-gray-500">Verified accounts get a trust badge, higher escrow limits, priority matching, and reduced dispute risk.</p>
//         </div>
//       </div>
//     );
//   };

//   const renderPayment = () => (
//     <div>
//       <SectionHeader
//         title="Payment Settings"
//         subtitle="Manage how you fund projects and receive refunds"
//       />

//       {/* Default method */}
//       <div className="mb-6">
//         <FieldLabel>Default Payment Method</FieldLabel>
//         <div className="space-y-3">
//           {[
//             { label: 'Visa •••• 4242', sub: 'Expires 12/26', icon: '💳', active: true },
//             { label: 'UPI — john@upi', sub: 'Linked & verified', icon: '📱', active: false },
//           ].map((card, idx) => (
//             <label key={idx} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
//               card.active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
//             }`}>
//               <input type="radio" name="paymethod" defaultChecked={card.active} className="accent-blue-600" />
//               <span className="text-xl">{card.icon}</span>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-900 text-sm">{card.label}</p>
//                 <p className="text-xs text-gray-500">{card.sub}</p>
//               </div>
//               {card.active && <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Default</span>}
//             </label>
//           ))}
//           <button className="flex items-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition">
//             <Plus size={16} /> Add New Payment Method
//           </button>
//         </div>
//       </div>

//       {/* Billing address */}
//       <div className="mb-6">
//         <FieldLabel>Billing Address</FieldLabel>
//         <div className="space-y-3">
//           <InputField value="12 MG Road" placeholder="Street address" />
//           <div className="grid grid-cols-2 gap-3">
//             <InputField value="Bengaluru" placeholder="City" />
//             <InputField value="Karnataka" placeholder="State" />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <InputField value="560001" placeholder="PIN Code" />
//             <div className="relative">
//               <select className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-8">
//                 <option>🇮🇳 India</option>
//               </select>
//               <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <SaveButton />
//     </div>
//   );

//   const renderNotifications = () => (
//     <div>
//       <SectionHeader
//         title="Notification Preferences"
//         subtitle="Control what alerts you receive and where"
//       />

//       {/* Master toggles */}
//       <div className="space-y-3 mb-8">
//         {[
//           { key: 'emailAll', label: 'Email Notifications', sub: 'Receive updates via email', icon: '📧' },
//           { key: 'inAppAll', label: 'In-App Notifications', sub: 'Alerts inside the dashboard', icon: '🔔' },
//         ].map((item) => (
//           <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="flex items-center gap-3">
//               <span className="text-xl">{item.icon}</span>
//               <div>
//                 <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
//                 <p className="text-xs text-gray-500">{item.sub}</p>
//               </div>
//             </div>
//             <Toggle enabled={notifications[item.key]} onToggle={() => toggleNotif(item.key)} />
//           </div>
//         ))}
//       </div>

//       {/* Per-type */}
//       <div>
//         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Notification Types</p>
//         <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
//           {[
//             { key: 'milestones',     label: 'Milestone Updates',   sub: 'Deliveries, reviews, approvals' },
//             { key: 'messages',       label: 'Messages',             sub: 'New messages from your team' },
//             { key: 'disputes',       label: 'Disputes',             sub: 'Dispute opened or resolved' },
//             { key: 'payments',       label: 'Payment Activity',     sub: 'Escrow funded, released, refunded' },
//             { key: 'projectUpdates', label: 'Project Updates',      sub: 'Status changes and progress' },
//             { key: 'marketing',      label: 'Tips & Promotions',    sub: 'Platform news and offers' },
//           ].map((item) => (
//             <div key={item.key} className="flex items-center justify-between px-4 py-3.5 bg-white hover:bg-gray-50 transition">
//               <div>
//                 <p className="font-medium text-gray-900 text-sm">{item.label}</p>
//                 <p className="text-xs text-gray-400">{item.sub}</p>
//               </div>
//               <Toggle enabled={notifications[item.key]} onToggle={() => toggleNotif(item.key)} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderPrivacy = () => (
//     <div>
//       <SectionHeader
//         title="Privacy & Security"
//         subtitle="Protect your account with advanced security options"
//       />

//       {/* 2FA */}
//       <div className="mb-6 p-5 rounded-xl border-2 border-gray-200 bg-white">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex items-start gap-4">
//             <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
//               <Smartphone size={20} className="text-blue-600" />
//             </div>
//             <div>
//               <p className="font-bold text-gray-900 text-sm">Two-Factor Authentication</p>
//               <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security using your phone or authenticator app.</p>
//               {twoFAEnabled && (
//                 <span className="inline-block mt-2 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
//                   ✅ Enabled
//                 </span>
//               )}
//             </div>
//           </div>
//           <Toggle enabled={twoFAEnabled} onToggle={() => setTwoFAEnabled(!twoFAEnabled)} />
//         </div>
//         {twoFAEnabled && (
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
//               Configure Authenticator App →
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Active sessions */}
//       <div className="mb-6">
//         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Active Sessions</p>
//         <div className="space-y-3">
//           {[
//             { device: 'Chrome on Windows', location: 'Bengaluru, India', time: 'Active now', current: true },
//             { device: 'Safari on iPhone 14', location: 'Mumbai, India', time: '2 hours ago', current: false },
//             { device: 'Firefox on MacOS', location: 'Delhi, India', time: '3 days ago', current: false },
//           ].map((session, idx) => (
//             <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
//                   <Monitor size={16} className="text-gray-500" />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <p className="font-medium text-gray-900 text-sm">{session.device}</p>
//                     {session.current && (
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Current</span>
//                     )}
//                   </div>
//                   <p className="text-xs text-gray-400">{session.location} · {session.time}</p>
//                 </div>
//               </div>
//               {!session.current && (
//                 <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
//                   <LogOut size={15} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         <button className="mt-3 text-sm text-red-500 font-medium hover:text-red-600">
//           Sign out all other sessions
//         </button>
//       </div>
//     </div>
//   );

//   const renderDanger = () => (
//     <div>
//       <SectionHeader
//         title="Danger Zone"
//         subtitle="Irreversible actions — please read carefully before proceeding"
//       />

//       <div className="space-y-4">
//         {[
//           {
//             title: 'Deactivate Account',
//             description: 'Temporarily disable your account. You can reactivate anytime by logging back in.',
//             btnLabel: 'Deactivate Account',
//             btnStyle: 'border border-yellow-400 text-yellow-700 hover:bg-yellow-50',
//           },
//           {
//             title: 'Delete All Project Data',
//             description: 'Permanently delete all your project history, files, and messages. This cannot be undone.',
//             btnLabel: 'Delete Data',
//             btnStyle: 'border border-red-300 text-red-600 hover:bg-red-50',
//           },
//           {
//             title: 'Delete Account',
//             description: 'Permanently delete your account and all associated data. You will lose access immediately.',
//             btnLabel: 'Delete Account',
//             btnStyle: 'bg-red-600 text-white hover:bg-red-700',
//           },
//         ].map((item, idx) => (
//           <div key={idx} className="p-5 rounded-xl border border-red-100 bg-red-50">
//             <div className="flex items-start justify-between gap-4 flex-wrap">
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-1">
//                   <Trash2 size={15} className="text-red-500 flex-shrink-0" />
//                   <p className="font-bold text-gray-900 text-sm">{item.title}</p>
//                 </div>
//                 <p className="text-xs text-gray-500">{item.description}</p>
//               </div>
//               <button className={`px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${item.btnStyle}`}>
//                 {item.btnLabel}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
//         <AlertTriangle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
//         <p className="text-xs text-yellow-800">
//           All deletion actions are permanent and cannot be reversed. If you have active projects with funds in escrow, please resolve them before deleting your account.
//         </p>
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'account':       return renderAccount();
//       case 'profile':       return renderProfile();
//       case 'kyc':           return renderKYC();
//       case 'payment':       return renderPayment();
//       case 'notifications': return renderNotifications();
//       case 'privacy':       return renderPrivacy();
//       case 'danger':        return renderDanger();
//       default:              return renderAccount();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             {/* Left: Back button */}
//             <button
//               onClick={onBack}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
//             >
//               <ChevronLeft size={16} />
//               Back
//             </button>

//             {/* Center: Logo */}
//             <h1 className="text-xl font-bold text-blue-600 absolute left-1/2 -translate-x-1/2">
//               ArcLancer
//             </h1>

//             {/* Right: Avatar */}
//             <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-base">
//               J
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Page Title */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//           <p className="text-sm text-gray-500 mt-1">Manage your account, profile, security and preferences</p>
//         </div>

//         <div className="flex gap-8 items-start">
//           {/* Sidebar */}
//           <aside className="w-64 flex-shrink-0">
//             <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//               {navItems.map((item, idx) => {
//                 const Icon = item.icon;
//                 const isActive = activeSection === item.id;
//                 return (
//                   <button
//                     key={item.id}
//                     onClick={() => setActiveSection(item.id)}
//                     className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition text-left ${
//                       idx !== navItems.length - 1 ? 'border-b border-gray-100' : ''
//                     } ${
//                       isActive
//                         ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-600'
//                         : item.danger
//                         ? 'text-red-500 hover:bg-red-50'
//                         : 'text-gray-700 hover:bg-gray-50'
//                     }`}
//                     style={isActive ? { paddingLeft: '12px' } : {}}
//                   >
//                     <Icon
//                       size={17}
//                       className={
//                         isActive
//                           ? 'text-blue-600'
//                           : item.danger
//                           ? 'text-red-400'
//                           : 'text-gray-400'
//                       }
//                     />
//                     {item.label}
//                   </button>
//                 );
//               })}
//             </nav>
//           </aside>

//           {/* Content */}
//           <div className="flex-1 min-w-0">
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
//               {renderContent()}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SettingsPage;










import React, { useState, useRef } from 'react';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  ChevronLeft,
  ChevronDown,
  CheckCircle,
  Eye,
  EyeOff,
  Upload,
  Smartphone,
  Camera,
  Monitor,
  LogOut,
  Plus,
  Building2,
  Calendar,
  X,
  Check,
  AlertCircle,
} from 'lucide-react';

const SettingsPage = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('account');

  /* ─── ACCOUNT STATE ─── */
  const [email, setEmail]             = useState('john@weblance.com');
  const [showEmailEdit, setShowEmailEdit] = useState(false);
  const [newEmail, setNewEmail]       = useState('');
  const [showPassword, setShowPassword]   = useState(false);
  const [showPwEdit, setShowPwEdit]       = useState(false);
  const [pwForm, setPwForm]           = useState({ current: '', newPw: '', confirm: '' });
  const [phone, setPhone]             = useState('98765 43210');
  const [showPhoneEdit, setShowPhoneEdit] = useState(false);
  const [newPhone, setNewPhone]       = useState('');
  const [language, setLanguage]       = useState('English (US)');
  const [timezone, setTimezone]       = useState('Asia/Kolkata (IST)');
  const [accountSaved, setAccountSaved]   = useState(false);

  /* ─── PROFILE STATE ─── */
  const [profile, setProfile] = useState({
    fullName:    'John Smith',
    company:     'Weblance Studios',
    industry:    'Technology',
    country:     '🇮🇳 India',
    bio:         'Client at ArcLancer building innovative digital products for our growing business.',
    website:     'https://johnsmith.dev',
    avatar:      null,
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const fileRef = useRef();

  /* ─── KYC STATE ─── */
  const [kycItems, setKycItems] = useState([
    { title: 'Government ID',   subtitle: "Aadhaar / Passport / Driver's License",   status: 'verified', badge: 'Verified' },
    { title: 'Billing Address', subtitle: '12 MG Road, Bengaluru, Karnataka 560001', status: 'verified', badge: 'Verified' },
    { title: 'GST / PAN',       subtitle: 'Required for Indian business accounts',    status: 'pending',  badge: 'Pending'  },
  ]);
  const [uploadingKyc, setUploadingKyc] = useState(null);

  /* ─── PAYMENT STATE ─── */
  const [selectedCard, setSelectedCard] = useState(0);
  const [cards, setCards] = useState([
    { label: 'Visa •••• 4242', sub: 'Expires 12/26', icon: '💳' },
    { label: 'UPI — john@upi', sub: 'Linked & verified', icon: '📱' },
  ]);
  const [billingAddr, setBillingAddr] = useState({
    street: '12 MG Road', city: 'Bengaluru', state: 'Karnataka', pin: '560001', country: '🇮🇳 India',
  });
  const [paymentSaved, setPaymentSaved] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ label: '', sub: '', icon: '💳' });

  /* ─── NOTIFICATIONS STATE ─── */
  const [notifications, setNotifications] = useState({
    emailAll: true, inAppAll: true,
    milestones: true, messages: true, disputes: false,
    payments: true, projectUpdates: true, marketing: false,
  });

  /* ─── PRIVACY STATE ─── */
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [twoFAStep, setTwoFAStep]       = useState(0); // 0=off, 1=setup, 2=enabled
  const [otpCode, setOtpCode]           = useState('');
  const [sessions] = useState([
    { device: 'Chrome on Windows',   location: 'Bengaluru, India', time: 'Active now',  current: true,  id: 1 },
    { device: 'Safari on iPhone 14', location: 'Mumbai, India',    time: '2 hours ago', current: false, id: 2 },
    { device: 'Firefox on MacOS',    location: 'Delhi, India',     time: '3 days ago',  current: false, id: 3 },
  ]);
  const [activeSessions, setActiveSessions] = useState(sessions);

  /* ─── HELPERS ─── */
  const navItems = [
    { id: 'account',        label: 'Account Settings',  icon: User },
    { id: 'profile',        label: 'Profile Settings',   icon: Building2 },
    { id: 'kyc',            label: 'KYC / Verification', icon: Shield },
    { id: 'payment',        label: 'Payment Settings',   icon: CreditCard },
    { id: 'notifications',  label: 'Notifications',      icon: Bell },
    { id: 'privacy',        label: 'Privacy & Security', icon: Shield },
  ];

  const Toast = ({ msg }) => (
    <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
      <Check size={16} className="text-green-500 flex-shrink-0" /> {msg}
    </div>
  );

  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-6 pb-4 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const FieldLabel = ({ children }) => (
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{children}</label>
  );

  const Input = ({ value, onChange, type = 'text', placeholder, disabled, className = '' }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition ${className}`}
    />
  );

  const Select = ({ value, onChange, children }) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-8"
      >
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  const SaveBtn = ({ onClick, saved }) => (
    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
      <button
        onClick={onClick}
        className={`px-6 py-2.5 text-white text-sm font-semibold rounded-lg transition ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {saved ? '✓ Saved!' : 'Save Changes'}
      </button>
    </div>
  );

  const handleSave = (setSaved) => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  /* ══════════════════════════════════════
     SECTION: ACCOUNT
  ══════════════════════════════════════ */
  const renderAccount = () => (
    <div>
      {/* ── Email ── */}
      <div className="mb-8 pb-8 border-b border-gray-100">
        <SectionHeader title="Email Address" subtitle="Change the email associated with your account" />
        <div className="flex gap-3">
          <div className="flex-1">
            <Input value={email} disabled />
          </div>
          <button
            onClick={() => { setShowEmailEdit(!showEmailEdit); setNewEmail(''); }}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap"
          >
            {showEmailEdit ? 'Cancel' : 'Change Email'}
          </button>
        </div>
        {showEmailEdit && (
          <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
            <p className="text-xs font-semibold text-blue-700">Enter new email address</p>
            <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="new@email.com" type="email" />
            <button
              onClick={() => {
                if (newEmail.includes('@')) { setEmail(newEmail); setShowEmailEdit(false); }
              }}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Send Verification Link
            </button>
            <p className="text-xs text-gray-400">A verification link will be sent to the new email.</p>
          </div>
        )}
      </div>

      {/* ── Change Password ── */}
      <div>
        <SectionHeader title="Change Password" subtitle="Update your account password" />
        <div className="space-y-5">

          {/* Current Password */}
          <div>
            <FieldLabel>Current Password</FieldLabel>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={pwForm.current}
                onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                placeholder="Enter current password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-11"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <FieldLabel>New Password</FieldLabel>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={pwForm.newPw}
                onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {/* Strength bar */}
            {pwForm.newPw.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                {['bg-red-400', 'bg-yellow-400', 'bg-green-500'].map((c, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${pwForm.newPw.length > i * 3 + 2 ? c : 'bg-gray-200'}`} />
                ))}
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {pwForm.newPw.length < 6 ? 'Weak' : pwForm.newPw.length < 10 ? 'Medium' : 'Strong'}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <FieldLabel>Confirm New Password</FieldLabel>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={pwForm.confirm}
                onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                placeholder="Re-enter new password"
                className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  pwForm.confirm && pwForm.newPw !== pwForm.confirm
                    ? 'border-red-300 bg-red-50'
                    : pwForm.confirm && pwForm.newPw === pwForm.confirm
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200'
                }`}
              />
              {pwForm.confirm && pwForm.newPw === pwForm.confirm && (
                <CheckCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
              )}
            </div>
            {pwForm.newPw && pwForm.confirm && pwForm.newPw !== pwForm.confirm && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle size={12} /> Passwords do not match
              </p>
            )}
          </div>
        </div>

        {accountSaved && <Toast msg="Password updated successfully!" />}

        <div className="mt-6">
          <button
            onClick={() => {
              if (pwForm.current && pwForm.newPw === pwForm.confirm && pwForm.newPw.length >= 8) {
                handleSave(setAccountSaved);
                setPwForm({ current: '', newPw: '', confirm: '' });
              }
            }}
            disabled={!pwForm.current || pwForm.newPw !== pwForm.confirm || pwForm.newPw.length < 8}
            className="px-6 py-3 bg-blue-900 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════════
     SECTION: PROFILE
  ══════════════════════════════════════ */
  const renderProfile = () => (
    <div>
      <SectionHeader title="Profile Settings" subtitle="Public-facing profile information visible to freelancers" />

      {/* Photo */}
      <div className="flex items-center gap-5 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="relative">
          {profile.avatar
            ? <img src={profile.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
            : <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">{profile.fullName.charAt(0)}</div>
          }
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-700 transition"
          >
            <Camera size={12} className="text-white" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setProfile({ ...profile, avatar: url });
              }
            }}
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm mb-1">Profile Photo</p>
          <p className="text-xs text-gray-500 mb-3">PNG or JPG, max 2MB · Square image recommended</p>
          <div className="flex gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition"
            >
              <Upload size={12} /> Upload Photo
            </button>
            <button
              onClick={() => setProfile({ ...profile, avatar: null })}
              className="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-100 transition"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <Input value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
          </div>
          <div>
            <FieldLabel>Company Name</FieldLabel>
            <Input value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} placeholder="Your company name" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Industry</FieldLabel>
            <Select value={profile.industry} onChange={(e) => setProfile({ ...profile, industry: e.target.value })}>
              {['Technology', 'E-Commerce', 'Healthcare', 'Finance', 'Education', 'Real Estate'].map((i) => <option key={i}>{i}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel>Country</FieldLabel>
            <Select value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })}>
              {['🇮🇳 India', '🇺🇸 United States', '🇬🇧 United Kingdom', '🇸🇬 Singapore', '🇦🇪 UAE'].map((c) => <option key={c}>{c}</option>)}
            </Select>
          </div>
        </div>
        <div>
          <FieldLabel>About / Bio</FieldLabel>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-400">This will be shown on your public profile.</p>
            <p className="text-xs text-gray-400">{profile.bio.length} / 300</p>
          </div>
        </div>
        <div>
          <FieldLabel>Website</FieldLabel>
          <Input value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} placeholder="https://yourwebsite.com" />
        </div>
      </div>

      {profileSaved && <Toast msg="Profile updated successfully!" />}
      <SaveBtn onClick={() => handleSave(setProfileSaved)} saved={profileSaved} />
    </div>
  );

  /* ══════════════════════════════════════
     SECTION: KYC
  ══════════════════════════════════════ */
  const renderKYC = () => {
    const verifiedCount = kycItems.filter((i) => i.status === 'verified').length;

    const simulateUpload = (idx) => {
      setUploadingKyc(idx);
      setTimeout(() => {
        setKycItems((prev) =>
          prev.map((item, i) => i === idx ? { ...item, status: 'verified', badge: 'Verified' } : item)
        );
        setUploadingKyc(null);
      }, 2000);
    };

    return (
      <div>
        <SectionHeader title="KYC / Verification" subtitle="Complete verification to unlock higher project limits and trust badges" />

        {/* Overall badge */}
        <div className={`mb-6 p-4 rounded-xl border-2 flex items-center gap-4 ${verifiedCount === kycItems.length ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${verifiedCount === kycItems.length ? 'bg-green-100' : 'bg-blue-100'}`}>
            <Shield size={22} className={verifiedCount === kycItems.length ? 'text-green-600' : 'text-blue-600'} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">
              {verifiedCount === kycItems.length ? '✅ Fully Verified' : `Partially Verified (${verifiedCount}/${kycItems.length})`}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              {verifiedCount === kycItems.length
                ? 'All verifications complete. You have full platform access.'
                : `Complete remaining verifications to become fully verified`}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {kycItems.map((item, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${item.status === 'verified' ? 'bg-blue-500' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {kycItems.map((item, idx) => (
            <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border ${item.status === 'verified' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.status === 'verified' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                {uploadingKyc === idx
                  ? <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  : item.status === 'verified'
                  ? <CheckCircle size={20} className="text-green-600" />
                  : <Calendar size={20} className="text-yellow-600" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {item.status === 'verified' ? '✅ ' : '⏳ '}{item.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
              {item.status === 'verified' ? (
                <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition whitespace-nowrap">
                  View Document
                </button>
              ) : (
                <button
                  onClick={() => simulateUpload(idx)}
                  disabled={uploadingKyc === idx}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-yellow-400 text-yellow-700 bg-white hover:bg-yellow-50 transition whitespace-nowrap disabled:opacity-50"
                >
                  {uploadingKyc === idx ? 'Uploading…' : 'Upload Now'}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500 font-medium mb-1">Why verify?</p>
          <p className="text-xs text-gray-500">Verified accounts get a trust badge, higher escrow limits, priority matching, and reduced dispute risk.</p>
        </div>
      </div>
    );
  };

  /* ══════════════════════════════════════
     SECTION: PAYMENT
  ══════════════════════════════════════ */
  const renderPayment = () => (
    <div>
      <SectionHeader title="Payment Settings" subtitle="Manage how you fund projects and receive refunds" />

      {/* Cards */}
      <div className="mb-6">
        <FieldLabel>Saved Payment Methods</FieldLabel>
        <div className="space-y-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCard(idx)}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${selectedCard === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <input type="radio" readOnly checked={selectedCard === idx} className="accent-blue-600" />
              <span className="text-xl">{card.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{card.label}</p>
                <p className="text-xs text-gray-500">{card.sub}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedCard === idx && <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Default</span>}
                <button
                  onClick={(e) => { e.stopPropagation(); setCards(cards.filter((_, i) => i !== idx)); if (selectedCard >= cards.length - 1) setSelectedCard(0); }}
                  className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}

          {showAddCard ? (
            <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-900">Add Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <Select value={newCard.icon} onChange={(e) => setNewCard({ ...newCard, icon: e.target.value })}>
                    <option value="💳">Credit / Debit Card</option>
                    <option value="📱">UPI</option>
                    <option value="🏦">Net Banking</option>
                  </Select>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Label</p>
                  <Input value={newCard.label} onChange={(e) => setNewCard({ ...newCard, label: e.target.value })} placeholder="Visa •••• 1234" />
                </div>
              </div>
              <Input value={newCard.sub} onChange={(e) => setNewCard({ ...newCard, sub: e.target.value })} placeholder="Expires 12/27 or UPI ID" />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (newCard.label) {
                      setCards([...cards, newCard]);
                      setNewCard({ label: '', sub: '', icon: '💳' });
                      setShowAddCard(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Add Method
                </button>
                <button onClick={() => setShowAddCard(false)} className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">Cancel</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddCard(true)}
              className="flex items-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition"
            >
              <Plus size={16} /> Add New Payment Method
            </button>
          )}
        </div>
      </div>

      {/* Billing Address */}
      <div className="mb-6">
        <FieldLabel>Billing Address</FieldLabel>
        <div className="space-y-3">
          <Input value={billingAddr.street} onChange={(e) => setBillingAddr({ ...billingAddr, street: e.target.value })} placeholder="Street address" />
          <div className="grid grid-cols-2 gap-3">
            <Input value={billingAddr.city}  onChange={(e) => setBillingAddr({ ...billingAddr, city: e.target.value })}  placeholder="City" />
            <Input value={billingAddr.state} onChange={(e) => setBillingAddr({ ...billingAddr, state: e.target.value })} placeholder="State" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input value={billingAddr.pin} onChange={(e) => setBillingAddr({ ...billingAddr, pin: e.target.value })} placeholder="PIN Code" />
            <Select value={billingAddr.country} onChange={(e) => setBillingAddr({ ...billingAddr, country: e.target.value })}>
              {['🇮🇳 India', '🇺🇸 United States', '🇬🇧 United Kingdom', '🇸🇬 Singapore'].map((c) => <option key={c}>{c}</option>)}
            </Select>
          </div>
        </div>
      </div>

      {paymentSaved && <Toast msg="Payment settings saved!" />}
      <SaveBtn onClick={() => handleSave(setPaymentSaved)} saved={paymentSaved} />
    </div>
  );

  /* ══════════════════════════════════════
     SECTION: NOTIFICATIONS
  ══════════════════════════════════════ */
  const renderNotifications = () => (
    <div>
      <SectionHeader title="Notification Preferences" subtitle="Control what alerts you receive and where" />

      {/* Master */}
      <div className="space-y-3 mb-8">
        {[
          { key: 'emailAll', label: 'Email Notifications', sub: 'Receive updates via email',     icon: '📧' },
          { key: 'inAppAll', label: 'In-App Notifications', sub: 'Alerts inside the dashboard', icon: '🔔' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
            <Toggle enabled={notifications[item.key]} onToggle={() => setNotifications((p) => ({ ...p, [item.key]: !p[item.key] }))} />
          </div>
        ))}
      </div>

      {/* Per-type */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Notification Types</p>
        <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {[
            { key: 'milestones',     label: 'Milestone Updates', sub: 'Deliveries, reviews, approvals' },
            { key: 'messages',       label: 'Messages',           sub: 'New messages from your team' },
            { key: 'disputes',       label: 'Disputes',           sub: 'Dispute opened or resolved' },
            { key: 'payments',       label: 'Payment Activity',   sub: 'Escrow funded, released, refunded' },
            { key: 'projectUpdates', label: 'Project Updates',    sub: 'Status changes and progress' },
            { key: 'marketing',      label: 'Tips & Promotions',  sub: 'Platform news and offers' },
          ].map((item) => {
            const masterOff = !notifications.emailAll && !notifications.inAppAll;
            return (
              <div key={item.key} className={`flex items-center justify-between px-4 py-3.5 transition ${masterOff ? 'bg-gray-50 opacity-50' : 'bg-white hover:bg-gray-50'}`}>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
                <Toggle
                  enabled={notifications[item.key] && !masterOff}
                  onToggle={() => { if (!masterOff) setNotifications((p) => ({ ...p, [item.key]: !p[item.key] })); }}
                />
              </div>
            );
          })}
        </div>
        {(!notifications.emailAll && !notifications.inAppAll) && (
          <p className="mt-3 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            ⚠️ All notifications are disabled. Enable Email or In-App notifications above to configure types.
          </p>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
        <p className="text-xs text-gray-400 self-center mr-auto">Changes are saved automatically</p>
        <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
          <Check size={15} /> Preferences saved
        </span>
      </div>
    </div>
  );

  /* ══════════════════════════════════════
     SECTION: PRIVACY
  ══════════════════════════════════════ */
  const renderPrivacy = () => (
    <div>
      <SectionHeader title="Privacy & Security" subtitle="Protect your account with advanced security options" />

      {/* 2FA */}
      <div className="mb-6 p-5 rounded-xl border-2 border-gray-200 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Smartphone size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security using your phone or authenticator app.</p>
              {twoFAEnabled && <span className="inline-block mt-2 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">✅ Enabled</span>}
            </div>
          </div>
          <Toggle
            enabled={twoFAEnabled}
            onToggle={() => {
              if (twoFAEnabled) { setTwoFAEnabled(false); setTwoFAStep(0); }
              else { setTwoFAStep(1); }
            }}
          />
        </div>

        {/* 2FA Setup flow */}
        {twoFAStep === 1 && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            <p className="text-sm font-semibold text-gray-900">Setup Authenticator</p>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {/* Fake QR */}
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <div className="grid grid-cols-5 gap-0.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1">Scan with your authenticator app</p>
                <p className="text-xs text-gray-500 font-mono bg-white border border-gray-200 px-2 py-1 rounded">JBSWY3DPEHPK3PXP</p>
                <p className="text-xs text-gray-400 mt-1">Or enter the code manually</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1.5">Enter 6-digit verification code</p>
              <div className="flex gap-2">
                <Input value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="max-w-[160px] text-center tracking-widest text-lg font-mono" />
                <button
                  onClick={() => {
                    if (otpCode.length === 6) { setTwoFAEnabled(true); setTwoFAStep(2); setOtpCode(''); }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Verify & Enable
                </button>
                <button onClick={() => setTwoFAStep(0)} className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition text-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {twoFAEnabled && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View backup codes →</button>
            <button
              onClick={() => { setTwoFAEnabled(false); setTwoFAStep(0); }}
              className="text-sm text-red-500 font-medium hover:text-red-600"
            >
              Disable 2FA
            </button>
          </div>
        )}
      </div>

      {/* Sessions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Sessions</p>
          <span className="text-xs text-gray-400">{activeSessions.length} session{activeSessions.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Monitor size={16} className="text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-gray-900 text-sm">{session.device}</p>
                    {session.current && <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Current</span>}
                  </div>
                  <p className="text-xs text-gray-400">{session.location} · {session.time}</p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => setActiveSessions((prev) => prev.filter((s) => s.id !== session.id))}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  title="Sign out this session"
                >
                  <LogOut size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
        {activeSessions.length > 1 && (
          <button
            onClick={() => setActiveSessions((prev) => prev.filter((s) => s.current))}
            className="mt-3 text-sm text-red-500 font-medium hover:text-red-600"
          >
            Sign out all other sessions
          </button>
        )}
        {activeSessions.length === 1 && (
          <p className="mt-3 text-xs text-gray-400">No other active sessions.</p>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':       return renderAccount();
      case 'profile':       return renderProfile();
      case 'kyc':           return renderKYC();
      case 'payment':       return renderPayment();
      case 'notifications': return renderNotifications();
      case 'privacy':       return renderPrivacy();
      default:              return renderAccount();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">

            {/* Left: Back + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <h1 className="text-xl font-bold text-blue-600">ArcLancer</h1>
            </div>

            {/* Right: Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              {profile.avatar
                ? <img src={profile.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                : profile.fullName.charAt(0)
              }
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account, profile, security and preferences</p>
        </div>

        <div className="flex gap-8 items-start">

          {/* ── Desktop Sidebar ── */}
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    style={isActive ? { paddingLeft: '12px' } : {}}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition text-left ${
                      idx !== navItems.length - 1 ? 'border-b border-gray-100' : ''
                    } ${isActive ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Icon size={17} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ── Mobile Tab Strip ── */}
          <div className="md:hidden w-full overflow-x-auto mb-4 -mt-2">
            <div className="flex gap-2 pb-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
                    }`}
                  >
                    <Icon size={13} /> {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Content Panel ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;