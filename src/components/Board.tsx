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

const rows = 10;
const cols = 8;

export default function Board() {

  const [colors, setColors] = useState(getBoardColors(rows, cols));
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
  }, [])

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
            return <Tile key={`${x}${y}`} color={color} position={[x, y]} size={tileSize} select={() => selectTile([x,y], color)} swap={() => swapTiles([x,y], color)}/>
          })
        })
      }
    </Container>
  );
}
