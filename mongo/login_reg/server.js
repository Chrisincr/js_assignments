// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
var url = require('url');
var bodyParser = require('body-parser')
var bcrypt = require("bcrypt")

var app = express();
var session = require('express-session')
app.set('trust proxy', 1)
app.use(session({
    secret: 'I solemly swear I am upto no good',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/login_reg');

//setup mongodb with mongoose
var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true, validate: {
        validator: async function(v){
            docs = await User.find({email: v})
            if(docs.length > 0){
                return false
            }else return true
        },
        message: props => `${props.value} is not valid, please use a valid email`
    }},
    birthday: {type: String, required: true, validate: {
        validator: function(v){
            return /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)([0-9][0-9])$/.test(v);
        },
        message: props => `${props.value} is not a valid birthday, please use MM/DD/YYYY format!`
    }}
}, {timestamps: true})
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

//SEEDING DB WITH 1 USER IF NEEDED
/* User.find({}, function(err, users){
    if (err){
        console.log("errors: ",err)
    }else{
        if (users.length == 0){
            let example = new User()
            example.first_name = 'Chris'
            example.last_name = 'Thompson'
            example.email = 'chrisincr@gmail.com'
            example.birthday = '10/23/1983'

            let pass = 'asdfasdf'
            
            createUser(example, pass,{})
        }
    }
}) */

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

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended : true}));

const server = app.listen(8000, function() {
    console.log("listening on port 8000");
})

const io = require('socket.io')(server);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

var messages=[]

io.on('connection', function(socket){
    console.log('someone connected')
    

    socket.on('name_submit', function (name){
        console.log('name submitted',name.name)
        console.log('from',name.dojo)
        
        socket.emit('welcome',name)
    })

    
    
})

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