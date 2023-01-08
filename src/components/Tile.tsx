import { CSSProperties, useRef, useState } from "react";
import styled from "styled-components";
import useDocumentEvent from "../hooks/useDocumentEvent";
import { color, Event } from "../types";

const Container = styled.div`
  position: absolute;
`

const clickedSizeIncrease = .3;

export default function Tile({color, size, position, select, swap}: {color: color, size: number[], position: number[], select: () => void, swap: () => void}) {

  const [isDragging, setIsDragging] = useState(false);
  const [dx, setDx] = useState<number>(0);
  const [dy, setDy] = useState<number>(0);

  const dragStartPosition = useRef([NaN, NaN]);

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    select();
    setIsDragging(true);
    dragStartPosition.current = [e.screenX, e.screenY];
  }

  useDocumentEvent(Event.MouseMove, e => {
    if (isDragging) {
      const me = e as MouseEvent;
      setDx(me.screenX - dragStartPosition.current[0]);
      setDy(me.screenY - dragStartPosition.current[1]);
    }
  })

  useDocumentEvent(Event.MouseUp, () => {
    if (isDragging) {
      setIsDragging(false);
      setDx(0);
      setDy(0);
    }
  })

  const divRef = useRef<HTMLDivElement>(null);
  const clickedMultiplier = 1 + clickedSizeIncrease;

  const style: CSSProperties = {
    zIndex: isDragging ? 10 : 0,
    background: `rgb(${color.r},${color.g},${color.b})`,
    width: isDragging ? clickedMultiplier* size[0] : size[0],
    height: isDragging ? clickedMultiplier * size[1] : size[1],
    left: (position[0] * size[0]) + dx,
    top: (position[1] * size[1]) + dy,
    pointerEvents: isDragging ? 'none' : 'auto'
  }

  if (isDragging) {
    const resizeTranslation = (-50 * clickedSizeIncrease) / clickedMultiplier;
    style.transform = `translate(${resizeTranslation}%,${resizeTranslation}%)`
  }

  return (
    <Container ref={divRef} onMouseDown={onMouseDown} onMouseUp={swap} style={style}>
    </Container>
  );
}