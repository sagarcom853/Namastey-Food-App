import React, { useState } from "react";

const usePasswordGenerator = ({ checkboxData, passwordLength }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = (checkboxData, passwordLength) => {
    let Characters = "";
    let password = "";

    let selectedOption = checkboxData.filter((checkbox) => {
      return checkbox.checked === true;
    });
    selectedOption.forEach((option) => {
      if (option.name === "Include upperCase Letters") {
        Characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (option.name === "Include LowerCase Letters") {
        Characters += "abcdefghijklmnopqrstuvwxyz";
      }
      if (option.name === "Include Numbers") {
        Characters += "0123456789";
      }
      if (option.name === "Included Symbols") {
        Characters += "!@#$%^&*()_+;][{}|?./`~><,";
      }
    });
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * Characters.length);
      password += Characters[randomIndex];
    }
    if(!password){
      setError("Please select atleast one option")
    }
    setPassword(password);

  };
  return { generatePassword, password,error,setError };
};

export default usePasswordGenerator;
