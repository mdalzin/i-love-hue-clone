import styled, { CSSProperties } from "styled-components";
import { Color } from "../classes/Color";
import Tile from "./Tile";

const Container = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  background: lightcoral;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(3, 1fr);
`

const rows = 5;
const cols = 10;

function getRandomColor(): Color {
  return new Color(Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256))
}

export default function Board() {

  let style: CSSProperties = {
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`
  };

  return (
    <Container style={style}>
      {
        [...Array(rows * cols)].map((e, i) => <Tile key={i} color={getRandomColor()}/>)
      }
    </Container>
  );
}
