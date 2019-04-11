var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/login_reg');


var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true, validate: {
        validator: async function(v){
            docs = await User.find({email: v})
            if(docs.length > 0){
                return false
            }else return true
        },
        message: props => `${props.value} is not valid, please use a valid email`
    }},
    birthday: {type: String, required: true, validate: {
        validator: function(v){
            return /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)([0-9][0-9])$/.test(v);
        },
        message: props => `${props.value} is not a valid birthday, please use MM/DD/YYYY format!`
    }}
}, {timestamps: true})

var User = mongoose.model('User', UserSchema);

module.exports = {
    user: UserSchema


}