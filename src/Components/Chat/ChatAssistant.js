// src/ChatAssistant.js
import React, { useState, useEffect } from "react";
import { TextField, Tooltip, IconButton } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";

const ChatAssistant = ({ handleCloseAI }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  // Use useEffect to manage a unique user ID and fetch initial history
  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/gemini/history/${storedUserId}`);
        setHistory(res.data.history);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("Failed to fetch conversation history.");
      }
    };

    if (storedUserId) {
      fetchHistory();
    }
    
    // Add 'no-scroll' class to the body when the component mounts
    document.body.classList.add('no-scroll');

    // Remove 'no-scroll' class when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleSend = async () => {
    if (!input.trim()) {
        setError("Please enter a message.");
        return;
    }

    setLoading(true);
    setError("");

    // Create a temporary history entry for the user's message
    const newHistory = [...history, { prompt: input, response: null }];
    setHistory(newHistory);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/api/gemini/chat", {
        prompt: newHistory[newHistory.length - 1].prompt,
        userId: userId,
      });

      // Check for a valid response structure
      if (res.data && res.data.response) {
        setHistory(prevHistory => {
          const updatedHistory = [...prevHistory];
          updatedHistory[updatedHistory.length - 1].response = res.data.response;
          return updatedHistory;
        });
      } else {
        // Handle unexpected response structure
        throw new Error("Invalid response format from server.");
      }

    } catch (error) {
      console.error("API call failed:", error.response ? error.response.data : error.message);
      setError("Failed to get a response from the AI. Please try again.");
      // If there's an error, remove the last user message from history
      setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
    } finally {
      setLoading(false);
    }
  };

  // Function to start a new chat
  const handleNewChat = () => {
    setHistory([]);
    setError("");
  };

  // Function to go back to previous chats (re-fetch history)
  const handleGoBackToHistory = async () => {
    try {
        const res = await axios.get(`http://localhost:8000/api/gemini/history/${userId}`);
        setHistory(res.data.history);
    } catch (error) {
        console.error("Error fetching history:", error);
        setError("Failed to fetch conversation history.");
    }
  };


  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b border-gray-200 p-3 fixed w-full z-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 justify-between'>
            <div className='w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
              <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z'
                />
              </svg>
            </div>
            <div className='flex w-full justify-between'>
              <div>
                <h1 className='text-lg font-semibold text-gray-800'>AI Chat Assistant</h1>
                <p className='text-gray-600 text-xs'>Have a conversation with AI</p>
              </div>

              <div className="flex space-x-2 items-center">
                <Tooltip title="Go to old chats">
                    <IconButton onClick={handleGoBackToHistory} size="small" className="text-gray-500 hover:text-gray-800">
                        <ChatIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Start a new chat">
                    <IconButton onClick={handleNewChat} size="small" className="text-gray-500 hover:text-gray-800">
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Close Chat Assistant'>
                    <IconButton onClick={handleCloseAI} size="small" className="text-gray-500 hover:text-gray-800">
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className='flex-1 flex flex-col mx-auto w-full min-h-0 pt-[72px]'>
        <div className='flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth' id='messages-container'>
          {history.length === 0 ? (
            <div className='flex items-center justify-center h-full text-center'>
              <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>Start a Conversation</h3>
                <p className='text-gray-600'>Ask me anything and I'll help you out!</p>
              </div>
            </div>
          ) : (
            history.map((msg, index) => (
              <div key={index} className='space-y-4 text-sm'>
                {/* User Message */}
                <div className='flex justify-end '>
                  <div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-tr-md px-6 py-3 max-w-xs sm:max-w-md lg:max-w-lg shadow-sm'>
                    <p className='text-sm font-medium mb-1'>You</p>
                    <p className='text-white/90'>{msg.prompt}</p>
                  </div>
                </div>

                {/* AI Response */}
                {msg.response && (
                  <div className='flex justify-start'>
                    <div className='bg-white rounded-2xl rounded-tl-md px-6 py-3 max-w-xs sm:max-w-md lg:max-w-lg shadow-sm border border-gray-100'>
                      <p className='text-sm font-medium text-gray-800 mb-1 flex items-center gap-2'>
                        <div className='w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full'></div>
                        Assistant
                      </p>
                      <p className='text-gray-700 whitespace-pre-wrap'>{msg.response}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Loading State */}
          {loading && (
            <div className='flex justify-start'>
              <div className='bg-white rounded-2xl rounded-tl-md px-6 py-3 max-w-xs sm:max-w-md lg:max-w-lg shadow-sm border border-gray-100'>
                <p className='text-sm font-medium text-gray-800 mb-1 flex items-center gap-2'>
                  <div className='w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full'></div>
                  Assistant
                </p>
                <div className='flex items-center gap-1'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className='text-gray-500 text-sm ml-2'>Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className='px-4 pb-2'>
            <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
              <div className='flex items-center gap-2'>
                <svg className='w-4 h-4 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='text-red-700 text-sm'>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Input Area - Sticky at bottom */}
    <div className='bg-white border-t border-gray-200 p-3 shadow-lg sticky bottom-0'>
          <div className='flex gap-2 items-end'>
            <div className='flex-1'>
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !loading) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading}
                placeholder='Type your message...'
                multiline
                maxRows={3}
                variant='outlined'
                fullWidth
                size='small'
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                    },
                  },
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className='bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:shadow-none min-w-[80px]'
            >
              {loading ? (
                <div className='flex items-center gap-1'>
                  <svg className='animate-spin w-3 h-3' fill='none' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Send
                </div>
              ) : (
                <div className='flex items-center gap-1'>
                  <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                    />
                  </svg>
                  Send
                </div>
              )}
            </button>
          </div>
          <p className='text-xs text-gray-500 mt-1 text-center'>Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
