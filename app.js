/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var path = require('path');
var router = require('./routes')
var multer = require('multer');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, 'public')));
global.__base = __dirname;


// app.post('/test', function(req, res){
//   console.log('test called.')
//   res.json('test');
// });

router(app);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

console.log(appEnv);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
