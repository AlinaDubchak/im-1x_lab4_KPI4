const { convertFieldToText } = require('../../src/logic/script.js');
const fs = require('fs');

const readDataFromFile = function (filePath) {
  try {
    if (!fs.existsSync(filePath)) throw new Error(`File does not exist`);
    const rawData = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    return rawData;
  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
};

const writeDataToFile = function (fileToWrite, field) {
  try {
    if (!fileToWrite) throw new Error('Invalid file to write in path input');
    if (!field) throw new Error('Cannot read properties of underfined');

    const finalFieldText = convertFieldToText(field);
    fs.writeFileSync(fileToWrite, finalFieldText);
    console.log(`Final field has been successfully written`);
  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
