import { Row } from "react-bootstrap"
import SingleComment from './SingleComment'

export default function CommentBeer({comments, fetchComments}){
    return(
        <Row>
            {comments.map(((comment, i) => (
                <SingleComment key={i} comment={comment} fetchComments={fetchComments}/>
            )))}
        </Row>
    )
}