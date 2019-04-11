// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
var url = require('url');
var bodyParser = require('body-parser')

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



app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended : true}));

const server = app.listen(8000, function() {
    console.log("listening on port 8000");
})

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

var messages=[]
/* const io = require('socket.io')(server);
io.on('connection', function(socket){
    console.log('someone connected')
    socket.on('name_submit', function (name){
        console.log('name submitted',name.name)
        console.log('from',name.dojo)
        socket.emit('welcome',name)
    })
}) */
require('./server/config/routes.js')(app)