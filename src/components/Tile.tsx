import { CSSProperties, useRef } from "react";
import styled from "styled-components";
import { useIsClicked } from "../hooks/useIsClicked";
import { color } from "../types";

const Container = styled.div`
  position: absolute;
`

const clickedSizeIncrease = .3;

export default function Tile({color, size, position}: {color: color, size: number[], position: number[]}) {

  const divRef = useRef<HTMLDivElement>(null);

  const isClicked = useIsClicked(divRef);

  const clickedMultiplier = 1 + clickedSizeIncrease;

  const style: CSSProperties = {
    zIndex: isClicked ? 1 : 0,
    background: `rgb(${color.r},${color.g},${color.b})`,
    width: isClicked ? clickedMultiplier* size[0] : size[0],
    height: isClicked ? clickedMultiplier * size[1] : size[1],
    left: position[0] * size[0],
    top: position[1] * size[1]
  }

  if (isClicked) {
    const resizeTranslation = (-50 * clickedSizeIncrease) / clickedMultiplier;
    style.transform = `translate(${resizeTranslation}%,${resizeTranslation}%)`
  }

  return (
    <Container ref={divRef} style={style}>
    </Container>
  );
}