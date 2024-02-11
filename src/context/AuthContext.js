import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        token: localStorage.getItem("token") || "",
        userId: localStorage.getItem("userId") || "",
    })
    const navigate = useNavigate()

    const login = async (email, password) => {
        const response = await fetch(
            "http://localhost:3050/api/users/session",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        )

        const data = await response.json()
        if (response.ok) {
            localStorage.setItem("token", data.token.id)
            localStorage.setItem("userId", data.token.userId)
            setUserData({ token: data.token.id, userId: data.token.userId })
            navigate("/session")
        } else {
            alert("Credenziali errate! Riprova!!")
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        setUserData({ token: "", userId: "" })
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
