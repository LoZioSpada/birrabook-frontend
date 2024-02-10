import { Container, Alert, Button } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

function Register() {
    const navigate = useNavigate("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        birth: "",
        email: "",
        password: "",
    })

    const [passwordValid, setPasswordValid] = useState(true)
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        if (event.target.name === "password") {
            checkPassword(event.target.value)
        }
    }

    const checkPassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        const hasNumberChar = /[0-9]/.test(password)
        const isValid =
            password.length >= 8 &&
            hasUpperCase &&
            hasSpecialChar &&
            hasNumberChar
        setPasswordValid(isValid)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const response = await fetch("http://localhost:3050/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        const data = await response.json()
        if (!response.ok) {
            if (
                response.status === 400 &&
                data.message === "Questa email già esiste!"
            ) {
                alert("Questa email già esiste!")
                return
            } else {
                throw new Error(
                    data.message || "Errore durante la registrazione"
                )
            }
        } else {
            localStorage.setItem("token", data.token)
            navigate("/")
            alert("Registrazione avvenuta con successo!")
        }
    }

    return (
        <Container className="mt-5 mb-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-5" controlId="nameInput">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nome"
                    />
                </Form.Group>

                <Form.Group className="mb-5" controlId="surnameInput">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Cognome"
                        name="surname"
                        required
                        value={formData.surname}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-5" controlId="birthInput" active>
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control
                        type="date"
                        name="birth"
                        required
                        value={formData.birth}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-5" controlId="emailInput">
                    <Form.Label>Indirizzo email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        required
                        onChange={handleChange}
                    />
                    Non condivideremo MAI la tua mail con qualcuno
                </Form.Group>

                <Form.Group className="mb-5" controlId="passwordInput">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {!passwordValid && (
                        <Alert variant="danger">
                            La password deve essere lunga almeno 8 caratteri,
                            contenere una lettera maiuscola, un numero e un
                            carattere speciale!
                        </Alert>
                    )}
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="rounded-5"
                    disabled={!passwordValid}
                >
                    <Link to={'/'}>Registrati</Link>
                </Button>
            </Form>   
        </Container>
    )
}

export default Register
