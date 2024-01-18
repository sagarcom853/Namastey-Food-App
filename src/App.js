import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Contact from "./Contact/Contact";
import HotelPage from "./Components/HotelPage";
import HotellPageIndi from "./Components/HotelPageIndi";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import Login from "./Components/authentication/Login";
import SignupPage from "./Components/authentication/SignupPage";
import Layout from "./Components/authentication/Layout";
import ProtectedRoute from "./Components/authentication/ProtectedRoutes";
import ProfilePage from "./Components/ProfilePage";
import { useSelector } from 'react-redux'
import { IntlProvider } from "react-intl";
import BasicForm from "./Components/forms/BasicForm"
import AdditionalFormPage from "./Components/forms/AdditionalForm";
import PaymentPage from "./Components/PaymentPage";
import SuccessPage from "./Components/OrdersDetailsPage";
import MyOrders from "./Components/MyOrders"
import PageNotFound from "./Components/PageNotFound";
import Favourites from "./Components/Favourites";
import OrdersDetails from "./Components/OrdersDetailsPage"

const HelpPage = lazy(() =>
  import("./Components/HelpPage")
);
const GeneratePassword1 = lazy(() =>
  import("./Password Generator old/GeneratePassword1")
);
const PasswordGenerate = lazy(() =>
  import("./passwordGeneratorNew/PasswordGenerate")
);
const Grocery = lazy(() => import("./Components/Grocery"));
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

  //filter using dropdown
  return (
    <div className={`relative z-10 ${darkMode ? 'darkModeCSS' : ''}`}>
      <IntlProvider messages={{}} locale="en" defaultLocale="en">
        <BrowserRouter>
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignupPage />} />
            <Route exact path="/*" element={<Layout>
              <Routes>
                <Route
                  path='/home'
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
                <Route exact path='contact' element={<Contact />} />
                <Route exact path='hotelPage' element={<HotelPage />} />
                <Route exact path='help' element={<HelpPage />} />
                <Route exact path='/restaurant/:id' element={<HotellPageIndi />} />
                <Route index path='cart' element={<Cart />} />
                  <Route exact path='payment' element={<PaymentPage />} />


                <Route path="" element={<ProtectedRoute />}>
                  <Route exact path='profile' element={<ProfilePage />} />
                  <Route exact path='basicform' element={<BasicForm />} />
                  <Route exact path='additionalform' element={<AdditionalFormPage />} />
                  <Route exact path='orders/:id/:itemId' element={< OrdersDetails/>} />
                  <Route exact path='orders' element={<MyOrders />} />
                  <Route exact path='favourites' element={<Favourites />} />
                </Route>
                <Route
                  exact
                  path='grocery'

                  element={
                    <Suspense fallback={<p> Loading..............</p>}>
                      <div>
                        <Grocery />

                      </div>
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
                <Route path='*' element={<PageNotFound />} />


              </Routes>

            </Layout>} />

          </Routes>
        </BrowserRouter >
      </IntlProvider>
    </div >
  );
};

export default App;
