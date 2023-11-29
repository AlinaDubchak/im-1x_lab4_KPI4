const fs = require('fs');
const fileInputPath = './input.txt';

const readDataFromFile = function (filePath) {
  try {
    if (!fs.existsSync(filePath)) throw new Error(`File does not exist`);
    const data = fs.readFileSync(filePath, 'utf8').split('\n');
    return data;
  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
};

const data = readDataFromFile(fileInputPath);
console.log(data);

module.exports = {
  readDataFromFile,
};
