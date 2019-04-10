
const mongoose = require('mongoose'),
    User = mongoose.model('User')
    var bcrypt = require("bcrypt")
    var session = require('express-session')
module.exports = function(app){

    const hashPass = async (pass)=>{
        let hash = await bcrypt.hash(pass,10)
        return hash
    }
    
    const createUser = async (user, pass,cb) =>{
        user.password = await hashPass(pass)
        
        await user.save()
        .then(async (v) => {
            console.log('User created...')
            user = await User.find({email: user.email})
            
        },(error) => {
            console.log('create user had error: ', error)
            user = null
            
        })
        return cb(user)
    }
    
    
    const loginUser = async (user,pass,cb) =>{
        console.log('in loginuser')
        console.log('login requested by: ','email ',user.email,'pass ',pass)
        let success = await bcrypt.compare(pass,user.password)
        return cb(success)
    }
    
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
        }else{
            return user
        }
    })
    await loginUser(user,request.body.password,function(success){
        console.log(success)
        if (success){
            session.email = user.email
            session.login = true
            response.redirect('/success')
        }else{
            response.redirect('/')
        }
        
    }) 
})

app.post('/users', async function (request,response){
    console.log(request.body)
    newUser = User()
    newUser.first_name = request.body.first_name
    newUser.last_name = request.body.last_name
    newUser.email = request.body.email
    newUser.birthday = request.body.birth_day
    if(request.body.password == request.body.conf_password){
        await createUser(newUser,request.body.password, async function(user){
        if(user == null){
            console.log('post error')
            response.redirect('/')
            return
        }else{
            console.log('created', user[0],'now loging in')
            await loginUser(user[0],request.body.password,function(success){
                console.log(success)
                if (success){
                    session.email = user.email
                    session.login = true
                    response.redirect('/success')
                }else{
                    response.redirect('/')
                }
            })
        }
    })
    }else{
        response.redirect('/')
    }
})

}
