import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { Container, Row, Col } from "react-bootstrap"
import BeerCard from "./BeerCard"

export default function AllTheBeers({ searchQuery }) {
    const { userType, userData } = useContext(AuthContext)
    const [beers, setBeers] = useState([])
    const [sortedBeers, setSortedBeers] = useState([])


    useEffect(() => {
        if (userType === "user" && userData) {
            fetch("http://localhost:3050/api/beers")
                .then((response) => response.json())
                .then((data) => setBeers(data))
                .catch((error) => console.error("Error fetching beers", error))
        }
    }, [userType, userData])

    if (userType === "user") {
        return (
            <>
                <Container>
                    <Row>
                        <h1>Cerca la tua birra preferita! 🍻</h1>
                        <Col xs={12} lg={4} style={{ overflow: "auto" }}>
                            {sortedBeers.map((beer, i) => (
                                <BeerCard beer={beer} key={i} />
                            ))}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
