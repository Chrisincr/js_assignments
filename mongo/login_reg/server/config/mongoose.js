var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/login_reg');


models = require('../models/users.js')
mongoose.model('User', models.user);