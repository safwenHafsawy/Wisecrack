const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const User = Schema({   
    firstName : {type : String, require: true},
    lastName : {type : String, require : true},
    email : {type : String, require : true},
    password : { type : String, require : true}

})

module.exports = model('User', User)