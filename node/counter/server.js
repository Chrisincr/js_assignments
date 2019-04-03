// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
var session = require('express-session');
var app = express();



app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 
app.get('/', function(request, response) {
    if ('counter' in request.session){
  request.session.counter++
}else{
  request.session.counter = 1
} console.log(request.session.counter)
    response.render('index',{counter: request.session.counter});
 })
app.get('/cars', function(request, response) {
    
    response.render("cars");
 })

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})