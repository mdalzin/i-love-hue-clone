import { CSSProperties, useRef } from "react";
import styled from "styled-components";
import { useIsClicked } from "../hooks/useIsClicked";
import { color } from "../types";

const Container = styled.div`
  position: absolute;
`

export default function Tile({color, size, position}: {color: color, size: number[], position: number[]}) {

  const divRef = useRef<HTMLDivElement>(null);

  const isClicked = useIsClicked(divRef);

  const style: CSSProperties = {
    background: isClicked ? 'transparent' : `rgb(${color.r},${color.g},${color.b})`,
    width: size[0],
    height: size[1],
    left: position[0] * size[0],
    top: position[1] * size[1]
  }

  return (
    <Container ref={divRef} style={style}>
    </Container>
  );
}