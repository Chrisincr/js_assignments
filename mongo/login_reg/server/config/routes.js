
const mongoose = require('mongoose'),
    User = mongoose.model('User')
    var bcrypt = require("bcrypt")
    var session = require('express-session')
    var register = require('../controllers/register.js')
    var login = require('../controllers/login.js')
module.exports = function(app){
    
app.get('/', function(request,response){
    console.log('in get /')
    response.render ('index')
})


app.get('/success', function(request,response){
    console.log('in get /success')
    if('login' in session){
        if(session.login){
            response.render('home')
        }
    }else{
        response.redirect('/')
    }
})


app.post('/login', async function(request, response){
    console.log('in post login')
    let user = await User.findOne({email: request.body.email},function (err,user){
        
        if(err){
            console.log('find user error: ',err)
            return user
        }else{
            
            return user
        }
    })
    if(user === null){
        response.redirect('/')
    }else{
        await login.login(user,request.body.password,function(success){
            if (success){
                response.redirect('/success')
            }else{
                response.redirect('/')
            }
            
        }) 
    }
    
})

app.post('/users', async function (request,response){
    console.log(request.body)
    register.create(request,response);
})

}
