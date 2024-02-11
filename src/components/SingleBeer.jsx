import { useCallback, useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Col, Container, Row, Image } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ManageComment from "./Comments/ManageComment"
import CommentBeer from "./Comments/CommentBeer"
import ReactStars from "react-stars"
import AuthContext from "../context/AuthContext"

export default function SingleBeer() {
    const { id } = useParams()
    const [beer, setBeer] = useState(null)
    const [comments, setComments] = useState([])
    const { userData } = useContext(AuthContext)
    const userId = localStorage.getItem("userId")

    const fetchComments = useCallback(async () => {
        const commentResponse = await fetch(
            `http://localhost:3050/api/beers/${id}/comments`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${userId}`,
                },
            }
        )
        if (commentResponse.ok) {
            const commentsData = await commentResponse.json()
            setComments(commentsData)
        } else {
            console.error("Errore nel caricamento dei commenti")
        }
    }, [id, userId])

    useEffect(() => {
        async function fetchBeer() {
            try {
                const response = await fetch(
                    `http://localhost:3050/api/beers/${id}`
                )
                const beerData = await response.json()
                setBeer(beerData)

                fetchComments()
            } catch (error) {
                console.error("Qualcosa é andato storto!")
            }
        }

        fetchBeer()
    }, [id, fetchComments])

    if(!beer || !comments){
        return null
    }

    return (
        beer &&
        comments && (
            <>
                <Container className="d-flex mt-5" fluid>
                    <Row className="ms-5">
                        <Col xs={12} style={{ maxHeight: "30rem" }}>
                            <Image src={beer.photo} />
                        </Col>
                    </Row>

                    <Row className="ms-5">
                        <Col xs={12}>
                            <div>
                                <h2 className="mb-5">{beer.name}</h2>
                                <h4 className="mb-5">
                                    Birrificio: {beer.brewery}
                                </h4>
                                <h5 className="mb-5">Luogo: {beer.place}</h5>
                                <h6 className="mb-5">Alc: {beer.alc}</h6>
                            </div>
                            <div className="mb-5 pe-5">
                                <strong>{beer.description}</strong>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="mt-5" fluid>
                    <Row className="mt-5">
                        <Col xs={4}>
                            <h5>Commenti: ({comments.length})</h5>
                            <div>
                                <ReactStars
                                    count={5}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </div>
                        </Col>
                        <Col xs={4}>
                            <ManageComment
                                fetchComments={fetchComments}
                                id={id}
                                comment={comments[0]}
                                userId={userData.userId}
                            />
                            {comments.length === 0 ? (
                                <p>Non ci sono ancora commenti</p>
                            ) : (
                                <CommentBeer
                                    comments={comments}
                                    fetchComments={fetchComments}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    )
}
