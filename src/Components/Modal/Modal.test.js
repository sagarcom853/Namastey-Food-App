import React from "react"
import { render, screen } from "@testing-library/react"
import Header from "./Header"
import { Provider } from "react-redux"
import Store from "./Redux/Store"
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from "./Context/AuthProvider"

describe("Inside Header Component", () => {
    const authValue = { isAuthenticated: true, token: "hello" };
    it('should render a Modal Component', () => {
        render(
            <AuthContext.Provider value={authValue}>
                <BrowserRouter>
                    <Provider store={Store}>
                        <Header />
                    </Provider>
                </BrowserRouter>
            </AuthContext.Provider>

        );
        screen.logTestingPlaygroundURL();
    
    
        // const loginButton = screen.getByRole("button")
        // expect(loginButton).toBeInTheDocument()
    })
})