var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
    username: String,
    password: String,
    sessionID: String
})

module.exports = mongoose.model('User',schema);


