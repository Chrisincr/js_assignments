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