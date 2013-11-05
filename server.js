var Sequelize = require('sequelize');
var express = require('express');
var app = express();
var port = 3000;

var person = {
	"name":"Britton Stanfill"
};


var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	"host":"localhost"
});  //creating an instance of the sequelize object.



sequelize.sync();


app.configure(function(){
	app.use(express.bodyParser());
	app.use(function(response, request, next){
		response.header('Access-Control-Allow-Origin', '*');
		response.header('Access-Control-Allow-Methods','Options');
		response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});
});

	// GET Requests 

app.listen(port);
console.log('Server running at ' + port);

