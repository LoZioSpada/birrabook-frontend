import { Row } from "react-bootstrap"
import SingleComment from './SingleComment'

export default function CommentBeer({comments, fetchComments}){
    if(!Array.isArray(comments)){
        return <h4 className="mt-5">Nessun commento disponibile!</h4>
    }
    return(
        <Row>
            {comments.map(((comment, i) => (
                <SingleComment key={i} comment={comment} fetchComments={fetchComments}/>
            )))}
        </Row>
    )
}