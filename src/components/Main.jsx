import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { Container, Row } from "react-bootstrap"
import BeerCard from "./BeerCard"
import NavbarSearch from "./NavbarSearch"

export default function Main() {
    const { userType, userData } = useContext(AuthContext)
    const [beers, setBeers] = useState([])
    const [sortedBeers, setSortedBeers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetch("http://localhost:3050/api/beers", {})
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setBeers(data)
                setSortedBeers(data)
            })
            .catch((error) => console.error("Error fetching beers", error))
    }, [userType, userData])

    return (
        <>
            <NavbarSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                beers={beers}
                setSortedBeers={setSortedBeers}
            />
            <Container className="mt-5">
                <h1>Cerca la tua birra preferita! 🍻</h1>
                <Row>
                    {sortedBeers.map((beer, i) => (
                        <BeerCard beer={beer} key={i} />
                    ))}
                </Row>
            </Container>
        </>
    )
}
