const express = require("express");
const bodyParser = require('body-parser');
const scraper = require('google-search-scraper');

const fs = require('fs');
const util = require('util');

var app = express();

app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

app.post('/search', function(req,res){
    let inputContent = req.body.textField;
    var options = {
        query: inputContent,
        host: 'www.google.com',
        lang: 'zh',
        age: 'd1',
        limit: 5,
        params: {} // params will be copied as-is in the search URL query string
      };
    scraper.search(options, function(err, url) {
        // This is called for each result
        //if(err) throw err;
        console.log(url)
    });
    res.redirect('/');
});


var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
  // Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
//console.error = console.log;

app.listen(3000);

//console.log("Running at Port 3000");