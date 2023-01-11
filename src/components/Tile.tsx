import { CSSProperties, useRef, useState } from "react";
import styled from "styled-components";
import useDocumentEvent from "../hooks/useDocumentEvent";
import { color, Event } from "../types";
import DisabledDot from "./DisabledDot";

const Container = styled.div`
  position: absolute;
`

const dragSizeIncrease = .3;

export default function Tile({color, size, isSelected, position, select, swap, isCorner = false}:
  {color: color, size: [number, number], position: [number, number], isSelected: boolean, select: () => void, swap: () => void, isCorner: boolean}) {

  const [dx, setDx] = useState<number>(0);
  const [dy, setDy] = useState<number>(0);

  const dragStartPosition = useRef([NaN, NaN]);

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    if (isCorner) return;

    dragStartPosition.current = [e.screenX, e.screenY];
    select();
  }

  useDocumentEvent(Event.MouseMove, e => {
    if (isSelected) {
      const me = e as MouseEvent;
      setDx(me.screenX - dragStartPosition.current[0]);
      setDy(me.screenY - dragStartPosition.current[1]);
    }
  })

  useDocumentEvent(Event.MouseUp, () => {
    if (isSelected) {
      setDx(0);
      setDy(0);
    }
  })

  const divRef = useRef<HTMLDivElement>(null);

  const style: CSSProperties = {
    zIndex: isSelected ? 10 : 0,
    background: `rgb(${color.r},${color.g},${color.b})`,
    width: size[0],
    height: size[1],
    left: (position[0] * size[0]) + dx,
    top: (position[1] * size[1]) + dy,
    pointerEvents: isSelected ? 'none' : 'auto'
  }

  if (isSelected) {
    const dragMultiplier = 1 + dragSizeIncrease;

    (style.height as number) *= dragMultiplier;
    (style.width as number) *= dragMultiplier;

    const resizeTranslation = (-50 * dragSizeIncrease) / dragMultiplier;
    style.transform = `translate(${resizeTranslation}%,${resizeTranslation}%)`
  }

  return (
    <Container ref={divRef} onMouseDown={onMouseDown} onMouseUp={() => {!isCorner && swap()}} style={style}>
      {isCorner && <DisabledDot/>}
    </Container>
  );
}