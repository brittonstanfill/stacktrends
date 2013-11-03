var Sequelize = require('sequelize');
var express = require('express');
var app = express();

var person =	{
				"name":"Britton Stanfill",
				"location":"Provo, UT",
				"hobbies": [
							'soccer', 'design', 'coding'],
				"occupations": [
								"Frontend Developer and Designer", 
								"Lead UX Designer",
								"Multimedia Intern", 
								"Designer and Webmaster", 
								"Lead Videographer",
								"QA Tester", 
								"Associate Producer and Designer" 
								],
				"mentions": [	],
				"friends":[],
				"skills": [
				{
					"id":4,
					"name": 'JavaScript',
					"experience": 'Intermediate'
				}
				]

				};


var app = express();
var port = 3000;

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

