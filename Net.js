let notes_flat = new Map();
let notes_sharp = new Map();

//                           0    1     2    3     4    5    6     7    8     9    10   11
let flat_reference_notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
                            'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
                            'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
                            'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
let flat_all_notes = [];


function note_setup(root) {
    index = 0;
    found = false;
    for (let i = 0; i < 12; i++) {
        if (flat_reference_notes[i] == root) {
            index = i;
            found = true;
            break;
        }
    }

    if (!found) {
        return 0;
    }

    for (let a = 0; a < 24; a++) {
        flat_all_notes.push(flat_reference_notes[index]);
        index++;
    }

    for (let b = 0; b < 12; b++) {
        notes_flat.set(flat_all_notes[b], 
                        [flat_all_notes[b+7],
                         flat_all_notes[b+3],
                         flat_all_notes[b+8],
                         flat_all_notes[b+5],
                         flat_all_notes[b+9],
                         flat_all_notes[b+4],])
    }

    // console.log(notes_flat);

    return 1;
    
}


let angle = Math.PI / 3;
let d = 0;

function coords(cx, cy, i) {
    let x = cx + cos(angle * -i + d) * 20;
    let y = cy + sin(angle * -i + d) * 20;
    let x2 = x + cos(angle * -i + d) * 20;
    let y2 = y + sin(angle * -i + d) * 20;

    stroke(255);
    
    line(x, y, x2, y2);

    x = x2 + cos(angle * -i + d) * 20;
    y = y2 + sin(angle * -i + d) * 20;

    return [x, y];
}

function drawPitch(p) {
    textSize(24);
    fill(p.color[0], p.color[1], p.color[2]);
    textAlign(CENTER, CENTER);
    text(p.pitch, p.x, p.y);
}

all_coords = []

var net;

function generateNetRecur(net, p, cx, cy, depth) {``
    if (depth <= 0) {
        return 1;
    }


    for (let i = 0; i < 6; i++) {
        let new_x = coords(cx, cy, i)[0];
        let new_y = coords(cx, cy, i)[1];

        let child_pitch = new Pitch(notes_flat.get(p.pitch)[i], new_x, new_y);

        net.addVertex(child_pitch);

        net.addEdge(p, child_pitch);

        
        generateNetRecur(net, child_pitch, child_pitch.x, child_pitch.y, depth-1);
    }

}


function generateNet(net, root, depth) {
    generateNetRecur(net, root, root.x, root.y, depth);
}


// function adjGraph(net, root, depth) {
//     if (depth <= 0) {
//         return 1;
//     }

//     for (let i = 0; i < 6; i++) {
//         let child_pitch = notes_flat.get(root)[i]

//         net.addVertex(child_pitch);
//         net.addEdge(root, child_pitch);
//     }

//     for (let i = 0; i < 6; i++) {
//         let child_pitch = notes_flat.get(root)[i]
        
//         if (notes_flat.get(root)[i+1] != undefined) {
//             net.addEdge(child_pitch, notes_flat.get(root)[i+1]);
//         } else {
//             net.addEdge(child_pitch, notes_flat.get(root)[0]);
//         }
//     }
//     for (let i = 0; i < 6; i++) {
//         let child_pitch = notes_flat.get(root)[i]

//         adjGraph(net, root, depth-1);
//     }


    
// }





class Pitch {
    constructor(pitch, x = 0, y = 0, rgb = [255, 255, 255]) {
        this.pitch = pitch;
        this.neighbors = [];
        this.x = x;
        this.y = y;
        this.color = rgb;
    }

    getNeighbors() {
        return this.neighbors;
    }

    addNeighbor(pitch) {
        return this.neighbors.push(pitch);
    }

    removeNeighbor(pitch) {
        const index = this.neighbors.indexOf(pitch);
        if (index > -1) {
            this.neighbors.splice(index, 1);
            return pitch;
        }
    }

    isNeighbor(pitch) {
        return (this.neighbors.indexOf(pitch) > -1);
    }
}


class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    isEmpty() {
      return this.length === 0;
    }
}


class Graph {
    constructor()
    {
        this.AdjList = new Map();
    }

    
    // add vertex to the graph
    addVertex(v)
    {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);   
    }

    
    // add edge to the graph
    addEdge(v, w)
    {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        this.AdjList.get(v).push(w);
    
        // Since graph is undirected,
        // add an edge from w to v also
        this.AdjList.get(w).push(v);
    }

    size() {
        return this.AdjList.size;
    }

    
    // Prints the vertex and adjacency list
    printGraph()
    {
        // get all the vertices
        var get_keys = this.AdjList.keys();
    
        // iterate over the vertices
        for (var i of get_keys)
    {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";
    
            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j.pitch + " ";
                // conc += j + " ";
                // stroke(255);
                // line(i.x, i.y, j.x, j.y);
                
    
            // print the vertex and its adjacency list
            console.log(i.pitch + " -> " + conc);
            // console.log(i + " -> " + conc);
            drawPitch(i);
            
        }
    }

}