const { readDataFromFile } = require('../view/IO.js');
const fileInputPath = '../view/input.txt';
const {
  createCollections,
  createGrid,
  moveFigureDown,
  Field,
  convertFieldToText,
} = require('../logic/script.js');

const data = readDataFromFile(fileInputPath);
const grid = createGrid(data);

const { figurePoints, landscapePoints } = createCollections(grid);

const field = new Field(grid.dimensions, figurePoints, landscapePoints);

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
  }, 1000);
};

const printFinalField = (field) => {
  const finalFieldText = convertFieldToText(field);
  console.log(finalFieldText);
};

runGameLoop(field);
