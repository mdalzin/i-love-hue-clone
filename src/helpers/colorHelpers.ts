import { color } from "../types";

function getRandomColor(): color {
  
  return { 
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  }
}

function interpolateValues(start: number, end: number, numValues: number): number[] {
  if (numValues < 2) new Error('Invalid interpolation value');

  const valueDifference = ((end - start) / (numValues - 1));
  const values = [start];
  let currentVal = start;

  for (let i = 0; i < numValues - 2; i++) {
    currentVal += valueDifference;
    values.push(currentVal);
  }

  values.push(end);
  
  return values;
}

function interpolateColors(startColor: color, endColor: color, numColors: number): color[] {
  const rValues = interpolateValues(startColor.r, endColor.r, numColors);
  const gValues = interpolateValues(startColor.g, endColor.g, numColors);
  const bValues = interpolateValues(startColor.b, endColor.b, numColors);

  return rValues.map((rVal, i) =>
  {
    return {
      r: rVal,
      g: gValues[i],
      b: bValues[i]
    }
  });
}

export function getBoardColors(rows: number, cols: number): color[][] {

  const [topLeft, topRight, bottomLeft, bottomRight] = Array.from({length: 4}, getRandomColor);

  if (cols === 1 && rows === 1) return [[topLeft]];

  if (cols === 1) return [interpolateColors(topLeft, bottomLeft, rows)]

  if (rows === 1) return interpolateColors(topLeft, bottomLeft, cols).map(color => [color]);

  const topRow = interpolateColors(topLeft, topRight, cols);
  const bottomRow = interpolateColors(bottomLeft, bottomRight, cols);
  return topRow.map((topColor, i) => interpolateColors(topColor, bottomRow[i], rows));
}

export function shuffleColors(colors: color[][]): color[][] {

  const oldColors = colors.map(col => [...col]);

  const cols = oldColors.length;
  const rows = oldColors[0].length;

  const newColors: (color | undefined)[][] = Array.from({ length:cols }, () => (Array.from({ length:rows }, () => undefined)));

  newColors[0][0] = oldColors[0].shift();
  if (rows > 1) newColors[0][rows - 1] = oldColors[0].pop();
  if (cols > 1) newColors[cols - 1][0] = oldColors[cols - 1].shift();
  if (rows > 1 && cols > 1) newColors[cols - 1][rows - 1] = oldColors[cols - 1].pop();

  let remainingColors = oldColors.flat();

  for(let x = 0; x < cols; x++) {
    for(let y = 0; y < rows; y++) {
      if (newColors[x][y] === undefined) {
        const removalIndex = Math.floor(Math.random() * remainingColors.length);
        newColors[x][y] = remainingColors.splice(removalIndex, 1)[0];
      }
    }
  }

  return newColors as color[][];
}

export function boardsAreEqual(board1: color[][], board2: color[][]): boolean {
  const board1Array = board1.flat();
  const board2Array = board2.flat();

  for (let i = 0; i < board1Array.length; i++) {
    if (!colorsAreEqual(board1Array[i], board2Array[i])) {
      return false;
    }
  }

  return true;
}

function colorsAreEqual(color1: color, color2: color): boolean {
  return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
}