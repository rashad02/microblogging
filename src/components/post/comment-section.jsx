import React,{useState, useEffect} from 'react';
import axios from 'axios';
import AddComment from './add-comment.jsx';
import useToken from '../../token.js';


const CommentSection = ({postId, commentIds}) => {
    const [comments, setComments] = useState([]);

    const {token} = useToken();

    useEffect(async () => {
        await axios({
            method: "GET",
            url: 'http://localhost:4000/post/comments',
            headers: {
               "Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json',
               token
            },
            query:{
                commentIds
            }
        }).then(res => {
            if(res.data.comments) {
                let comments = res.data.comments;
                
                setComments(comments);
            }
        }).catch(e => {
            console.log("Error occurred: ", e);
        })
    }, [setComments, commentIds, token])

    return (
        <>
           
                <div className="coment-area">
                <ul className="we-comet">
                {comments.length ? comments.map((comment, index) => {
                    <li key={index}>
                        <div className="comet-avatar">
                            <img src="images/resources/comet-1.jpg" alt="" />
                        </div>
                        <div className="we-comment">
                            <div className="coment-head">
                                <h5><a href="#"href="time-line.html" title="">Jason borne</a></h5>
                                <span>1 year ago</span>
                                <a href="#"className="we-reply" title="Reply"><i className="fa fa-reply"></i></a>
                            </div>
                            <p>{comment.description}</p>
                        </div>
                        <ul>
                            <li>
                                <div className="comet-avatar">
                                    <img src="images/resources/comet-2.jpg" alt="" />
                                </div>
                                <div className="we-comment">
                                    <div className="coment-head">
                                        <h5><a href="#"href="time-line.html" title="">alexendra dadrio</a></h5>
                                        <span>1 month ago</span>
                                        <a href="#"className="we-reply" title="Reply"><i className="fa fa-reply"></i></a>
                                    </div>
                                    <p>yes, really very awesome car i see the features of this car in the official website of<a href="#" title="">#Mercedes-Benz</a> and really impressed :-)</p>
                                </div>
                            </li>
                            
                        </ul>
                    </li>
                    }) : null} 
                    <li>
                        <a href="#" title="" className="showmore underline">more comments</a>
                    </li> 
                    <AddComment />
                </ul>
            </div>
                
            
        </> 
    )
}

export default CommentSection;