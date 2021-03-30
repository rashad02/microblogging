import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import ReviewSection from './review-section.jsx';
import CommentSection from './comment-section.jsx';
import useToken from '../../token.js';

const Postlist = () => {
    const [posts, setPosts] = useState([]);

    const {token} = useToken();

    useEffect(async () => {
        await axios({
            method: "GET",
            url: 'http://localhost:4000/post/',
            headers: {
               "Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json',
               token
            },
        }).then(res => {
            if(res.data.posts) {
                let posts = res.data.posts;
                
                setPosts(posts);
            }
        }).catch(e => {
            console.log("Error occurred: ", e);
        })
    }, [setPosts])

    return (
        <>
            {posts.length ? posts.map((post, index) =><div key={index} className="central-meta item"> <div className="user-post">
                <div className="friend-info">
                    <figure>
                        <img src="images/resources/friend-avatar10.jpg" alt="" />
                    </figure>
                    <div className="friend-name">
                        <ins><a href="time-line.html" title="">{post?.postUser[0]?.name}</a></ins>
                        <span>Published: {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss A')}</span>
                    </div>
                    <div className="post-meta">
                        <div className="description">     
                            <p>{post.description}</p>
                        </div>
                        <img src="images/resources/user-post.jpg" alt="" />
                        <ReviewSection />
                    </div>
                </div>
                <CommentSection postId={post._id} commentIds={post.commentIds || []}/>
            </div> </div>) : null 
            }
        </>
    )
}

export default Postlist