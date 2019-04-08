// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
var url = require('url');
var bodyParser = require('body-parser')

var app = express();

var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/dojo_ninjas');

//setup mongodb with mongoose
var NinjaSchema = new mongoose.Schema({
    name: {type: String},
    dojo: {type: String}
}, {timestamps: true})
mongoose.model('Ninja', NinjaSchema);
var Ninja = mongoose.model('Ninja');
Ninja.find({}, function(err, ninjas){
    if (err){
        console.log("errors: ",err)
    }else{
        if (ninjas.length == 0){
            let example = new Ninja()
            example.name = 'Chris'
            example.dojo = 'Dallas'
            example.save(function(err){
                if(err){
                    console.log('example had error: ', err)
                }else{
                    console.log('example saved...')
                    Ninja.find({}, function(err, exampleNinja){
                        console.log("example ninja: ",exampleNinja)
                    })
                }
                
            })
        }
        console.log('ninjas: ',ninjas)
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





app.post('/ninjas', function(request, response){
    console.log('request: ',request)
    let ninja = new Ninja()
    ninja.name = request.body.name
    ninja.dojo = request.body.dojo
    ninja.save(function (err){
        if(err){
            response.redirect('/')
            console.log('Error submiting ninja:', err)
        }else{
            console.log('ninja submission saved')
            response.redirect('/ninjas')
        }
    })
    
})
app.post('/ninjas/:id', function(request, response){
    console.log('request: ',request)
    Ninja().find({_id: request.param.id},function(err, ninja){
        if(err){
            console.log('error updating ninja: ', err)
        }else{
            ninja.name = request.body.name
            ninja.dojo = request.body.dojo
            ninja.save(function (err){
                if(err){
                    console.log('Error saving updates to ninja: ',err)
                }else{
                    console.log('ninja updated')
                    response.redirect(`/ninjas/${request.param.id}`)
                }
            })
        }
    })    
})

app.get('/', function(request,response){
    Ninja.find({},function(err, ninjas){
        if(err){
            console.log('error loading ninjas: ', err)
            response.redirect('/')
        }else{
            
            response.render('index', {'ninjas': ninjas})
        }
    })
    
})



