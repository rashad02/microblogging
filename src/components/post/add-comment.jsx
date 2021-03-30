import React, {useState} from 'react';
import axios from 'axios';
import useToken from '../../token.js';

const AddComment = () => {
    const [comment, setComment] = useState()

    const {token} =  useToken()
    const handleChange = event => {
        let value = event?.target?.value;

        setComment(value);
    }
    const handleSubmit = async event => {
        if(!comment) return false;

        if(event.key === 'Enter'){
            event.preventDefault();
            await axios({
                method: "POST",
                url: 'http://localhost:4000/post/comments',
                headers: {
                   "Access-Control-Allow-Origin": "*",
                   'Content-Type': 'application/json',
                   token
                },
               data: {
                   description: comment,
                   commentedAt: new Date()
               }
            }).then(res => {
                if(res.data.success) {
                    setComment('');
                }
            }).catch(e => {
                console.log("Error occurred: ", e);
            })
        }
    }

    return(
        <>
            <li className="post-comment">
                <div className="comet-avatar">
                    <img src="images/resources/comet-1.jpg" alt="" />
                </div>
                <div className="post-comt-box">
                    <div>
                        <textarea placeholder="Post your comment" value={comment} onKeyPress={e=> handleSubmit(e)} onChange={e => handleChange(e)}></textarea>
                    </div>	
                </div>
            </li>
        </>
    )
}

export default AddComment;