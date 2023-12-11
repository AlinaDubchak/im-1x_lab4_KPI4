const {
  convertFieldToText,
  createCollections,
} = require('../../src/logic/script');

jest.mock('../../src/logic/script', () => ({
  convertFieldToText: jest.fn(),
  createCollections: jest.fn(),
}));

const readDataFromFileMock = jest.fn((fileSystem) => fileSystem);

const printFinalFieldMock = jest.fn((field) => {
  convertFieldToText.mockReturnValueOnce('...');
  console.log(convertFieldToText(field));
});

const createGridMock = jest.fn((data) => {
  try {
    if (data.length === 0 || data[0] === '') {
      throw new Error('Input array is empty');
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
});

class FieldMock {
  constructor(dimensions, figurePoints, landscapePoints) {
    this.dimensions = dimensions;
    this.figurePoints = figurePoints;
    this.landscapePoints = landscapePoints;
  }
}

const createFieldMock = jest.fn((fileInputPath) => {
  const data = readDataFromFileMock(fileInputPath);
  const grid = createGridMock(data);
  const { figurePoints, landscapePoints } = createCollections(grid);

  return new FieldMock(grid.dimensions, figurePoints, landscapePoints);
});

const mockLog = () => {
  const logs = [];
  const consoleSpy = jest
    .spyOn(console, 'log')
    .mockImplementation((...args) => {
      logs.push(args.join(' '));
    });

  return {
    release: () => {
      consoleSpy.mockRestore();
    },
    getLogs: () => logs,
  };
};

const moveFigureDownMock = jest.fn((field) => {
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
  return new FieldMock(
    field.dimensions,
    newFigurePoints,
    field.landscapePoints
  );
});

function runGameLoopMock(initialField, printNextFieldState = false, resolve) {
  let currentField = initialField;
  printFinalFieldMock(currentField);

  const gameLoop = setInterval(() => {
    const newField = moveFigureDownMock(currentField);

    if (JSON.stringify(currentField) === JSON.stringify(newField)) {
      clearInterval(gameLoop);
      resolve(); // Resolve the promise to signal the end of the game loop
    } else {
      currentField = newField;
      if (printNextFieldState) printFinalFieldMock(currentField);
    }
  }, 300);
}

describe('console log', () => {
  test('it should print final field', () => {
    const mockField = {
      dimensions: { rows: 3, cols: 3 },
      figurePoints: [{ x: 2, y: 2 }],
      landscapePoints: [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
    };

    const consoleCapture = mockLog();
    convertFieldToText.mockReturnValueOnce('...');
    printFinalFieldMock(mockField);

    const logs = consoleCapture.getLogs();
    consoleCapture.release();

    expect(logs).toEqual(['...']);
  });
});

describe('createField', () => {
  test('it should create field', () => {
    const mockFileSystem = {
      path: ['5 6', '..p...', '##p.##', '##pp##', '##..##', '##..##'],
    };

    createCollections.mockReturnValueOnce({
      figurePoints: [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
      ],
      landscapePoints: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
      ],
    });

    const result = createFieldMock(mockFileSystem.path);

    expect(result).toEqual({
      dimensions: { rows: 5, cols: 6 },
      figurePoints: [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
      ],
      landscapePoints: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
      ],
    });
  });
});

describe('createGridMock', () => {
  test('it should throw an error for empty input array', () => {
    const emptyInput = [];

    expect(() => createGridMock(emptyInput)).toThrowError(
      'Input array is empty'
    );
  });

  test('it should throw an error for empty first element in the array', () => {
    const invalidInput = [''];

    expect(() => createGridMock(invalidInput)).toThrowError(
      'Input array is empty'
    );
  });
});
