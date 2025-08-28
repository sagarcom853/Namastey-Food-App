import { createContext, useContext, useState } from "react";

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [showAssistant, setShowAssistant] = useState(false);
  const handleOpenAI = () => setShowAssistant(true);
  const handleCloseAI = () => setShowAssistant(false);
   const toggleAssistant = () => setShowAssistant(prev => !prev);
  return (
    <MyContext.Provider value={{ showAssistant, setShowAssistant, handleOpenAI, handleCloseAI, toggleAssistant }}>
      {children}
    </MyContext.Provider>
  );
};
export const useMyContext = () => {
  const context = useContext(MyContext);
  return context;
};