import React, { useState } from "react";
import { Slider, Input } from "@mui/material";
import usePasswordGenerator from "./usePasswordGenerator";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const GeneratePassword = () => {
  const [passwordLength, setpasswordLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [passwordDescription, setpasswordDescription] = useState("");
  const [passwordColor, setPasswordColor] = useState("");

  const [checkBoxData] = useState([
    { title: "Include upperCase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include LowerCase Letters", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const { password, error, setError, generatePassword } =
    usePasswordGenerator();

  const handleChange = (e) => {
    setpasswordLength(e.target.value);
  };



  const handleCheckboxChange = (i) => {
    setError("");
    let updatedchecboxData = [...checkBoxData];
    updatedchecboxData[i].state = !updatedchecboxData[i].state;
  };

  const Copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-cyan-200 h-auto w-4/5 mx-auto my-8 shadow-2xl rounded-md">
      <div className="flex flex-wrap justify-between relative top-5 m-5">
        <p className="font-bold">{password}</p>
        <button
          onClick={Copy}
          disabled={!password}
          className={
            password
              ? "bg-teal-300 hover:bg-teal-400 rounded-md p-1 w-16 h-auto uppercase font-medium cursor-pointer shadow-lg"
              : ""
          }
        >
          {password ? (copied ? "Copied" : "Copy") : ""}
        </button>
      </div>
      <div className="flex">
        <Slider
          className="m-5"
          style={{ width: "250px" }}
          size="small"
          aria-label="Always visible"
          value={passwordLength}
          defaultValue={passwordLength}
          onChange={handleChange}
          aria-labelledby="input-slider"
          step={1}
          marks=""
          min={0}
          max={20}
          valueLabelDisplay="off"
        />
        <Input
          className="ml-4 mb-8 border-0 bg-cyan-200"
          value={passwordLength}
          key="filter-slider"
          size="small"
          onChange={handleChange}
          inputProps={{
            step: 1,
            min: 0,
            max: 20,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>

      <div className="flex flex-wrap">
        {checkBoxData.map((checkbox, index) => {
          return (
            <div className="mx-3 font-mono text-sm" key={index}>
              <input
                className="p-2"
                type="checkbox"
                id={checkbox.title}
                name={checkbox.title}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={checkbox.title} className="p-2">
                {checkbox.title}
              </label>
            </div>
          );
        })}
      </div>

      <PasswordStrengthIndicator
        password={password}
        passwordColor={passwordColor}
        setPasswordColor={setPasswordColor}
        passwordDescription={passwordDescription}
        setpasswordDescription={setpasswordDescription}
      />
      <div className="w-auto flex items-center justify-center p-3 ">
        <button
          onClick={() => generatePassword(checkBoxData, passwordLength)}
          className="bg-teal-400 hover:bg-teal-500 h-8 w-full content-stretch rounded-md shadow-xl font-medium pb-4"
        >
          {" "}
          Generate Password
        </button>
      </div>
      <div className="text-red-500 w-full mx-3 pb-4 font-bold">{error}</div>
    </div>
  );
};

export default GeneratePassword;
