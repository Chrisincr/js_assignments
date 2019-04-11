var bcrypt = require("bcrypt")
var session = require('express-session')

module.exports = {
    login: async function(user,pass,cb){
        
        console.log('in loginuser')
        console.log('login requested by: ','email ',user.email,'pass ',pass)
        let success = await bcrypt.compare(pass,user.password)
        if(success){
            session.email = user.email
            session.login = true
        }
        return cb(success)
        
    }
}