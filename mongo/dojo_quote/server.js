// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
var url = require('url');
var bodyParser = require('body-parser')

var app = express();

var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/dojo_quotes');

//setup mongodb with mongoose
var QuoteSchema = new mongoose.Schema({
    name: {type: String},
    quote: {type: String}
}, {timestamps: true})
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');
Quote.find({}, function(err, quotes){
    if (err){
        console.log("errors: ",err)
    }else{
        if (quotes.length == 0){
            let example = new Quote()
            example.name = 'bob'
            example.quote = 'Go boldly into the night'
            example.save(function(err){
                if(err){
                    console.log('example had error: ', err)
                }else{
                    console.log('example saved...')
                    Quote.find({}, function(err, examplequote){
                        console.log("example quote: ",examplequote)
                    })
                }
                
            })
        }
        console.log('quotes: ',quotes)
    }
})


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



app.get('/', function(request, response) {
    
    response.render('index');
})

app.post('/quote', function(request, response){
    console.log('request: ',request)
    let quote = new Quote()
    quote.name = request.body.name
    quote.quote = request.body.quote
    quote.save(function (err){
        if(err){
            response.redirect('/')
            console.log('Error submiting quote:', err)
        }else{
            console.log('quote submission saved')
            response.redirect('/quotes')
        }
    })
    
})

app.get('/quotes', function(request,response){
    Quote.find({},function(err, quotes){
        if(err){
            console.log('error loading quotes: ', err)
            response.redirect('/')
        }else{
            console.log(quotes)
            response.render('quotes', {'quotes': quotes})
        }
    })
    
})



