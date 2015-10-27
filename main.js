var randomstring = require('randomstring');
var binaryConverter = require('./binaryConverter.js');
var fs = require('fs');

var wstream = fs.createWriteStream('output.hex');

var sequence = randomstring.generate({
  length: 8 * 1000000,
  charset: 'gtca'
});

var buffer = binaryConverter.toBytes(sequence);

wstream.write(buffer, 0, sequence.length / 4);
wstream.end();

var restoredSequence = binaryConverter.toString(buffer);

if (sequence === restoredSequence) {
  console.log('Sequence validated successfully.');
} else {
  console.log('Sequence failed validation.');
}
