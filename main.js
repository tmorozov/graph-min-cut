#!/usr/bin/env node

var program = require('commander');
var fgraph = require('./load_graph');
var rcon = require('./rand_contraction');
//var INPUT_FILE_DEFAULT = "./samples/kargerMinCut.txt";
var INPUT_FILE_DEFAULT = "./samples/test2.txt";

function clone(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
  program
    .option('-f, --file <file>', 'Path to file with data', clone(fgraph.assertFileExists), INPUT_FILE_DEFAULT)
    .parse(process.argv);

  var graph = fgraph.loadGraph(program.file);
//  console.log('before', graph);
  var res = rcon.randContract(graph);
  console.log('result', res);
} else {
//  exports.checkHtmlFile = countInversions;
}
