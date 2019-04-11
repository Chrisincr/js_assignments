var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/1955_api');
var PersonSchema = new mongoose.Schema({
    name: {type: String},
}, {timestamps: true})
mongoose.model('Person', PersonSchema);
var Person = mongoose.model('Person');

app.use(bodyParser.json());
const server = app.listen(8000, function(){
    console.log('listening on port 8000');
})

app.get('/', async function(request,response){
    let people = await Person.find({})

    response.json({
        message: 'Success',
        data: people
})

app.get('/new/:name/', async function(request,response){
    person = new Person()
    person.name = request.params.name
    await person.save()
    .then(v =>{
        response.redirect('/')
    })
    .catch(e =>{
        response.json({
            message: 'Error',
            data: e
        })
    })
    
})

})