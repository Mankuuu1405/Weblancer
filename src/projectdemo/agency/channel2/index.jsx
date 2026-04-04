// ── Channel2Page.jsx ───────────────────────────────────
import { useState } from "react";
import Channel2Layout from "./components/Channel2Layout";
import { messages as initialMessages, currentUser, participants, project } from "./data/dummyData";

const G = {
  bg: "#f9fafb",
};

export default function Channel2Page() {
  const [messages,       setMessages]       = useState(initialMessages);
  const [isSidebarOpen,  setIsSidebarOpen]  = useState(true);

  const handleSendMessage = (newMessage) => {
    const message = {
      id: `msg${Date.now()}`,
      sender_id:   currentUser.id,
      sender_name: currentUser.name,
      sender_role: currentUser.role,
      avatar:      currentUser.avatar,
      color:       currentUser.color,
      timestamp:   new Date().toISOString(),
      is_system:   false,
      is_locked:   newMessage.type === "decision",
      ...newMessage,
    };
    setMessages(prev => [...prev, message]);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: G.bg, overflow: "hidden" }}>
      <Channel2Layout
        messages={messages}
        currentUser={currentUser}
        participants={participants}
        project={project}
        onSendMessage={handleSendMessage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
}