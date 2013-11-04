var mongoose = require('mongoose');
var config = require('./config.js');

mongoose.connect(config.development.dbURL);

var userSchema = new mongoose.Schema({
	fbId:String,
	name:String,
	email: {type:String,lowercase:true}
});

module.exports = mongoose.model('User',userSchema);