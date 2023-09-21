import { useEffect, useState } from "react";

const usePasswordGenerator = (checkBoxData, length) => {
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const generatePassword =(checkBoxData, length) => {
    let charSet = "";

    let selectedOption = checkBoxData?.filter(
      (checkData) => checkData.state === true
    );

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include upperCase Letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;

        case "Include LowerCase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;

        case "Include Numbers":
          charSet += "0123456789";
          break;

        case "Include Symbols":
          charSet += "!@#$%^&*()-=[]{}()|<>,./?";
          break;

        default:
          break;
      }
    });

    if (selectedOption.length === 0) {
      setError("Please select at least       one option");
      setPassword("");
      return;
    }
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
      
    }
    setPassword(generatedPassword);
    setError("");

  };

  return { password, error, generatePassword,setError};
};

export default usePasswordGenerator;
