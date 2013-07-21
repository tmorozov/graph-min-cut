#!/usr/bin/env node

var program = require('commander');
var fgraph = require('./load_graph');
var INPUT_FILE_DEFAULT = "./samples/kargerMinCut.txt";

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
  console.log('before', graph);
} else {
//  exports.checkHtmlFile = countInversions;
}
