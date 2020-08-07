var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId


var schema = new Schema({
    userID:{type:ObjectId},
    file:{type:String}
})

module.exports = mongoose.model('Resume',schema);