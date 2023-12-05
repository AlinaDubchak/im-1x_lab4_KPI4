const fs = require('fs');
const { readDataFromFile, writeDataToFile } = require('../../src/view/IO.js');

describe('readDataFromFile', () => {
  test('should return data when file is read successfully', () => {
    const filePath = './tests/view.tests/validInput.txt';
    const expectedData = ['5 6', '..p...', '##p.##', '##pp##', '##..##', '##..##'];
    const result = readDataFromFile(filePath);

    expect(result).toEqual(expectedData);
  });

  test('should throw an error for an invalid file format', () => {
    const filePath = './noFile.txt';

    expect(() => readDataFromFile(filePath)).toThrow(`Error: File does not exist`);
  });
});

describe('writeFinalFieldToFile', () => {
  test('should write final field to file successfully', () => {
    const fileToWrite = './tests/view.tests/output.txt';
    const field = {
      dimensions: { rows: 3, cols: 3 },
      figurePoints: [{ x: 2, y: 2 }],
      landscapePoints: [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
    };

    writeDataToFile(fileToWrite, field);

    const actualContent = fs.readFileSync(fileToWrite, 'utf8');
    const expectedContent = '...\n#..\n#.p';

    expect(actualContent).toBe(expectedContent);
  });

  test('should throw an error when writing to file fails (invalid field)', () => {
    const fileToWrite = './noFile.txt';
    const field = undefined;

    expect(() => writeDataToFile(fileToWrite, field)).toThrowError(
      'Error: Cannot read properties of underfined'
    );
  });

  test('should throw an error when writing to file fails (invalid file path)', () => {
    const fileToWrite = undefined;
    const field = {
      dimensions: { rows: 3, cols: 3 },
      figurePoints: [{ x: 2, y: 2 }],
      landscapePoints: [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
    };

    expect(() => writeDataToFile(fileToWrite, field)).toThrowError(
      'Invalid file to write in path input'
    );
  });
});
