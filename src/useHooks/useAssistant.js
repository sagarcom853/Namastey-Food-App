import ChatAssistant from "../Components/Chat/ChatAssistant";
import { useMyContext } from "../context/context";

export const ChatPage = () => {
  const { showAssistant, handleCloseAI } = useMyContext();
  return (
    showAssistant && (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "350px",
          height: "50vh",
          background: "#fff",
          boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
        }}
      >
        <ChatAssistant handleCloseAI={handleCloseAI} />
      </div>
    )
  );
};
