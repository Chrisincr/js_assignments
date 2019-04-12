var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/1955_api');
var TaskSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    completed: {type: Boolean}
}, {timestamps: true})
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

app.use(bodyParser.json());
const server = app.listen(8000, function(){
    console.log('listening on port 8000');
})

app.get('/', async function(request,response){
    let task = await Task.find({})

    response.json({
        message: 'Success',
        data: task
})

app.get("/:num", async function(request,response){
    console.log('in get id')
    let task = await Task.findById(request.params.id,function(err,task){
        if(err){
            response.json({
                message: 'Error',
                data: err
            })
        }else{
            response.json({
                message: 'Success',
                data: task
            })
        }
    })
})

app.post('/', async function(request,response){
    task = new Task()
    console.log("request.body:", request.body)
    task.title = request.body.title
    task.description = request.body.description || "";
    task.completed = false;
    await task.save()
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