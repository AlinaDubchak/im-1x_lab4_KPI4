const createCollections = function (inputData) {
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

const createGrid = function (data) {
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
};

module.exports = {
  createCollections,
  createGrid,
};
