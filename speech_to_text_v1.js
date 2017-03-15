var speeckToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new speeckToTextV1({
  username : 'fa7f247b-d400-4954-978c-69252d39c5d7',
  password : 'RpamuTaOnDzm'
});

var params = {
  content_type: 'audio/wav'
};

//create recognize stream
var recognizeStream = speech_to_text.createRecognizeStream(params);

console.log(recognizeStream);

//pipe in the audio from resources folder
fs.createReadStream(__dirname + '/resources/speech.wav').pipe(recognizeStream);

//pipe out to the transcription.txt
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

//to get the strings instead of Buffers from data events
recognizeStream.setEncoding('utf8');

['data', 'results', 'speaker_labels', 'error', 'close'].forEach(function(eventName){
  recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
});
