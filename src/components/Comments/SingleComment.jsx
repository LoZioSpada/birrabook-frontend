import { useContext, useState } from "react"
import AuthContext from "../../context/AuthContext"
import { Button, Col } from "react-bootstrap"
import ReactStars from "react-stars"
import ManageComment from './ManageComment'

export default function SingleComment({comment, fetchComments, beerId }){
    const token = localStorage.getItem('token')
    const { userData } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () =>{
        if(!window.confirm('Sei sicuro di voler eliminare il commento?')){
            return
        }

        const response = await fetch(`http://localhost:3050/api/beers/${beerId}/comments/${comment._id}`, {
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