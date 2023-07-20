import React, { useEffect } from "react";

const PasswordStrengthIndicator = ({
  password,
  setPasswordColor,
  setpasswordDescription,
  passwordColor="",
  passwordDescription,
}) => {

  const getPasswordStrength = (password) => {
    if (password.length >= 0 && password.length <= 6) {
      return {
        passwordDescription: "Poor",
        passwordColor: "flex justify-center bg-red-500 hover:text-white  rounded-md p-1 w-24 cursor-pointer content-center",
      };
    } else if (password.length >= 7 && password.length <= 12) {
      return {
        passwordDescription: "Weak",
        passwordColor: "flex justify-center bg-yellow-500 hover:text-white rounded-md p-1 w-24 cursor-pointer content-center",
      };
    } else if (password.length >= 13 && password.length <= 17) {
      return {
        passwordDescription: "Strong",
        passwordColor: "flex bg-green-500 hover:text-white  rounded-md p-1 w-24 cursor-pointer justify-center",
      };
    } else {
      return {
        passwordDescription: "Very Strong",
        passwordColor: "bg-green-700 hover:text-white flex justify-center rounded-md p-1 w-24 cursor-pointer content-center",
      };
    }
  };

  const updatePasswordStrength = () => {
    if (!password) {
      setpasswordDescription("");
      setPasswordColor("");
      return;
    }

    const { passwordDescription, passwordColor } =
      getPasswordStrength(password);
    setpasswordDescription(passwordDescription);
    setPasswordColor(passwordColor);
  }

  updatePasswordStrength();

  return (
    <div className="flex flex-wrap justify-between content-center text-center mx-3 my-5 ">
      <p className="font-bold text-sm font-mono">Password Strength</p>
      <p className={passwordColor}>{passwordDescription}</p>
    </div>
  );
};

export default PasswordStrengthIndicator;
