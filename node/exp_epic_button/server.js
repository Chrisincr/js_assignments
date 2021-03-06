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

io.on('connection', function(socket){
    console.log('someone connected')
    socket.emit('set_counter', counter)

    socket.on('epic_pressed', function (){
        console.log('BLUE PRESSED:')
        counter.val ++
        socket.emit('set_counter', counter)
        socket.broadcast.emit('set_counter',counter)
    })
    socket.on('reset_pressed', function (){
        console.log('reset PRESSED:')
        counter.val = 0
        socket.emit('set_counter', counter)
        socket.broadcast.emit('set_counter',counter)
    })
})

var counter = {
    'val': 5
};

app.get('/', function(request, response) {
    
    response.render('index');
 })



