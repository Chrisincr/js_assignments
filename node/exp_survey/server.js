// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
var url = require('url');
var bodyParser = require('body-parser')

var app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended : true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 
app.get('/', function(request, response) {
    
    response.render('index');
 })
app.get('/result', function(request, response) {
    console.log(request.query)
    context = {
        'name' : request.query.name,
        'location' : request.query.location,
        'language' : request.query.language,
        'comment' : request.query.comment
    }
    response.render("result",context);
 })
 app.post('/result', function(request, response) {
    console.log(request.body)
    response.redirect(url.format({
        pathname:"/result/",
        query: {
            name: request.body.name,
            location: request.body.location,
            language: request.body.language,
            comment: request.body.comment
        }
    }))
 })

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})