import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";

export default function AllTheBeers ({ searchQuery }) {
    const { userType, userData } = useContext(AuthContext)
    const [selected, setSelected] = useState(false)
    const navigate = useNavigate()

    return(
        <>
            <Container>
                <Row>
                    <Col>
                        {allTheBeers ? (allTheBeers.filter((b) => b.name.toLowerCase().includes(searchQuery)).map((beer) =>(
                            <SingleBeer 
                                selected={selected}
                                setSelected={setSelected}
                                photo={beer.photo}
                                name={beer.name}
                                brewery={beer.brewery}
                                place={beer.place}
                                description={beer.description}
                                asin={beer.asin}
                            />
                        )
                        )) : (
                            <h1 className="text-center">SCEGLI UNA BIRRA!🍻</h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}