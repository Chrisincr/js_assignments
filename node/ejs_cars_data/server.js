// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");

var app = express();
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 
app.get('/', function(request, response) {
    
    response.render('index');
 })
app.get('/cars', function(request, response) {
    
    response.render("cars");
 })

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})