const mongoose = require('mongoose'),
    User = mongoose.model('User')
    var bcrypt = require("bcrypt")
    const hashPass = async (pass)=>{
        let hash = await bcrypt.hash(pass,10)
        return hash
    }
    const login = require('../controllers/login.js')
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
    
    
    

module.exports = {
    create: async function(request,response){
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
                await login.login(user[0],request.body.password,function(success){
                    if (success){
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
        }
}