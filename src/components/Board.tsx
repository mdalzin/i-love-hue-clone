import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { color, Event } from "../types";
import Tile from "./Tile";
import useWindowEvent from "../hooks/useWindowEvent";

const Container = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  background: black;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const rows = 10;
const cols = 8;

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

function getBoardColors(rows: number, cols: number): color[][] {

  const [topLeft, topRight, bottomLeft, bottomRight] = Array.from({length: 4}, getRandomColor);

  if (cols === 1 && rows === 1) return [[topLeft]];

  if (cols === 1) return [interpolateColors(topLeft, bottomLeft, rows)]

  if (rows === 1) return interpolateColors(topLeft, bottomLeft, cols).map(color => [color]);

  const topRow = interpolateColors(topLeft, topRight, cols);
  const bottomRow = interpolateColors(bottomLeft, bottomRight, cols);
  return topRow.map((topColor, i) => interpolateColors(topColor, bottomRow[i], rows));
}

export default function Board() {

  const boardRef = useRef<HTMLDivElement>(null);
  const selectedPosition = useRef<[number, number] | null>(null);
  const selectedColor = useRef<color | null>(null);

  const [colors, setColors] = useState(getBoardColors(rows, cols));

  useEffect(() => {
    updateTileSize();
  }, [])

  const [tileSize, setTileSize] = useState([0, 0]);

  useWindowEvent(Event.Resize, updateTileSize);

  function setSelectedTile(position: [number, number] | null, color: color | null) {
    selectedPosition.current = position;
    selectedColor.current = color;
  }

  function swapTiles(endPosition: [number, number], endColor: color) {
    setColors(prevColors => {
      const newColors = [...prevColors];

      if (selectedPosition.current && selectedColor.current) {
        newColors[selectedPosition.current[0]][selectedPosition.current[1]] = endColor;
        newColors[endPosition[0]][endPosition[1]] = selectedColor.current;
      }

      return newColors;
    })
  }

  function updateTileSize() {
    if (boardRef.current) {
      setTileSize([boardRef.current.offsetWidth / cols, boardRef.current.offsetHeight / rows]);
    }
  }

  return (
    <Container ref={boardRef}>
      {
        colors.flatMap((colorCol, x) => {
          return colorCol.map((color, y) => 
          {
            return <Tile key={`${x}${y}`} color={color} position={[x, y]} size={tileSize} select={() => setSelectedTile([x,y], color)} swap={() => swapTiles([x,y], color)}/>
          })
        })
      }
    </Container>
  );
}
