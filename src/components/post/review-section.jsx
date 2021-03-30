import React from 'react';

const ReviewSection = () => {
    return (
        <div className="we-video-info">
            <ul>
                <li>
                    <span className="like" data-toggle="tooltip" title="like">
                        <i className="fa fa-heart"></i>
                        <ins>2.2k</ins>
                    </span>
                </li>
                <li>
                    <span className="comment" data-toggle="tooltip" title="Comments">
                        <i className="fa fa-comments-o"></i>
                        <ins>52</ins>
                    </span>
                </li>
                <li>
                    <span className="share" data-toggle="tooltip" title="share">
                        <i className="fa fa-share"></i>
                        <ins>200</ins>
                    </span>
                </li>
            </ul>
        </div>
    )
}
export default ReviewSection