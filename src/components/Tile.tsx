import { CSSProperties, useRef } from "react";
import styled from "styled-components";
import { useIsClicked } from "../hooks/useIsClicked";
import { color } from "../types";

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default function Tile({color}: {color: color}) {

  const divRef = useRef<HTMLDivElement>(null);

  const isClicked = useIsClicked(divRef);

  const style: CSSProperties = {
    background: isClicked ? 'transparent' : `rgb(${color.r},${color.g},${color.b})`
  }

  // useEffect(() => {
    
  // }, [isClicked])

  // if (isClicked) {
  //   if (divRef.current?.offsetWidth) {
  //     console.log('opp');
  //     style.width = 20;
  //   }
  //   if (divRef.current?.offsetHeight) {
  //     style.height = 20;
  //   }
  // }

  return (
    <Container ref={divRef} style={style}>
    </Container>
  );
}