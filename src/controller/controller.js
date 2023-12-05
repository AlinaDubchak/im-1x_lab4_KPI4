const { readDataFromFile } = require('../../src/view/IO.js');
const {
  createCollections,
  createGrid,
  moveFigureDown,
  Field,
  convertFieldToText,
} = require('../../src/logic/script.js');

const fileInputPath = '../view/input.txt';

const createField = function (fileInputPath) {
  const data = readDataFromFile(fileInputPath);
  const grid = createGrid(data);
  const { figurePoints, landscapePoints } = createCollections(grid);

  const field = new Field(grid.dimensions, figurePoints, landscapePoints);
  return field;
};

const runGameLoop = (initialField) => {
  let currentField = initialField;

  const gameLoop = setInterval(() => {
    const newField = moveFigureDown(currentField);

    if (JSON.stringify(currentField) === JSON.stringify(newField)) {
      clearInterval(gameLoop);
      printFinalField(currentField);
    } else {
      currentField = newField;
    }
  }, 300);
};

const printFinalField = (field) => {
  const finalFieldText = convertFieldToText(field);
  console.log(finalFieldText);
};

const runGame = function (fileInputPath) {
  const field = createField(fileInputPath);
  runGameLoop(field);
  printFinalField(field);
};

runGame(fileInputPath);
module.exports = {
  printFinalField,
  runGameLoop,
  createField,
  runGame,
};
