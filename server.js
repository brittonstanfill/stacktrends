var Sequelize = require('sequelize');
var express = require('express');
var request = require('request');

// var https = require('https');
// var http = require("http");


var app = express();

var clientApi = require('my_modules/clientApi');
var serverApi = require('my_modules/serverApi');



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
	fork_count: Sequelize.INTEGER,
	references: Sequelize.INTEGER
},
{
	freezeTableName:true
});

Framework.create({
	name:'test',
	fork_count:1021,
	references:12412
});

sequelize.sync();

//  serverApi 
app.use(express.bodyParser());

app.get('/', function(req, res){

	request("https://api.github.com/search/repositories?q=forks:>=5000", function(error, response, body) {
	  var apiResponse = body;
	  console.log("Got response: " + body);
	  // var apiResponse = res;
	  // console.log(res);




		// var output = '';

		// for (var i=0; i<apiResponse['items'].length; i++){
		//     var bit = apiResponse['items'][i];
		//     output += '[name: "' + bit['name'] +
		//         '", updated: "' + bit['updated_at'] +
		//         '", fork: "' + bit['forks_count'] +
		//         ']\n';
		// };
		// alert(output);




		}).on('error', function(e) {
	  	console.log("Got error: " + e.messag);
	});

    res.send('completed get request');
    console.log('we hitting get');
});









clientApi();
serverApi();

app.listen(port);
console.log('Server running at ' + port);

