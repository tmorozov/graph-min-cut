#!/usr/bin/env node

var program = require('commander');
var fgraph = require('./load_graph');
var rcon = require('./rand_contraction');
var clone = require('clone');

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
  var graphCopy = clone(graph);
//  console.log('before', graph);
  var min_res = rcon.randContract(graphCopy);
  console.log('min result', min_res);
  var res;
  for(var i=0; i<graph.length; i++) {
    graphCopy = clone(graph);
    var res = rcon.randContract(graphCopy);
    if (res < min_res) {
      min_res = res;
      console.log('min result', min_res);
    }
    if ( (i % (graph.length/100)) === 0 ) {
      console.log(i*100/graph.length);
    }
  }

} else {
//  exports.checkHtmlFile = countInversions;
}
