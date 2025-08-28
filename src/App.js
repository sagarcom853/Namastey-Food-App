import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { MyRoutes } from "./useHooks/useRoutes";
import { ChatPage } from "./useHooks/useAssistant";
import "./App.css";

const App = () => {
  const darkMode = useSelector((store) => store.cart?.dark);

  return (
    <div className={`relative z-10 ${darkMode ? "darkModeCSS" : ""}`}>
      <IntlProvider messages={{}} locale='en' defaultLocale='en'>
        <MyRoutes />
        <ChatPage />
      </IntlProvider>
    </div>
  );
};

export default App;
