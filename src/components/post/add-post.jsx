import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectLoggedInUser} from '../../redux/selector/user-selector.js';

import useToken from '../../token.js'
const Addpost = ({userId}) => {

    const {token} = useToken();

    const [description, setDescription] = useState();
    const [type, setType] = useState();
    const [files, setFiles] = useState([]);
    const [posterId, setPosterId] = useState();

    const handleSubmit = async event => {
        let postData = {
            type,
            description,
            files,
            posterId: userId,
            postedAt: new Date() 
        };

        await axios({
            method: "POST",
            url: 'http://localhost:4000/post/',
            headers: {
               "Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json', 
               'token': token
            },  
            data: postData
        }).then(res => {
            if(res.data) {
            
            }
        }).catch(e => {
            console.log("Error occurred: ", e);
        })
    }

    const handleChange = (event, type) => {
        let value = event?.target?.value || "";

        setDescription(value);

    };

    return (
        <div className="central-meta">
            <div className="new-postbox">
                <figure>
                    <img src="images/resources/admin2.jpg" alt="" />
                </figure>
                <div className="newpst-input">
                    <>
                        <textarea rows="2" onChange={e => handleChange(e)} placeholder="write something"></textarea>
                        <div className="attachments">
                            <ul>
                                <li>
                                    <i className="fa fa-music"></i>
                                    <label className="fileContainer">
                                        <input type="file" />
                                    </label>
                                </li>
                                <li>
                                    <i className="fa fa-image"></i>
                                    <label className="fileContainer">
                                        <input type="file" />
                                    </label>
                                </li>
                                <li>
                                    <i className="fa fa-video-camera"></i>
                                    <label className="fileContainer">
                                        <input type="file" />
                                    </label>
                                </li>
                                <li>
                                    <i className="fa fa-camera"></i>
                                    <label className="fileContainer">
                                        <input type="file" />
                                    </label>
                                </li>
                                <li>
                                    <button type="submit" onClick={e=> handleSubmit(e)}>Post</button>
                                </li>
                            </ul>
                        </div>
                    </>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    userId: selectLoggedInUser
});

export default connect(mapStateToProps, null)(Addpost);