import React, {useState} from 'react';
import {Link, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import {loggedIn} from '../../redux/actions/action.js';
import useToken from '../../token.js';
import FormInput from '../common-component/form-input.jsx';



const SignIn = ({logIn}) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const { token, setToken } = useToken();

    const handleSubmit = async event => {
        event.preventDefault();

        if(!(password || email)) {
            return false;
        }

        try{
            let userData = {
                password,
                email,
            }
            
//    if(location.state && location.state.from) {
//       this.props.history.push(location.state.from);
//    } else {
//       this.props.history.push('/');
//    }
    
            await axios({
                method: "POST",
                url: 'http://localhost:4000/login/',
                headers: {
                   "Access-Control-Allow-Origin": "*",
                   'Content-Type': 'application/json'
                },  
                data: userData
            }).then(res => {
                if(res.data.token) {
                    
                    let userId = res.data.userId;
                     
                    setToken(res.data.token);  
                    logIn(!!userId);          
                }
            })
    
            
            // if(token) history.push('/');
        
        } catch(e){
            console.log("Error occurred: ", e);
        };
        
    };
    const handleChange = (event, type) => {
        let value = event?.target?.value || "";

        if(type === 'password')  setPassword(value);
        if(type === 'email')  setEmail(value);
    };

    return (
        <div className="log-reg-area sign">
            <h2 className="log-title">Login</h2>
            <>
                <FormInput type={'text'} value={email} onChange= {e =>  handleChange(e, 'email')} label={'Email'}/>
                
                <FormInput type={'password'} value={password} handleChange= {e =>  handleChange(e, 'password')} label={'Password'}/>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" onChange={e => e.target.value} checked="checked"/><i className="check-box"></i>Always Remember Me.
                    </label>
                </div>
                <a href="#" title="" className="forgot-pwd">Forgot Password?</a>
                <div className="submit-btns">
                    <button className="mtr-btn signin" type="button" onClick={e =>  handleSubmit(e)}><span>Login</span></button>
                    <button className="mtr-btn signup" type="button"><span><Link to="/register">Register</Link></span></button>
                </div>
            </>
        </div>
								
    )
}

const mapDispatchToProps = dispatch => ({
    logIn: id => dispatch(loggedIn(id))
});

export default connect(null,mapDispatchToProps)(SignIn);