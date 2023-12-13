import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({ children }) => {
    return (
        <div>
            <Header apiKey = {'AIzaSyDiWfhcmXqs2zTdBV81ohncxWz3Vf8P9Xk'}/>
            {children}
            <Footer />
        </div>
    )
}

export default Layout