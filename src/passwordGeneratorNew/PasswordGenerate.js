import React, { useState } from "react";
import usePasswordGenerator from "../Password Generator old/usePasswordGenerator";
import PasswordStrngthIndicator from "./PasswordStrngthIndicator";

const PasswordGenerate = () => {
  const [passwordLength, setPasswordLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [checkboxData, setcheckBoxData] = useState([
    { title: "Include upperCase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include LowerCase Letters", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [passwordDescription, setpasswordDescription] = useState("");
  const [passwordColor, setPasswordColor] = useState("");

  const handleSliderChange = (e) => {
    setPasswordLength(e.target.value);
  };
  const handleCheckboxChange = (e) => {
    let checkboxDataCopy = [...checkboxData];
    checkboxDataCopy.forEach((checkbox) => {
      if (checkbox.title === e.target.name) {
        checkbox.state = !checkbox.state;
      }
    });
    setError("");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    if (password) {
      setCopied(true);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const { generatePassword, password, error, setError } =
    usePasswordGenerator();
  return (
    <div className="bg-cyan-400 h-3/4 w-4/5 mx-auto my-8 rounded-md shadow-2xl">
      <div className="flex flex-wrap justify-between relative content-center top-5 mx-3">
        <div className="font-bold">{password}</div>
        {password ? (
          <button
            onClick={handleCopy}
            className="bg-teal-300 hover:bg-teal-700 hover:text-white cursor-pointer w-24 text-center rounded-md p-1 uppercase font-medium mx-3"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-wrap justify-between m-5 my-6">
        <input
          className=""
          type="range"
          min={0}
          max={20}
          id="passwordLength"
          name="passwordLength"
          value={passwordLength}
          onChange={handleSliderChange}
        />
        <h2 className="font-bold hover:text-white underline text-lg mr-3">
          {passwordLength}
        </h2>
      </div>
      <div>
        <div className="flex flex-wrap justify-between text-sm mx-5">
          {checkboxData.map((checkbox, index) => {
            return (
              <div key={index} className="flex flex-wrap gap-1 ">
                <input
                  type="checkbox"
                  name={checkbox.title}
                  value={checkbox.checked}
                  id={checkbox.title}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={checkbox.title}
                  className="font-mono font-bold hover:text-white"
                  id={checkbox.title}
                >
                  {checkbox.title}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <PasswordStrngthIndicator
        password={password}
        passwordColor={passwordColor}
        setPasswordColor={setPasswordColor}
        passwordDescription={passwordDescription}
        setpasswordDescription={setpasswordDescription}
      />
      <div className="flex flex-wrap justify-center">
        <button
          onClick={() => generatePassword(checkboxData, passwordLength)}
          className="bg-teal-300 hover:bg-teal-700 hover:text-white w-full m-5 cursor-pointer text-center rounded-md p-1 uppercase font-medium shadow-2xl"
        >
          Generate Password
        </button>
      </div>
      <div className="relative bottom-3 my-3">
        <p className="text-center text-red-800 font-bold">{error}</p>
      </div>
    </div>
  );
};

export default PasswordGenerate;


