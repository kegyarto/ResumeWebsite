const mongoose = require('mongoose'); 
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const project = new mongoose.Schema({
    userID:{type:ObjectId},
    title:{ type: String },
    description:{ type: String }, 
    link:{ type: String },
    image:{type:String}
}); 

module.exports = Project = mongoose.model('project', project);