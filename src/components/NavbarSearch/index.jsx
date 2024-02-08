import Navbar from "react-bootstrap/Navbar"
import { Form, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./style.module.scss"
import cn from "classnames"
import { PersonCircle } from "react-bootstrap-icons"

export default function NavbarSearch({ searchQuery, setSearchQuery }) {
    return (
        <>
            <Navbar expand="lg" className={cn(styles.navbg)}>
                <Container>
                    <Link to="/" className={cn(styles.navLink)}>
                        <Navbar.Brand>🍻 Birrabook 🍻</Navbar.Brand>
                    </Link>
                    <Form.Group className="pe-5">
                        <Form.Control
                            type="text"
                            placeholder="Cerca..."
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control>
                            <PersonCircle />
                            {/* inserire logout*/}
                        </Form.Control>
                    </Form.Group>
                </Container>
            </Navbar>
        </>
    )
}
