const {
  createCollections,
  createGrid,
  Field,
  moveFigureDown,
  convertFieldToText,
} = require('../../src/logic/script');

describe('convertFieldToText', () => {
  test('it should convert field to text with figure points represented by "p"', () => {
    const field = {
      dimensions: { rows: 3, cols: 3 },
      figurePoints: [{ x: 1, y: 1 }],
      landscapePoints: [],
    };

    const result = convertFieldToText(field);

    expect(result).toBe('...\n.p.\n...');
  });

  test('it should convert field to text with landscape points represented by "#"', () => {
    const field = {
      dimensions: { rows: 3, cols: 3 },
      figurePoints: [],
      landscapePoints: [{ x: 0, y: 2 }],
    };

    const result = convertFieldToText(field);

    expect(result).toBe('...\n...\n#..');
  });

  test('it should convert field to text with both figure and landscape points', () => {
    const field = {
      dimensions: { rows: 3, cols: 3 },
      figurePoints: [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      landscapePoints: [{ x: 0, y: 2 }],
    };

    const result = convertFieldToText(field);

    expect(result).toBe('...\n.pp\n#..');
  });
});

describe('createCollections', () => {
  test('should create collections of figure and landscape points', () => {
    const inputData = {
      dimensions: { rows: 3, cols: 3 },
      grid: [
        ['.', '.', 'p'],
        ['#', '.', '.'],
        ['#', '.', '.'],
      ],
    };
    const result = createCollections(inputData);

    expect(result.figurePoints).toEqual([{ x: 2, y: 0 }]);
    expect(result.landscapePoints).toEqual([
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ]);
  });

  test('should handle an empty grid', () => {
    const inputData = {
      dimensions: { rows: 0, cols: 0 },
      grid: [],
    };
    const result = createCollections(inputData);

    expect(result.figurePoints).toEqual([]);
    expect(result.landscapePoints).toEqual([]);
  });

  test('should handle a grid with no figure or landscape points', () => {
    const inputData = {
      dimensions: { rows: 3, cols: 3 },
      grid: [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ],
    };
    const result = createCollections(inputData);

    expect(result.figurePoints).toEqual([]);
    expect(result.landscapePoints).toEqual([]);
  });
});

describe('createGrid', () => {
  test('should create a grid with dimensions and data', () => {
    const input = ['3 3', '..p', '#..', '#..'];
    const result = createGrid(input);

    expect(result.dimensions).toEqual({ rows: 3, cols: 3 });
    expect(result.grid).toEqual([
      ['.', '.', 'p'],
      ['#', '.', '.'],
      ['#', '.', '.'],
    ]);
  });

  test('should throw an error if data is null', () => {
    const input = [];

    expect(() => createGrid(input)).toThrow('Input array is empty');
  });

  test('should handle a grid with no dimensions', () => {
    const input = [''];

    expect(() => createGrid(input)).toThrow('Input array is empty');
  });

  test('should handle a grid with no data', () => {
    const input = ['3 3'];
    const result = createGrid(input);

    expect(result.dimensions).toEqual({ rows: 3, cols: 3 });
    expect(result.grid).toEqual([]);
  });
});

describe('createCollections', () => {
  test('should create collections of figure and landscape points', () => {
    const inputData = {
      dimensions: { rows: 3, cols: 3 },
      grid: [
        ['.', '.', 'p'],
        ['.', '#', '.'],
        ['#', '#', '.'],
      ],
    };
    const result = createCollections(inputData);

    expect(result.figurePoints).toEqual([{ x: 2, y: 0 }]);
    expect(result.landscapePoints).toEqual([
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ]);
  });
});

describe('moveFigureDown', () => {
  // ['.', '.', 'p'],
  // ['#', '.', '.'],
  // ['#', '.', '.'],

  test('should move an ordinary figure down if there is space', () => {
    const initialField = new Field(
      { rows: 3, cols: 3 },
      [{ x: 2, y: 0 }],
      [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ]
    );
    const newField = moveFigureDown(initialField);

    expect(newField.figurePoints).toEqual([{ x: 2, y: 1 }]);
  });

  // ['.', 'p', 'p'],
  // ['#', '.', '.'],
  // ['#', '#', '.'],

  test('should only move the whole figure down if there is space', () => {
    const initialField = new Field(
      { rows: 3, cols: 3 },
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ]
    );
    const newField = moveFigureDown(initialField);
    const newField2 = moveFigureDown(newField);
    const newField3 = moveFigureDown(newField2);

    expect(newField3.figurePoints).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
  });

  // ['.', '.', 'p'],
  // ['.', '.', '#'],
  // ['.', '.', '#'],

  test('should not move the figure down if it overlaps with landscape points', () => {
    const initialField = new Field(
      { rows: 3, cols: 3 },
      [{ x: 2, y: 0 }],
      [
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ]
    );
    const newField = moveFigureDown(initialField);

    expect(newField).toEqual(initialField);
  });

  // ['.', '.', '.'],
  // ['#', '.', '.'],
  // ['.', '#', 'p'],

  test('should not move the figure down if it goes out of bounds', () => {
    const initialField = new Field(
      { rows: 3, cols: 3 },
      [{ x: 2, y: 2 }],
      [
        { x: 0, y: 1 },
        { x: 1, y: 2 },
      ]
    );
    const newField = moveFigureDown(initialField);

    expect(newField).toEqual(initialField);
  });
});
