import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ManageComment from './Comments/ManageComment'
import CommentBeer from './Comments/CommentBeer'
import ReactStars from 'react-rating-stars-component'

export default function SingleBeer(){
    const { id } = useParams()
    const queryParams = new URLSearchParams()
    const [beer, setBeer] = useState(null)
    const [comments, setComments] = useState(null)
    const token = localStorage.getItem('token')

    const fetchComments = useCallback(async () => {
        const commentResponse = await fetch(`REACT_APP_BACKEND_ENDPOINT/api/beers/${id}/comments`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if(commentResponse.ok){
            const commentsData = await commentResponse.json()
            setComments(commentsData)
        } else {
            console.error('Errore nel caricamento dei commenti')
        }
    }, [id, token])

    useEffect(() => {
        async function fetchBeer(){
            try{
                const response = await fetch(`REACT_APP_BACKEND_ENDPOINT/api/beers/${id}`)
                const beerData = await response.json()
                setBeer(beerData)
                
                fetchComments()
            } catch(error) {
                console.error('Qualcosa é andato storto!')
            }
        }

        fetchBeer()
    }, [id, fetchComments])

    return (
        beer && comments && (
            <>
                <Container fluid>
                    <Row>
                        <Col xs={12} style={{ maxHeight: '30rem' }}>
                            <Image src={beer.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                        </Col>
                    </Row>
                </Container>
                <Container className="mt-3" fluid>
                    <Row>
                        <Col xs={12} lg={8}>
                            <div className="d-flex justify-content-between">
                                <h3>{beer.name}</h3>
                                <p>Birrificio: {beer.brewery}</p>
                                <p className="me-5">Luogo: {beer.place}</p>
                            </div>
                            <p>{beer.description}</p>
                        </Col>
                    </Row>
                    <Row>
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
                            <ManageComment fetchComments={fetchComments} id={id} />
                            {comments.length === 0 ? <p>Non ci sono ancora commenti</p> : <CommentBeer comments={comments} fetchComments={fetchComments} /> }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    )
}