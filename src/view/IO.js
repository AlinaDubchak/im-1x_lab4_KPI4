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

module.exports = {
  readDataFromFile,
};
