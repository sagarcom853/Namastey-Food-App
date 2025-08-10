// Example usage in a React component
import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const ChatAssistant = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [historyUser, sethistoryInput] = useState([]);

  const handleSend = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/openai", { query: input });
      console.log('res',res)
      // setResponse(res.data.choices[0].message.content);
      const response = "Thank you for your question! How can I assist you today?";
      let finalObj = [...historyUser, { user: input, assistant: response }];
      sethistoryInput(finalObj);
      setInput("");
    } catch (error) {
      setResponse("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", borderRadius: "8px", overflowY: "auto", height: "70%" }}>
      <div className='flex'>
        <div className='flex flex-col gap-2 p-2 h-full overflow-y-auto max-auto'>
          {historyUser.map((msg, index) => (
            <div key={index} className='bg-gray-100 rounded-md p-2'>
              <p className='m-0 text-gray-800'>
                <span className='font-semibold'>User:</span> {msg.user}
              </p>
              <p className='m-0 text-gray-700'>
                <span className='font-semibold'>Assistant:</span> {msg.assistant}
              </p>
            </div>
          ))}
                  {/* <div className="mt-2 text-red-500">{response}</div> */}
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: 20,
            width: "300px",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            gap: "10px",
            backdropFilter: "blur(10px)",
          }}
        >
          <TextField value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={handleSend} variant='contained' className='button'>
            Ask AI
          </button>
        </div>
      </div>
      <div>{response}</div>
    </div>
  );
};

export default ChatAssistant;
