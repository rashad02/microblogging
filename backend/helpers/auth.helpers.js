const jwt = require('jsonwebtoken');

const checkAuth = async token => {
    return new Promise((resolve, reject) => {
           let decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

           if(decoded) resolve(decoded.userId);
    });
}

const getJWTToken = async userId => {
    try{
        if(!userId) {
            return null;
        }

        let token = "";
        let generateToken = new Promise((resolve, reject) => 
            resolve(jwt.sign({userId}, process.env.TOKEN_SECRET_KEY, {expiresIn: 50000})),
          );
          return generateToken.then(function(token){
            if(token) {
                this.token = token;
                return token;
            }
        });
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    checkAuth,
    getJWTToken
};