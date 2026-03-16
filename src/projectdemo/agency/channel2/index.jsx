import { useState } from "react";
import Channel2Layout from "./components/Channel2Layout";
import { messages as initialMessages, currentUser, participants, project } from "./data/dummyData";

export default function Channel2Page() {
  const [messages, setMessages] = useState(initialMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = (newMessage) => {
    const message = {
      id: `msg${Date.now()}`,
      sender_id: currentUser.id,
      sender_name: currentUser.name,
      sender_role: currentUser.role,
      avatar: currentUser.avatar,
      color: currentUser.color,
      timestamp: new Date().toISOString(),
      is_system: false,
      is_locked: newMessage.type === "decision",
      ...newMessage,
    };
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
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