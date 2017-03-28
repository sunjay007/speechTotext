var express = require('express');
var fs = require('fs');
var speech_to_text = require('../speech_to_text_v1');
var router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: 'resources/' });

router.get('/', function(req, res){
  console.log('load speechtotext page');
  res.sendFile('public/speechtotext.html', {root: __base});
});

router.post('/upload', upload.single('audioUpload'), function(req, res, next){

  console.log("req.file is: " + req.file.filename);
  //var originname = __base + '/resources/' + req.file.originalname;
  var filename = __base + '/resources/' + req.file.filename;
  //var newname = __base + '/resources/test.wav';
  var newname = __base + '/resources/' + req.file.originalname;

  console.log('originname: ' + newname);
  console.log('filename: ' + filename);

  var data = fs.readFileSync(filename);

  if(fsExistSync(newname)){
    fs.unlink(newname, function(err){
      if(err){
        console.error(err);
      }
    });
  }

  fs.writeFile(newname, data, function(err){
    if(err){
      console.error(err);
    }
  });

  fs.unlink(filename, function(err){
    if(err){
      console.error(err);
    }
  });

  try{
    console.log(new Date().toUTCString() + ' - Starting speech to text stream...');
    speech_to_text.speechToText(newname, res);

  }catch(e){
    console.error(e);
  }

  console.log('request body: ' + req.file.fieldname);
  //res.json("request responses: " + fs.readFileSync(__base + '/resources/transcription.txt'));
  //res.end();

  next();
});

function fsExistSync(file){
  try{
    fs.accessSync(file);
  }catch(e){
    return false;
  }

  return true;
}

module.exports = router;
