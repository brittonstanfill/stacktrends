var Sequelize = require('sequelize');
var express = require('express');
var request = require('request');

// var https = require('https');
// var http = require("http");  // I am now using request to handle these instead.


var app = express();

// var clientApi = require('my_modules/clientApi');
// var serverApi = require('my_modules/serverApi');



var port = 3000;

var dbName = 'frametest';
var dbUser = 'root';
var dbPassword = null;

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	 host:'localhost',
	 dialect:'mysql'
});  //creating an instance of the sequelize object.

var Framework = sequelize.define('Framework', {
	name: Sequelize.STRING,
	forks_count: Sequelize.INTEGER
},
{
	freezeTableName:true
});




app.use(express.bodyParser());


app.get('/latest', function(req, res){

	request("https://api.github.com/search/repositories?q=forks:>=5000", function(error, response, body) {
		var apiResponse = JSON.parse(body);
		console.log(apiResponse.total_count);


		for (var i=0; i<apiResponse['items'].length; i++){
		    var bit = apiResponse['items'][i];
		    Framework.create({
		    	name: bit['name'],
		    	forks_count:bit['forks_count']
		    });
		};

sequelize.sync();

	});
});

app.get('/api-forks',function(request,response){
	Framework.all().success(function(frameworks) {
		response.send(frameworks);
	});

});


app.listen(port);
console.log('Server running at ' + port);

