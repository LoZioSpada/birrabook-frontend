import { Container, Form, Button, Row, Col } from "react-bootstrap"
import Alert from "react-bootstrap/Alert"
import styles from "./style.module.scss"
import cn from "classnames"
import { GoogleLoginButton } from "react-social-login-buttons"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from '../../context/AuthContext'

export default function Welcome() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)

    const handleLogin = async(event) =>{
        event.preventDefault()
        await login(email, password)
    }


    return (
        <>
            <Container className={cn("px-0 d-flex mt-5", styles.viewport)}>
                <Row>
                    <Col md={6}>
                        <Alert className={cn(styles.alertBg, "px-3 mt-5 mx-5")}>
                            <Alert.Heading>
                                <h2>
                                    <strong>BENVENUTO SU BIRRABOOK 🍻 </strong>
                                </h2>
                            </Alert.Heading>
                            <h4>
                                Per favore, registrati o accedi per continuare!
                            </h4>
                            <hr />
                            <h5>Chè cos'é Birrabook?</h5>
                            <h5>
                                Birrabook è un sito dove puoi consultare le
                                migliori birre artigianali e dare la propria
                                opinione!
                            </h5>
                        </Alert>
                    </Col>

                    <Col md={6}>
                        <Form onSubmit={handleLogin} className="px-5 mt-5 mx-5 mb-5">
                            <h3>Accedi</h3>
                            <Form.Group
                                className="mb-3"
                                controlId="emailInput"
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="rounded-5"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    required
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="passwordInput"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="rounded-5"
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    required
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                Non sei ancora registrato?{" "}
                                <Link to={'/register'}>Clicca qui</Link>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="rounded-5"
                            >
                                Accedi
                            </Button>
                        </Form>

                        <div className="px-5 mt-5 mx-5 mb-5">
                            <GoogleLoginButton
                                className="rounded-5"
                                onClick={() => {
                                    window.location.assign(
                                        `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/oauth/callback`
                                    )
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            <div>
                 
            </div>
        </>
    )
}