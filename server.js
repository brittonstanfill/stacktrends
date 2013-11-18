var Sequelize = require('sequelize');
var express = require('express');
var request = require('request');

// var https = require('https');
// var http = require("http");  // I am now using request to handle these instead.

var app = express();

app.use(express.bodyParser());
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  });

app.use(express.static(__dirname + '/public'));


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

app.get('/latest', function(request, response){

	request("https://api.github.com/search/repositories?q=forks:>=5000", function(error, response, body) {
		var apiResponse = JSON.parse(body);

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

// app.get('/api-forks',function(request,response){
// 	Framework.findAll ({
// 		where: {name: ['node','jquery','bootstrap']}}).success(function(frameworks) {
// 		response.send(frameworks);
// 	});
// });

app.get('/api-forks',function(request,response){
	sequelize.query("SELECT name, min(forks_count),max(forks_count) FROM `Framework` GROUP BY name ORDER BY max(forks_count) DESC").success(function(frameworks) {
		response.send(frameworks);
      // console.log(frameworks);
	});
});


// Languages 

var Language = sequelize.define('Language', {
  name: Sequelize.STRING,
  total_count: Sequelize.INTEGER
},
{
  freezeTableName:true
});


app.get('/allLanguages', function(req, res){

  request("https://api.github.com/search/repositories?q=language:javascript", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    // console.log(apiResponse.total_count);

    var bit = apiResponse;
    Language.create({
    name: 'Javascript',
    total_count:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:php", function(error, response, body) {
    var apiResponse = JSON.parse(body);

    var bit = apiResponse;
    Language.create({
    name: 'PHP',
    total_count:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:ruby", function(error, response, body) {
    var apiResponse = JSON.parse(body);

    var bit = apiResponse;
    Language.create({
    name: 'Ruby',
    total_count:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:python", function(error, response, body) {
    var apiResponse = JSON.parse(body);

    var bit = apiResponse;
    Language.create({
    name: 'Python',
    total_count:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:java", function(error, response, body) {
    var apiResponse = JSON.parse(body);

    var bit = apiResponse;
    Language.create({
    name: 'Java',
    total_count:bit['total_count']
    });
  });

  sequelize.sync();

});

app.get('/languages',function(request,response){
  sequelize.query("SELECT name, min(total_count),max(total_count) FROM `Language` GROUP BY name ORDER BY max(total_count) DESC").success(function(languages) {
    response.send(languages);
  });
});

// app.get('/languagesBar',function(request,response){
//   sequelize.query("SELECT * FROM Language").success(function(languages) {
//     response.send(languages);
//   });
// });


// Graph

// app.get('/languagesBar',function(request,response){
//   sequelize.query("SELECT * FROM Language").success(function(languages) {
//     response.send(languages);

//   for (var i=0; i<languages.length; i++){
//     var bit = languages[i];
//     label: bit.name,
//     value:bit.total_count
//     console.log(i);
//     });
//   };

// sequelize.sync();

//   });
// });


//



app.listen(port);
console.log('Server running at ' + port);
