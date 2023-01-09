import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { color, Event } from "../types";
import Tile from "./Tile";
import useWindowEvent from "../hooks/useWindowEvent";
import useDocumentEvent from "../hooks/useDocumentEvent";
import { getBoardColors } from "../helpers/boardColorGenerator";

const Container = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  background: black;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const rows = 8;
const cols = 10;

function shuffleColors(colors: color[][]): color[][] {
  const cols = colors.length;
  const rows = colors[0].length;

  const newColors: (color | undefined)[][] = Array.from({ length:cols }, () => (Array.from({ length:rows }, () => undefined)));

  newColors[0][0] = colors[0].shift();
  if (rows > 1) newColors[0][rows - 1] = colors[0].pop();
  if (cols > 1) newColors[cols - 1][0] = colors[cols - 1].shift();
  if (rows > 1 && cols > 1) newColors[cols - 1][rows - 1] = colors[cols - 1].pop();

  let remainingColors = colors.flat();

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

const initialBoard = shuffleColors(getBoardColors(rows, cols));

export default function Board() {

  const [colors, setColors] = useState(initialBoard);
  const [tileSize, setTileSize] = useState([0, 0]);

  const boardRef = useRef<HTMLDivElement>(null);
  const selectedPosition = useRef<[number, number] | null>(null);
  const selectedColor = useRef<color | null>(null);

  useWindowEvent(Event.Resize, updateTileSize);
  useDocumentEvent(Event.MouseUp, () => {
    selectedPosition.current = null;
    selectedColor.current = null;
  })

  useEffect(() => {
    updateTileSize();
  }, [colors])

  function updateTileSize() {
    if (boardRef.current) {
      setTileSize([boardRef.current.offsetWidth / cols, boardRef.current.offsetHeight / rows]);
    }
  }

  function selectTile(position: [number, number] | null, color: color | null) {
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

  return (
    <Container ref={boardRef}>
      {
        colors.flatMap((colorCol, x) => {
          return colorCol.map((color, y) => 
          {
            const isCorner = (x === 0 || x === cols -1) && (y === 0 || y === rows -1)
            return <Tile key={`${x}${y}`} color={color} position={[x, y]} size={tileSize} select={() => selectTile([x,y], color)} swap={() => swapTiles([x,y], color)} isCorner={isCorner}/>
          })
        })
      }
    </Container>
  );
}
