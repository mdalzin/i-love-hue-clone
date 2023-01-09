import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { color, Event } from "../types";
import Tile from "./Tile";
import useWindowEvent from "../hooks/useWindowEvent";
import useDocumentEvent from "../hooks/useDocumentEvent";
import { boardsAreEqual, getBoardColors, shuffleColors } from "../helpers/colorHelpers";

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  background: black;
`

export default function Board({gameIndex, rows, cols}: {gameIndex: number, rows: number, cols: number}) {

  const solutionBoard = useRef(getBoardColors(rows, cols));

  const [colors, setColors] = useState(shuffleColors(solutionBoard.current));
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
    solutionBoard.current = getBoardColors(rows, cols);
    setColors(shuffleColors(solutionBoard.current));
    updateTileSize();
  }, [gameIndex, rows, cols])

  useEffect(() => {
    if (boardsAreEqual(solutionBoard.current, colors)) alert('You Win!');
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
    if (selectedPosition.current && selectedColor.current) {
      const newColors = colors.map(col => [...col]);

      newColors[selectedPosition.current[0]][selectedPosition.current[1]] = endColor;
      newColors[endPosition[0]][endPosition[1]] = selectedColor.current;

      setColors(newColors);
    }
  }

  return (
    <Container ref={boardRef}>
      {
        colors.flatMap((colorCol, x) => {
          return colorCol.map((color, y) => 
          {
            const isCorner = (x === 0 || x === cols -1) && (y === 0 || y === rows -1);
            return <Tile key={`${x}${y}`} color={color} position={[x, y]} size={tileSize} select={() => selectTile([x,y], color)} swap={() => swapTiles([x,y], color)} isCorner={isCorner}/>
          })
        })
      }
    </Container>
  );
}
