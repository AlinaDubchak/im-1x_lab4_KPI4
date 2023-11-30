const { createCollections, createGrid } = require('../../src/logic/script.js');

describe('createCollections', () => {
  test('it should create collections of figure and landscape points', () => {
    const inputData = {
      dimensions: { rows: 3, cols: 3 },
      grid: [
        ['.', '.', 'p'],
        ['.', '#', '.'],
        ['#', '.', '.'],
      ],
    };
    const result = createCollections(inputData);

    expect(result.figurePoints).toEqual([{ x: 2, y: 0 }]);
    expect(result.landscapePoints).toEqual([
      { x: 1, y: 1 },
      { x: 0, y: 2 },
    ]);
  });

  test('it should handle an empty grid', () => {
    const inputData = {
      dimensions: { rows: 0, cols: 0 },
      grid: [],
    };
    const result = createCollections(inputData);

    expect(result.figurePoints).toEqual([]);
    expect(result.landscapePoints).toEqual([]);
  });

  test('it should handle a grid with no figure or landscape points', () => {
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
  test('it should create a grid with dimensions and data', () => {
    const input = ['3 3', '..p', '.#.', '#..'];
    const result = createGrid(input);

    expect(result.dimensions).toEqual({ rows: 3, cols: 3 });
    expect(result.grid).toEqual([
      ['.', '.', 'p'],
      ['.', '#', '.'],
      ['#', '.', '.'],
    ]);
  });

  test('it should throw an error if data is null', () => {
    const input = [];

    expect(() => createGrid(input)).toThrow('Input array is empty');
  });

  test('it should handle a grid with no dimensions', () => {
    const input = [''];
    expect(() => createGrid(input)).toThrow('Input array is empty');
  });

  test('it should handle a grid with no data', () => {
    const input = ['3 3'];
    const result = createGrid(input);

    expect(result.dimensions).toEqual({ rows: 3, cols: 3 });
    expect(result.grid).toEqual([]);
  });
});
