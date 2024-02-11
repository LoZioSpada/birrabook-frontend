import { useContext, useState } from "react"
import { Col, Modal, Form, Button } from "react-bootstrap"
import ReactStars from "react-stars"
import AuthContext from "../../context/AuthContext"

function ManageComment({ id, fetchComments, singleComment, comment, userId }) {
    const { userData } = useContext(AuthContext)
    // const  userId  = userData && userData.userId
    console.log("UserID nel contesto di autenticazione:", userId);
    const [show, setShow] = useState(false)
    const [text, setText] = useState(singleComment ? singleComment.comment : "")
    const [rate, setRate] = useState(singleComment ? singleComment.rate : 0)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const rateChanged = (newRate) => {
        setRate(newRate)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!userId){
            alert("userId non definito o vuoto")
            return
        }

        const url = singleComment
            ? `http://localhost:3050/api/beers/${id}/comments/${comment._id}` // URL PER LA MODIFICA
            : `http://localhost:3050/api/beers/${id}/comments` // URL PER L'AGGIUNTA

        console.log(url)
        const method = singleComment ? "PUT" : "POST"
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
            method: method,
            body: JSON.stringify({ text: text, rate: rate, author: userId }),
        })

        if (response.ok) {
            fetchComments()
            alert("Operazione eseguita con successo!!")
            setText("")
            handleClose()
        } else {
            alert("Si é verificato un errore!!")
        }
    }

    return (
        <Col xs={12}>
            <Button variant="primary" onClick={handleShow}>
                {singleComment ? "Modifica ✏" : "Scrivi un commento 🖋"}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {singleComment ? "Modifica: " : "Pubblica:"}
                    </Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3 mt-2" controlId="rate">
                            <ReactStars
                                count={5}
                                value={rate}
                                onChange={rateChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 mt-2" controlId="text">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={text}
                                onChange={(event) =>
                                    setText(event.target.value)
                                }
                                required
                                name="text"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button variant="primary" type="submit">
                            {singleComment ? "Salva" : "Pubblica"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Col>
    )
}

export default ManageComment