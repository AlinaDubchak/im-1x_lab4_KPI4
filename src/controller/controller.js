const { readDataFromFile } = require('../view/IO.js');
const fileInputPath = '../view/input.txt';
const { createCollections } = require('../logic/script.js');
const { createGrid } = require('../logic/script.js');

const data = readDataFromFile(fileInputPath);
const grid = createGrid(data);

const { figurePoints, landscapePoints } = createCollections(grid);

console.log('Figure Points:', figurePoints);
console.log('Landscape Points:', landscapePoints);
