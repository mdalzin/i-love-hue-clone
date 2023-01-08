import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { color, Event } from "../types";
import Tile from "./Tile";
import useWindowEvent from "../hooks/useWindowEvent";

const Container = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  background: lightcoral;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const rows = 10;
const cols = 10;

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

  if (rows === 1 && cols === 1) return [[topLeft]];

  if (rows === 1) return [interpolateColors(topLeft, topRight, cols)]

  if (cols === 1) return interpolateColors(topLeft, bottomLeft, rows).map(color => [color]);

  const leftCol = interpolateColors(topLeft, bottomLeft, rows);
  const rightCol = interpolateColors(topRight, bottomRight, rows);
  return leftCol.map((leftColor, i) => interpolateColors(leftColor, rightCol[i], cols));
}

export default function Board() {

  const boardRef = useRef<HTMLDivElement>(null)
  const colorsRef = useRef<color[][]>([[]]);

  useEffect(() => {
    colorsRef.current = getBoardColors(rows, cols);
    updateTileSize();
  }, [])

  const [tileSize, setTileSize] = useState([0, 0]);

  useWindowEvent(Event.Resize, updateTileSize);

  function updateTileSize() {
    if (boardRef.current) {
      setTileSize([boardRef.current.offsetWidth / cols, boardRef.current.offsetHeight / rows]);
    }
  }

  return (
    <Container ref={boardRef}>
      {
        colorsRef.current.flatMap((colorRow, y) => {
          return colorRow.map((color, x) => 
          {
            return <Tile key={`${x}${y}`} color={color} position={[x, y]} size={tileSize}/>
          })
        })
      }
    </Container>
  );
}
