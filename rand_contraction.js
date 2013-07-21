exports.randContract = randContract;

function rand(max) {
  return ~~(Math.random()*max);
}

function showGraph(graph) {
  console.log('index', graph.index);
  graph.index.forEach(function(i) {
    console.log(i, graph.data[i]);
  });
}

function randContractOne(graph) {
  var gI = graph.index;
  var gD = graph.data;
  // select random node 1
  var randI = rand(gI.length);
  var node1i= gI[randI];
  // select rundom node 2 (correct 0-based array)
  var node2i = gD[node1i][rand(gD[node1i].length)] - 1;

  //add all from node1 to node 2
  gD[node2i] = gD[node2i].concat(gD[node1i]);

  //for all connected to node1 replace with node2
  gD[node1i].forEach(function (nodeI) {
    gD[nodeI-1].forEach(function (item, i, arr) {
      if (item === node1i+1) {
        arr[i] = node2i+1;
      }
    });
  });

  //remove loops in node2
  var cleared = gD[node2i].filter(function(i) {
    return i !== node2i+1;
  });
  gD[node2i] = cleared;

  // remove from index
  gI.splice(randI, 1);
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

  //showGraph(graph);

  while(graph.index.length > 2) {
    randContractOne(graph);
    //showGraph(graph);
  }

  var res = calcCut(graph);
  return res;
}

