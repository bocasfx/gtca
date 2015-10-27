
var genomes = {
  g: 0x00,
  a: 0x01,
  t: 0x02,
  c: 0x03
};

function toBytes(sequence) {

  // Stores four letters per byte.
  var buffer = new Buffer(sequence.length / 4);
  
  var offset = 0;

  for (var i=0; i<sequence.length; i+=4) {

    var b0 = genomes[sequence[i]]   << 6;
    var b1 = genomes[sequence[i+1]] << 4;
    var b2 = genomes[sequence[i+2]] << 2;
    var b3 = genomes[sequence[i+3]];

    var quad = b0 | b1 | b2 | b3;

    buffer.writeUInt8(quad, offset, 1);
    offset++;
  }

  return buffer;
}

function toString(buffer) {
  var sequence = '';
  for (var i=0; i<buffer.length; i++) {
    var value = buffer.readUInt8(i);
    sequence += restoreSubsequence(value);
  }
  return sequence;
}

function restoreSubsequence(value) {
  var subsequence = '';

  var values = [
    (value & 0xC0) >> 6,
    (value & 0x30) >> 4,
    (value & 0x0C) >> 2,
    value & 0x03
  ];

  values.forEach(function(item) {
    switch (item) {
      case 0:
        subsequence += 'g';
        break;
      case 1: 
        subsequence += 'a';
        break;
      case 2: 
        subsequence += 't';
        break;
      case 3: 
        subsequence += 'c';
        break;
    }
  });

  return subsequence;
}

module.exports = {
  toString: toString,
  toBytes: toBytes
};
