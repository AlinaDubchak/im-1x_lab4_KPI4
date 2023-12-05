const { convertFieldToText } = require('../../src/logic/script');

const readDataFromFileMock = (fileSystem) => {
  return fileSystem;
};

const printFinalFieldMock = (field) => {
  const finalFieldText = convertFieldToText(field);
  console.log(finalFieldText);
};

const createGridMock = (data) => {
  const dimensions = data[0].split(' ').map(Number);
  const rows = dimensions[0];
  const cols = dimensions[1];
  const grid = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i].split('');
    grid.push(row);
  }
  return { dimensions: { rows, cols }, grid };
};

const createCollectionsMock = () => {
  const fixedFigurePoints = [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ];
  const fixedLandscapePoints = [
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
  ];
  return {
    figurePoints: fixedFigurePoints,
    landscapePoints: fixedLandscapePoints,
  };
};

const FieldMock = class {
  constructor(dimensions, figurePoints, landscapePoints) {
    this.dimensions = dimensions;
    this.figurePoints = figurePoints;
    this.landscapePoints = landscapePoints;
  }
};

const createFieldMock = (fileInputPath) => {
  const data = readDataFromFileMock(fileInputPath);
  const grid = createGridMock(data);
  const { figurePoints, landscapePoints } = createCollectionsMock();

  const field = new FieldMock(grid.dimensions, figurePoints, landscapePoints);
  return field;
};

const mockLog = () => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    originalLog(...args);
    logs.push(args.join(' '));
  };

  return {
    release: () => {
      console.log = originalLog;
    },
    getLogs: () => logs,
  };
};

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
    printFinalFieldMock(mockField);

    const logs = consoleCapture.getLogs();
    consoleCapture.release();

    expect(logs).toEqual(['...\n#..\n##p']);
  });
});

describe('createField', () => {
  test('it should create field', () => {
    const mockFileSystem = {
      path: ['5 6', '..p...', '##p.##', '##pp##', '##..##', '##..##'],
    };

    expect(createFieldMock(mockFileSystem.path)).toEqual({
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
