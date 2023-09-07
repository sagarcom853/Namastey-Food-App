import React from "react"
import { render, screen } from "@testing-library/react"
import Header from "./Header"
import { Provider } from "react-redux"
import Store from "./Redux/Store"
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from "./Context/AuthProvider"

describe("Inside Header Component", () => {
    const authValue = { isAuthenticated: true, token: "hello" };
    it('should render a Header Component', () => {
        render(
            <AuthContext.Provider value={authValue}>
                <BrowserRouter>
                    <Provider store={Store}>
                        <Header />
                    </Provider>
                </BrowserRouter>
            </AuthContext.Provider>

        );
        // const loginButton = screen.getByRole("button")
        // expect(loginButton).toBeInTheDocument()
    })
})
describe("It should render Header component", () => {
    it('should render a Header Component with card Item Zero', () => {
        const authValue = { isAuthenticated: true, token: "hello" };
        render(
            <AuthContext.Provider value={authValue}>
                <BrowserRouter>
                    <Provider store={Store}>
                        <Header />
                    </Provider>
                </BrowserRouter>
            </AuthContext.Provider>

        );
        const cartItem = screen.getByText("0 items")
        expect(cartItem).toBeInTheDocument()
    })
})
// describe("It should check cart components", () => {
//     it('should render a Header Component with card Item more then zero', () => {
//         render(
//             <BrowserRouter>
//                 <Provider store={Store}>
//                     <Header />
//                 </Provider>
//             </BrowserRouter>
//         );
//         const cartItem = screen.getByText(/items/)
//         expect(cartItem).toBeInTheDocument()
//     })
// })
// describe("It should check cart components", () => {
//     it('should render a Header Component with card Item more then zero', () => {
//         render(
//             <BrowserRouter>
//                 <Provider store={Store}>
//                     <Header />
//                 </Provider>
//             </BrowserRouter>
//         );
//        const cartItem = screen.getByText(/items/)
//        expect(cartItem).toBeInTheDocument()
//     })
// })