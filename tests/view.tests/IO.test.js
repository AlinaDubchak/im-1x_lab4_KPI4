const fs = require('fs');
const { readDataFromFile } = require('../../src/view/IO.js');

describe('readDataFromFile', () => {
  test('should return data when file is read successfully', () => {
    const filePath = './tests/view.tests/validInput.txt';
    const expectedData = ['5 6\r', '..p...\r', '##p.##\r', '##pp##\r', '##..##\r', '##..##'];
    const result = readDataFromFile(filePath);

    expect(result).toEqual(expectedData);
  });

  test('should throw an error for an invalid file format', () => {
    const filePath = './noFile.txt';

    expect(() => readDataFromFile(filePath)).toThrow(`Error: File does not exist`);
  });
});
