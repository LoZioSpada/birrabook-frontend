import { Container, Form, Button, Row, Col } from "react-bootstrap"
import Alert from "react-bootstrap/Alert"
import styles from "./style.module.scss"
import cn from "classnames"
import { GoogleLoginButton } from "react-social-login-buttons"

export default function Welcome() {
    return (
        <>
            <Container className="px-0 d-flex">
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
                        <Form className="px-5 mt-5 mx-5">
                            <h3>Accedi</h3>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="rounded-5"
                                    type="email"
                                    placeholder="Email"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="rounded-5"
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                Non sei ancora registrato?{" "}
                                <a href="/">Clicca qui</a>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="rounded-5"
                            >
                                Accedi
                            </Button>
                        </Form>

                        <div className="px-5 mt-5 mx-5">
                            <GoogleLoginButton
                                className="rounded-5"
                                onClick={() => {
                                    window.location.assign(
                                        `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/oauth-google`
                                    )
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
