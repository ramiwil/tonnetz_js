let startingNote = 'C';
let cx;
let cy;
let root;
var net;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Set up note map
  note_setup(startingNote);
  // console.log(notes_flat);

  // Set up root node
  cx = windowWidth/2;
  cy = windowHeight/2;
  root = new Pitch(startingNote, cx, cy,  [255, 255, 255]);
  // root = 'C'

  // Initialize graph with the root node
  net = new Graph();
  net.addVertex(root);

  // Generate net
  generateNet(net, root, 1);

  // net.addVertex('C');
  // adjGraph(net, root, 2);


  net.printGraph();
  
}

function draw() {
  

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

