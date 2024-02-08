import { useState } from "react"
import "./App.scss"
import { useEffect } from "react"
import Navbar from "./components/Navbar/index.jsx"
import Footer from "./components/Footer/index.jsx"
import { Routes, Route } from "react-router-dom"
import Welcome from "./components/Welcome/index.jsx"
import Register from "./components/Register/index.jsx"
import { AuthProvider } from "./context/AuthContext.js"
import AllTheBeers from "./components/AllTheBeers.jsx"

function App() {
    // funzione che cambia il tema chiaro/scuro in base a quello impostato dal dispositivo
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark")
        setIsDarkMode(darkModeQuery.matches)

        const handleThemeChange = (event) => {
            setIsDarkMode(event.matches)
        }

        darkModeQuery.addEventListener("change", handleThemeChange)
        return () => {
            darkModeQuery.removeEventListener("change", handleThemeChange)
        }
    }, [])

    return (
        <AuthProvider>
            <div className={isDarkMode ? "dark-mode" : "light-mode"}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Navbar />
                                <Welcome />
                            </>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <>
                                <Navbar />
                                <Register />
                            </>
                        }
                    />
                    <Route 
                        path="/main"
                        element={
                            <>
                                <Navbar />
                                <AllTheBeers />
                            </>
                        }
                    
                    />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    )
}

export default App
