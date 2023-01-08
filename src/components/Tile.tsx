import styled from "styled-components";
import { color } from "../types";

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default function Tile({color}: {color: color}) {

  return (
    <Container style={{background: `rgb(${color.r},${color.g},${color.b})`}}>
    </Container>
  );
}