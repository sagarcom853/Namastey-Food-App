import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./About";
import Contact from "./Contact";
import HotelPage from "./HotelPage";
import HotellPageIndi from "./HotelPageIndi";
import Cart from "./Cart";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./authentication/Login";
import SignupPage from "./authentication/SignupPage";
import Layout from "./authentication/Layout";
import ProtectedRoute from "./authentication/ProtectedRoutes";
import { useSelector } from 'react-redux'
import { IntlProvider } from "react-intl";
import HelpPage from "./HelpPage";

const GeneratePassword1 = lazy(() =>
  import("./Password Generator old/GeneratePassword1")
);
const PasswordGenerate = lazy(() =>
  import("./passwordGeneratorNew/PasswordGenerate")
);
const Grocery = lazy(() => import("./Grocery"));
const BarCode = lazy(() => import("./Scanner/BarCode"));
const ProgressBar = lazy(() => import('./Progressbar/ProgressBar'));

const App = () => {
  let HighestPriceValue = 800;

  const [plates, changePlates] = useState(0);
  const [priceFilter, setPriceFilter] = useState(HighestPriceValue);
  const [value, setValue] = useState(HighestPriceValue);
  const darkMode = useSelector((store) => store.cart?.dark)

  //instead of manually setting data, write a loop
  const setMarks = (HighestPriceValue, steps) => {
    const marks = [];
    for (let i = 0; i <= HighestPriceValue; i += steps) {
      marks.push({ value: i, label: i.toString() });
    }
    return marks;
  };

  let steps = 100;
  let marks = setMarks(HighestPriceValue, steps);

  function valuetext(value) {
    return `${value} rupees`;
  }

  // const handleSearchChange = (e) => {
  //   if (textFieldValue) {
  //     setTextFieldValue("");
  //   }
  //   setTextFieldValue(e.target.value);
  // };
  const handleChange = (event) => {
    setPriceFilter(event.target.value === "" ? "" : Number(event.target.value));
  };
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > HighestPriceValue) {
      setValue(HighestPriceValue);
    }
  };

  console.log("IntlProvider",IntlProvider);
  //filter using dropdown

  return (
    <div className={`w-full relative z-10 ${darkMode ? 'darkModeCSS' : ''}`}>
    <IntlProvider messages={{}} locale="en" defaultLocale="en">
      <BrowserRouter>
        {/* <Header plates={plates} /> */}
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignupPage />} />
          <Route exact path="/*" element={<Layout>
            <Routes>
              <Route
                path='/'
                element={
                  <Home
                    marks={marks}
                    handleChange={handleChange}
                    valuetext={valuetext}
                    handleBlur={handleBlur}
                    priceFilter={priceFilter}
                    value={value}
                    HighestPriceValue={HighestPriceValue}
                  />
                }
              />
              <Route exact path='about' element={<About />} />
              <Route exact path='help' element={<HelpPage />} />
              <Route exact path='contact' element={<Contact />} />
              <Route exact path='hotelPage' element={<HotelPage />} />
              <Route exact path='/restaurant/:id' element={<HotellPageIndi />} />
              {/* <Route element={<RequireAuth />}>
             <Route path="/protected" element={<ProtectedPage />} />
             <Route path="/dashboard" element={<Dashboard />} />
             </Route> */}

              <Route path="cart" element={<ProtectedRoute />}>
                <Route index element={<Cart />} />
              </Route>

              <Route
                exact
                path='grocery'
                element={
                  <Suspense fallback={<p> Loading..............</p>}>
                    <Grocery />
                  </Suspense>
                }
              />
              <Route
                exact
                path='generate-password'
                element={
                  <Suspense fallback={<p> Password Generate..............</p>}>
                    <GeneratePassword1 />
                  </Suspense>
                }
              />
              <Route
                exact
                path='generate-password2'
                element={
                  <Suspense fallback={<p> Password Generate..............</p>}>
                    <PasswordGenerate />
                  </Suspense>
                }
              />
              <Route
                exact
                path='barcode'
                element={
                  <Suspense fallback={<p> Loading Scanner..............</p>}>
                    <BarCode />
                  </Suspense>
                }
              />
              <Route
                exact
                path='progress'
                element={
                  <Suspense fallback={<p> Loading Progress..............</p>}>
                    <ProgressBar />
                  </Suspense>
                }
              />

            </Routes>

          </Layout>} />

        </Routes>
        {/* <Footer /> */}
      </BrowserRouter >
      </IntlProvider>
    </div >
  );
};

export default App;
