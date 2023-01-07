import styled from "styled-components";
import { Color } from "../classes/Color";

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default function Tile({color}: {color: Color}) {

  return (
    <Container style={{background: color.toString()}}>
    </Container>
  );
}