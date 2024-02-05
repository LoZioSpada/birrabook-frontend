import { Container } from "react-bootstrap"
import Form from "react-bootstrap/Form"

function Register() {
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Nome" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" placeholder="cognome" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate" active>
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Indirizzo email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                    <Form.Text>
                        Non condivideremo MAI la tua mail con qualcuno
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Register
