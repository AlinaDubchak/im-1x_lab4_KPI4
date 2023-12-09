const { readDataFromFile, writeDataToFile } = require('../../src/view/IO.js');
const {
  createCollections,
  createGrid,
  moveFigureDown,
  Field,
  convertFieldToText,
} = require('../../src/logic/script.js');

const fileInputPath = './src/view/input.txt';
const fileToWrite = './tests/view.tests/output.txt';

const createField = function (fileInputPath) {
  const data = readDataFromFile(fileInputPath);
  const grid = createGrid(data);
  const { figurePoints, landscapePoints } = createCollections(grid);

  const field = new Field(grid.dimensions, figurePoints, landscapePoints);
  return field;
};

const runGameLoop = (initialField, printNextFieldState = false) => {
  let currentField = initialField;
  printFinalField(currentField);

  const gameLoop = setInterval(() => {
    const newField = moveFigureDown(currentField);

    if (JSON.stringify(currentField) === JSON.stringify(newField)) {
      clearInterval(gameLoop);
      writeDataToFile(fileToWrite, currentField);
    } else {
      currentField = newField;
      if (printNextFieldState) printFinalField(currentField);
    }
  }, 300);
};

const printFinalField = (field) => {
  const finalFieldText = convertFieldToText(field);
  console.log(finalFieldText);
};

const runGame = function (fileInputPath) {
  const field = createField(fileInputPath);
  runGameLoop(field, (printNextFieldState = true));
};

runGame(fileInputPath);
module.exports = {
  printFinalField,
  runGameLoop,
  createField,
  runGame,
};
