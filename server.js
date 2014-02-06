var Sequelize = require('sequelize');
var express = require('express');
var request = require('request');

var app = express();

app.use(express.bodyParser());
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(__dirname + '/public'));

var port = 3000;

var dbName = 'frametest';
var dbUser = 'root';
var dbPassword = null;

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host:'localhost',
  dialect:'mysql',
  omitNull: true
});

var Framework = sequelize.define('Framework', {
  name: Sequelize.STRING,
  forks_count: Sequelize.INTEGER,
  language: Sequelize.STRING,
  watchers: Sequelize.INTEGER,
  homepage: Sequelize.STRING
},
{
  freezeTableName:true
});

app.get('/latest', function(req, res){
  request("https://api.github.com/search/repositories?q=forks:>=5000", function(error, response, body) {
  var apiResponse = JSON.parse(body);

  for (var i=0; i < apiResponse['items'].length; i++){
    var bit = apiResponse['items'][i];
    Framework.create({
      name: bit['name'],
      forks_count:bit['forks_count'],
      language:bit['language'],
      watchers:bit['watchers'],
      homepage:bit['homepage']
    });
  };

sequelize.sync();

  });
});

app.get('/api-forks',function(request,response){
  sequelize.query("SELECT name, language, watchers, homepage, min(forks_count),max(forks_count) FROM `Framework` GROUP BY name ORDER BY max(forks_count) DESC").success(function(frameworks) {
    response.send(frameworks);
  });
});

var LanguageGraph = sequelize.define('LanguageGraph', {
  label: Sequelize.STRING,
  value: Sequelize.INTEGER
},
{
  freezeTableName:true
});


app.get('/allLanguagesGraph', function(req, res){

  request("https://api.github.com/search/repositories?q=language:javascript", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'Javascript',
      value:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:php", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'PHP',
      value:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:ruby", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'Ruby',
      value:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:python", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'Python',
      value:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:java", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'Java',
      value:bit['total_count']
    });
  });

  sequelize.sync();

});

app.get('/languagesBar',function(request,response){
  sequelize.query("SELECT DISTINCT label, value FROM LanguageGraph GROUP BY label ORDER BY value DESC;").success(function(languages) {
    response.send(languages);
  });
});



//////////////////////////////////////////////////////
app.get('/githubMoreLanguages', function(req, res){

  request("https://api.github.com/search/repositories?q=language:Objective-C", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'Objective-C',
      value:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:C", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'C',
      value:bit['total_count']
    });
  });

  request("https://api.github.com/search/repositories?q=language:rust", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'Rust',
      value:bit['total_count']
    });
  });

    request("https://api.github.com/search/repositories?q=language:dart", function(error, response, body) {
    var apiResponse = JSON.parse(body);
    var bit = apiResponse;
    LanguageGraph.create({
      label: 'Dart',
      value:bit['total_count']
    });
  });

  sequelize.sync();

});

app.get('/languagesBar',function(request,response){
  sequelize.query("SELECT DISTINCT label, value FROM LanguageGraph GROUP BY label ORDER BY value DESC;").success(function(languages) {
    response.send(languages);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////





// Zen //

var ZenTable = sequelize.define('ZenTable', {
  zenSaying: Sequelize.STRING,
},
{
  freezeTableName:true
});

app.get('/Zen', function(req, res){
  request("https://api.github.com/zen", function(error, response, body) {
    var apiResponse = (body);
    ZenTable.create({
      zenSaying: apiResponse
    });
  });

  sequelize.sync();
});

app.get('/Zenspire',function(request,response){
  sequelize.query("SELECT zenSaying FROM ZenTable ORDER BY RAND() LIMIT 1;").success(function(wordsOfWisdom) {
    response.send(wordsOfWisdom);
  });
});


app.listen(port);
console.log('Server running at ' + port);
