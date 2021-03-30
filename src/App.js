import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {loggedIn} from './redux/actions/action.js';

import {selectUserLoggedIn} from './redux/selector/user-selector.js'
import useToken from './token.js';
import Newsfeed from './components/newsfeed/news-feed.jsx';
import LandingPage from './components/landing/landing-page.jsx';

import './components/newsfeed/newsfeed.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

const App = ({isLoggedIn, logIn}) => {

  const { token } = useToken();

  useEffect(()=> {
    async function checkLogIn(){
      return new Promise(async (resolve, reject) => {
        await axios({
          method: "GET",
          url: 'http://localhost:4000/auth/',
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            token
          }
          }).then(res => {
            if(res.data.userId) {
                let userId = !!res.data.userId;
                if(userId) {
                resolve(logIn(userId));
              }  
            }
          }).catch(e => {
                reject(e);
          });
        });
      }
    checkLogIn();

    },[logIn,token]);

  return (
      <div  className="theme-layout">
          <BrowserRouter>
            <Switch>
              <Route exact path='/'  render={() => isLoggedIn ? <Newsfeed /> :  <Redirect to="/login" /> }/>
              <Route path='/login'  render={() => isLoggedIn ?  <Redirect to="/" /> : <LandingPage isSignIn={true}/> }/>
              <Route path='/register'  render={() => isLoggedIn ?  <Redirect to="/" /> : <LandingPage isRegister={true}/> }/>
            </Switch>
          </BrowserRouter>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectUserLoggedIn
});

const mapDispatchToProps = dispatch => ({
  logIn: token => dispatch(loggedIn(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);