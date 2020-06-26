var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let noteSchema = Schema({
    title : {type : String, require : true},
    description : {type : String, require : true},
    user : {type : Schema.Types.ObjectId, ref: 'User'}
});



module.exports = mongoose.model('Note', noteSchema);