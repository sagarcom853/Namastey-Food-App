import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Components/Redux/Store";
import AuthProvider from "./Components/Context/AuthProvider";
import { MyProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <MyProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MyProvider>
  </AuthProvider>
);
