var fs = require('fs');

function notEmpty(str) {
  return !!str.length;
}

function toI(item) {
  // use of ~~ to convert to int
  return ~~item;
}

exports.loadGraph = function (fileName) {
  var data = fs.readFileSync(fileName).toString();
  return data.split("\n")
    .filter(notEmpty)
    .map(function(row) {
      var nodeArr = row.split(/\s+/)
        .filter(notEmpty)
        .map(toI);
      nodeArr.shift();
      return nodeArr;
    });
}

exports.assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

