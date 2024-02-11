import { useState } from "react"
import "./App.scss"
import { useEffect } from "react"
import Navbar from "./components/Navbar/index.jsx"
import Footer from "./components/Footer/index.jsx"
import { Routes, Route } from "react-router-dom"
import Welcome from "./components/Welcome/index.jsx"
import Register from "./components/Register/index.jsx"
import { AuthProvider } from "./context/AuthContext.js"
import Main from "./components/Main.jsx"
import SingleBeer from "./components/SingleBeer.jsx"


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
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <>
                                <Navbar />
                                <Register />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/session"
                        element={
                            <>
                                <Main  />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/beer/:id"
                        element={
                            <>
                                <Navbar />
                                <SingleBeer />
                                <Footer />
                            </>
                        }
                    />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App
