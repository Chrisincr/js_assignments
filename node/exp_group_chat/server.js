// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
var url = require('url');
var bodyParser = require('body-parser')

var app = express();
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
    socket.emit('set_name')
    console.log('set name emitted')

    socket.on('name_submit', function (name){
        console.log('name submitted',name.name)
        console.log('from',name.dojo)
        
        socket.emit('welcome',name)
    })

    socket.on('message_sent', function(message){
        console.log(message)
        newmessage = `<tr><td>${message.name}:</td><td>${message.message}</td></tr>`
        socket.emit('new_message',newmessage)
        socket.broadcast.emit('new_message',newmessage)
        messages.push(newmessage)
    })
    
})



app.get('/', function(request, response) {
    
    response.render('index');
 })



