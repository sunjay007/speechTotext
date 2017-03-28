var speeckToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new speeckToTextV1({
  username : 'fa7f247b-d400-4954-978c-69252d39c5d7',
  password : 'RpamuTaOnDzm'
});




function speechToText(file, res){
  var params = {
    content_type: 'audio/wav'
  };

  //create recognize stream
  var recognizeStream = speech_to_text.createRecognizeStream(params);

  //pipe in the audio from resources folder
  fs.createReadStream(file).pipe(recognizeStream);

  var output_filename = __base + '/resources/transcription' + Date.now() + '.txt';

  //pipe out to the transcription.txt
  recognizeStream.pipe(fs.createWriteStream(output_filename));

  //to get the strings instead of Buffers from data events
  recognizeStream.setEncoding('utf8');

  var i = 0;

  // ['data', 'results', 'speaker_labels', 'error', 'close'].forEach(function(eventName){
  //   //recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
  // });

  recognizeStream.on('data', function(result){
    console.log(new Date().toUTCString() + ' - writing result...' + result);
    res.json(result);
  });

}

module.exports.speechToText = speechToText;
