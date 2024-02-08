import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState()
    const [userType, setUserType] = useState()
    const navigate = useNavigate()

    const login = async (email, password) => {
        const response = await fetch("http://localhost:3050/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json()
        if(response.ok){
            localStorage.setItem("token", data.token)
            navigate('/main')
        } else {
            alert("Credenziali errate, riprova!!")
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUserData(null)
        navigate('/')
    }

    return(
        <AuthContext.Provider value={{ userData, login, logout, userType }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext