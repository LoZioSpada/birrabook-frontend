import Navbar from "react-bootstrap/Navbar"
import { Form, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./style.module.scss"
import cn from "classnames"

export default function NavbarSearch({ searchQuery, setSearchQuery, beers, setSortedBeers }) {

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchQuery(searchTerm);
        const filteredBeers = beers.filter(beer =>
            beer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSortedBeers(filteredBeers);
    };


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
                            onChange={handleSearch}
                        />
                    </Form.Group>
                </Container>
            </Navbar>
        </>
    )
}
