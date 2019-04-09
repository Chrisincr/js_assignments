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
            response.redirect('/')
        }
    })
    
})
app.post('/ninjas/:ninja_id', function(request, response){
    console.log('in post ninja id')
    console.log('request: ',request.body)
    Ninja.find({_id: request.params.ninja_id},function(err, ninjas){
        if(err){
            console.log('error finding ninja: ', err)
        }else{
            let ninja = ninjas[0]
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

app.post('/ninjas/destory/:id', function(request, response){
    console.log('in post destroy id')
    console.log('request: ',request)
    Ninja.find({_id: request.params.ninja_id},function(err, ninja){
        if(err){
            console.log('error finding ninja: ', err)
        }else{
            Ninja.remove({_id: request.param.id},function(err){
                if(err){
                    console.log('Error deleting ninja: ',err)
                }else{
                    console.log('ninja deleted')
                    response.redirect(`/`)
                }
            })
        }
    })    
})

app.get('/', function(request,response){
    console.log('in get /')
    Ninja.find({},function(err, ninjas){
        if(err){
            console.log('error loading ninjas: ', err)
            response.redirect('/')
        }else{
            console.log('ninjas are: ',ninjas)
            response.render('index', {'ninjas': ninjas})
        }
    })
    
})

app.get('/ninjas/new', function(request,response){
    console.log('in new ninja')
            response.render('ninja_new')

})

app.get('/ninjas/:ninja_id', function(request,response){
    console.log('in get ninja id')
    Ninja.find({_id: request.params.ninja_id},function(err, ninja){
        if(err){
            console.log('error loading ninja: ', err)
            response.redirect('/')
        }else{
            console.log('Ninja is: ', ninja)
            response.render('ninja', {'ninja': ninja})
        }
    })
})



app.get('/ninjas/edit/:ninja_id', function(request,response){
    console.log('in get ninja edit id')
    Ninja.find({_id: request.params.ninja_id},function(err, ninja){
        if(err){
            console.log('error loading ninja: ', err)
            response.redirect('/')
        }else{
            console.log(ninja)
            response.render('ninja_edit', {'ninja': ninja})
        }
    })
})