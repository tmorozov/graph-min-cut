exports.randContract = randContract;

function randContractOne(graph) {
  var gI = graph.index;
  var gD = graph.data;

  gI.length = 2;
}

function calcCut(graph) {
  var gI = graph.index;
  var gD = graph.data;

  if (gI.length !== 2) {
    return -1; 
  }
  if (gD[gI[0]].length !== gD[gI[1]].length) {
    return -2;
  }
  return gD[gI[0]].length;
}

function initIndex(length) {
  var index = [];
  for(var i=0; i<length; i++) {
    index.push(i);
  }
  return index;
}

function randContract(graphData) {
  var index = initIndex(graphData.length);
  var graph = {
    index: index,
    data: graphData
  };

  console.log('graph index', graph.index);

  while(graph.index.length > 2) {
    randContractOne(graph);
  }

  var res = calcCut(graph);
  return res;
}

