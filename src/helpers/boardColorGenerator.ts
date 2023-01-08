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