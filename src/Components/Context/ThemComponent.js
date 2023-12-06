import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

const ThemeComponent = () => {
    // Access the theme and toggleTheme function from the context
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div>
            <h1 style={{ color: theme === "light" ? "black" : "red" }}>
                Current Theme: {theme}
            </h1>
            <button className="bg-teal-200 text-black p-1 m-2 shadow-lg border rounded-md text-center w-48 hover:bg-teal-400" onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

export default ThemeComponent;
