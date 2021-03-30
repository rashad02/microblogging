import React from 'react';
import {connect} from 'react-redux';
import {Redirect, useHistory, Link} from 'react-router-dom';

import {loggedOut} from '../../redux/actions/action.js';

import useToken from '../../token.js';
import '../newsfeed/newsfeed.css';

const OptionSidebar = ({logOut}) => {
    const {resetToken} = useToken();
    let history = useHistory();

    
    const handleClick = event => {
        event.preventDefault();
        
        resetToken();

        logOut();
    };

    return (
        <div className="col-lg-3">
            <aside className="sidebar static">
                <div className="widget">
                    <h4 className="widget-title">Options</h4>
                    <ul className="naves">
                        <li>
                            <i className="ti-clipboard"></i>
                            <a href="#" title="">News feed</a>
                        </li>
                        <li>
                            <i className="ti-mouse-alt"></i>
                            <a href="#" title="">Inbox</a>
                        </li>
                        <li>
                            <i className="ti-files"></i>
                            <a href="#" title="">My pages</a>
                        </li>
                        <li>
                            <i className="ti-user"></i>
                            <a href="#" title="">friends</a>
                        </li>
                        <li>
                            <i className="ti-power-off"></i>
                            <button onClick={e =>  handleClick(e)} title="">Logout</button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(loggedOut())
});

export default connect(null, mapDispatchToProps)(OptionSidebar);