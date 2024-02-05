import { Container, Alert, Button } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Register() {
    const navigate = useNavigate("")
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
        const isValid = password.length >= 8 && hasUpperCase && hasSpecialChar
        setPasswordValid(isValid)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch("REACT_APP_BACKEND_ENDPOINT/api/users", {
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
        }
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="nameInput">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nome"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="surnameInput">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                    type="surname"
                    placeholder="cognome"
                    required
                    value={formData.surname}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="birthInput" active>
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control
                    type="date"
                    required
                    value={formData.birth}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="emailInput">
                    <Form.Label>Indirizzo email</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                    />
                    <Form.Text>
                        Non condivideremo MAI la tua mail con qualcuno
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="passwordInput">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    />
                    {!passwordValid &&(
                        <Alert>
                            La password deve essere lunga almeno 8 caratteri, contenere una lettera maiuscola e un carattere speciale!
                        </Alert>
                    )}
                </Form.Group>
                <Button variant='primary' type='submit' className='rounded-5' disabled={!passwordValid}>
                    Registrati
                </Button>
            </Form>
        </Container>
    )
}

export default Register
