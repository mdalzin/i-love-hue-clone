import { CSSProperties } from "react";
import styled from "styled-components";
import { color } from "../types";

const Container = styled.div`
  position: absolute;
  width: 200px;
  height: 100px;
`

export default function Cursor({isActive, color, tileDimensions}: {isActive: boolean, color: color, tileDimensions: number[]}) {

  const style: CSSProperties = {
    background: isActive ? `rgb(${color.r},${color.g},${color.b})` : 'transparent'
  }

  return (
    <Container style={style}>
    </Container>
  );
}