import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {loggedIn} from '../../redux/actions/action.js';

import {Redirect, Link} from 'react-router-dom';
import FormInput from '../common-component/form-input.jsx';
import useToken from '../../token.js';

const Register = ({logIn}) => {

    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const { token, setToken } = useToken();

    const handleSubmit = async event => {
        if(!(password || email || userName)) {
            return false;
        }

        let userData = {
            userName,
            name,
            password,
            email,
            gender
        }

        await axios({
            method: "POST",
            url: 'http://localhost:4000/register/',
            headers: {
               "Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json'
            },  
            data: userData
        }).then(res => {
            if(res.data.token) {
                let userId = res.data.userId;

                setToken(res.data.token);

                logIn(userId)
            }
        }).catch(e => {
            console.log("Error occurred: ", e);
        })
    };
    const handleChange = (event, type) => {
        let value = event?.target?.value || "";

        if(type === 'name')  setName(value);
        if(type === 'userName')  setUserName(value);
        if(type === 'password')  setPassword(value);
        if(type === 'email')  setEmail(value);
        if(type === 'gender')  setGender(value);

    };

    return (
        <div className="log-reg-area reg">
            <h2 className="log-title">Register</h2>
            <>
                <FormInput type={'text'} value={name} handleChange= {e => handleChange(e, 'name')} label={'First & Last Name'}/>

                <FormInput type={'text'} value={userName} handleChange= {e => handleChange(e, 'userName')} label={'User Name'}/>

                <FormInput type={'text'} value={email} onChange= {e =>  handleChange(e, 'email')} label={'Email'}/>
               
                <FormInput type={'password'} value={password} handleChange= {e =>  handleChange(e, 'password')} label={'Password'}/>
               
                <div className="form-radio">
                    <div className="radio">
                        <label>
                        <input type="radio" value="male" name="radio" onClick = {e =>  handleChange(e, 'gender')}/><i className="check-box"></i>Male
                        </label>
                    </div>

                    <div className="radio">
                        <label>
                            <input type="radio" value="female" onClick = {e =>  handleChange(e, 'gender')} name="radio"/><i className="check-box"></i>Female
                        </label>
                    </div>
                </div>
        
                <div className="checkbox">
                <label>
                    <input type="checkbox" onChange={e => e.target.value} checked="checked"/><i className="check-box"></i>Accept Terms & Conditions ?
                </label>
                </div>
                <Link to="/login" className="already-have">Already have an account</Link>
                <div className="submit-btns">
                    <button className="mtr-btn signup" onClick = {e => handleSubmit() }type="button"><span>Register</span></button>
                </div>
            </>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    logIn: id => dispatch(loggedIn(id))
});

export default connect(null, mapDispatchToProps)(Register);