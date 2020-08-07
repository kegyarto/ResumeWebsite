const mongoose = require('mongoose'); 
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const greet = new mongoose.Schema({
    userID:{type:ObjectId},
    name:{ type: String },
    title:{type:String},
    description:{ type: String }, 
    skills:{ type: String },
    image:{ type: Object}
});


module.exports = Greet = mongoose.model('greet', greet);