import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { color, Event } from "../types";
import Tile from "./Tile";
import useWindowEvent from "../hooks/useWindowEvent";
import useDocumentEvent from "../hooks/useDocumentEvent";
import { boardsAreEqual, getBoardColors, shuffleColors } from "../helpers/colorHelpers";
import WinOverlay from "./WinOverlay";

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  background: black;
`

export default function Board({gameIndex, rows, cols}: {gameIndex: number, rows: number, cols: number}) {

  const solutionBoard = useRef(getBoardColors(rows, cols));

  const [colors, setColors] = useState(shuffleColors(solutionBoard.current));
  const [tileSize, setTileSize] = useState<[number,number]>([0, 0]);
  const [isWon, setIsWon] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const selectedColor = useRef<color | null>(null);

  const updateTileSize = useCallback(() => {
    if (boardRef.current) {
      setTileSize([boardRef.current.offsetWidth / cols, boardRef.current.offsetHeight / rows]);
    }
  }, [rows, cols]);

  useWindowEvent(Event.Resize, updateTileSize);
  useDocumentEvent(Event.MouseUp, () => {
    setSelectedPosition(null);
    selectedColor.current = null;
  })

  useEffect(() => {
    solutionBoard.current = getBoardColors(rows, cols);
    setColors(shuffleColors(solutionBoard.current));
    updateTileSize();
    setIsWon(false);
  }, [gameIndex, rows, cols, updateTileSize])

  useEffect(() => {
    if (boardsAreEqual(solutionBoard.current, colors)) setIsWon(true);
  }, [colors])

  function selectTile(position: [number, number] | null, color: color | null) {
    setSelectedPosition(position);
    selectedColor.current = color;
  }

  function swapTiles(endPosition: [number, number], endColor: color) {
    if (selectedPosition && selectedColor.current) {
      const newColors = colors.map(col => [...col]);

      newColors[selectedPosition[0]][selectedPosition[1]] = endColor;
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
            const isSelected = selectedPosition !== null && selectedPosition[0] === x && selectedPosition[1] === y

            return <Tile key={`${x}${y}`} color={color} position={[x, y]} size={tileSize} isSelected={isSelected}
              select={() => selectTile([x,y], color)} swap={() => swapTiles([x,y], color)} isCorner={isCorner}/>
          })
        })
      }
      {isWon && <WinOverlay/>}
    </Container>
  );
}
