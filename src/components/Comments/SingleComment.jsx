import { useContext, useState } from "react"
import AuthContext from "../../context/AuthContext"
import { Button, Col } from "react-bootstrap"
import ReactStars from "react-rating-stars-component"

export default function SingleComment({comment, fetchComments}){
    const token = localStorage.getItem('token')
    const { userData } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () =>{
        if(!window.confirm('Sei sicuro di voler eliminare il commento?')){
            return
        }

        const response = await fetch(`REACT_APP_BACKEND_ENDPOINT/api/beers/${id}/comments/${comment._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        setIsLoading(true)
        if(response.ok){
            fetchComments()
            alert("Commento eliminato!")
            setIsLoading(false)
        } else {
            console.error("Errore durante l'eliminazione del commento")
            setIsLoading(false)
        }
    }

    return(
        <>
            <Col>
                <p>{comment.author.name} {comment.author.surname}</p>
                <div>
                    <ReactStars
                        count={5}
                        edit={false}
                        value={comment.rate}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
                <p>{comment.comment}</p>
            </Col>
            {comment.author._id === userData._id && <>
            <Button variant="danger" type="button" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Eliminazione...' : 'X'}
            </Button>
            <ManageComment singleComment={comment} fetchComments={fetchComments} /></>
            }
        </>
    )
}