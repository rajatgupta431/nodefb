var mongo = require('mongoose').connect('mongodb://rajatgupta431:1271994127@widmore.mongohq.com:10010/fbapp') ;
var Schema = mongo.Schema;
var tokenSchema = new Schema({
	token: String,
	name: String,
	full_name : String,
	group: String,
	date :{type: Date,default : Date.now}
});

module.exports ={
	
	token : mongo.model('token',tokenSchema),
	
	
	}

 
