const express = require('express');
const ObjectID = require('bson').ObjectID;
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const {getJWTToken, checkAuth} = require('../helpers/auth.helpers.js');

const homeRouter = express.Router();

homeRouter.get('/auth', async (req, res) => {
    try{
        const {token} =  req.headers;
        const userId = await checkAuth(token);

        if(userId) {
            res.status(200).json({
                success: true,
                userId
              });
        } else {
            res.status(404).json({
                success: false,
                message: "Invalid token!!",
              });
        }
    } catch(e){
        res.status(400).json({
            success: false,
            message: e,
          });
    }
});

homeRouter.post('/login', (req, res) => {
    try{
        let {email, password} = req.body;

        User.findOne({email: email}, (error, user) => {
            if (error) {
                res.status(401).json({
                    success: false,
                    message: error.message,
                  });
            } else {
                if (user) {
                    let passMatch = bcrypt.compare(password, user.password);

                    passMatch.then(matchPassword => {
                        if(matchPassword) {
                            let token = new Promise ((resolve, reject) => {
                                resolve(getJWTToken(user._id))
                            });

                            token.then(result => {
                                res.cookie('token', result, { httpOnly: true })
                                res.status(200).json({
                                    success: true,
                                    userId:user._id,
                                    token: result
                                });
                            });
                        } else {
                            res.status(400).json({
                                success: false,
                                message:"User email or password don't match!",
                            });
                        }
                    });
                } else {
                   res.status(404).json({
                        success: false,
                        message: "User not registered yet",
                    });
              }
            }
          });
    } catch(e) {
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
        });
    }
    
});

homeRouter.post('/register', (req,res) => {
    try{
        const id  = new ObjectID().toString();
        let {email, password, name, userName, gender} = req.body,
            cryptPass = bcrypt.hash(password, 10);

        cryptPass.then(matchPassword => { 
            if(matchPassword) {
                let userData = {
                    _id: id,
                    email,
                    password: matchPassword,
                    name,
                    userName,
                    gender 
                }
    
                User.insertMany(userData, (error, user) => {
                    if (error) {
                        res.status(401).json({
                            success: false,
                            message: error.message,
                          });
                    } else {
                        if (user) {
                            let token = new Promise ((resolve, reject) => {
                                resolve(getJWTToken(id))
                            });
        
                            token.then(result => {
                                res.cookie('token', result, { httpOnly: true })
                                res.status(200).send({
                                    success: true,
                                    userId:user._id,
                                    token: result
                                });
                            });
                        }  else {
                            res.status(404).json({
                                success: false,
                                message: "User not registered yet",
                            });
                        }
                    }
                  });
            } 
        })       
    } catch(e) {
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
        });
    }
});

module.exports = homeRouter;