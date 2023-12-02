const mockFileSystem = {
  '../view/input.txt': '5 6\n..p...\n##p.##\n##pp##\n##..##\n##..##',
};

const mockConvertFieldToText = function (field) {
  const { rows, cols } = field.dimensions;
  const grid = Array.from({ length: rows }, () => Array(cols).fill('.'));

  field.figurePoints.forEach(({ x, y }) => {
    grid[y][x] = 'p';
  });

  field.landscapePoints.forEach(({ x, y }) => {
    grid[y][x] = '#';
  });

  const gridText = grid.map((row) => row.join('')).join('\n');
  return [gridText].join('\n');
};

const mockField = {
  dimensions: { rows: 3, cols: 3 },
  figurePoints: [{ x: 1, y: 1 }],
  landscapePoints: [{ x: 0, y: 2 }],
};

const mockMoveFigureDown = function (field) {
  const newFigurePoints = field.figurePoints.map((point) => ({
    x: point.x,
    y: point.y + 1,
  }));
  const overlap = newFigurePoints.some((point) =>
    field.landscapePoints.some(
      (landscapePoint) =>
        landscapePoint.x === point.x && landscapePoint.y === point.y
    )
  );
  const outOfBounds = newFigurePoints.some(
    (point) => point.y >= field.dimensions.rows
  );

  if (overlap || outOfBounds) {
    return field;
  }
  return new Field(field.dimensions, newFigurePoints, field.landscapePoints);
};

const mockCreateCollections = function (inputData) {
  const figurePoints = [];
  const landscapePoints = [];

  const rows = inputData.dimensions.rows;
  const cols = inputData.dimensions.cols;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const char = inputData.grid[i][j];
      const point = { x: j, y: i };

      if (char === 'p') {
        figurePoints.push(point);
      } else if (char === '#') {
        landscapePoints.push(point);
      }
    }
  }
  return { figurePoints, landscapePoints };
};

const mockCreateGrid = function (data) {
  try {
    if (data.length < 2) {
      throw new Error('Invalid input data');
    }
    const dimensions = data[0].split(' ').map(Number);
    const rows = dimensions[0];
    const cols = dimensions[1];
    const grid = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i].split('');
      grid.push(row);
    }
    return { dimensions: { rows, cols }, grid };
  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
};

const mockRunGameLoop = function (initialField) {
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

const mockReadDataFromFile = function (filePath) {
  try {
    const fileContent = mockFileSystem[filePath];

    if (!fileContent) {
      throw new Error(`File does not exist`);
    }

    const rawData = fileContent.split(/\r?\n/);
    return rawData;
  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
};

module.exports = {
  mockConvertFieldToText,
  mockMoveFigureDown,
  mockCreateCollections,
  mockCreateGrid,
  mockRunGameLoop,
  mockReadDataFromFile,
  mockField,
  mockFileSystem,
};
